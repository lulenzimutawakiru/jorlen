import db from '../config/database';
import { SupportTicket } from '../types';
import { generateTicketNumber, calculateSLABreach } from '../utils/helpers';

export class TicketService {
  static async getAllTickets(limit: number, offset: number, filter?: any) {
    let query = `SELECT * FROM support_tickets WHERE 1=1`;
    const values: any[] = [];

    if (filter?.status) {
      values.push(filter.status);
      query += ` AND status = $${values.length}`;
    }

    if (filter?.priority) {
      values.push(filter.priority);
      query += ` AND priority = $${values.length}`;
    }

    if (filter?.customer_id) {
      values.push(filter.customer_id);
      query += ` AND customer_id = $${values.length}`;
    }

    values.push(limit);
    query += ` ORDER BY created_at DESC LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    return db.manyOrNone(query, values);
  }

  static async getTicketById(id: string) {
    return db.oneOrNone(`SELECT * FROM support_tickets WHERE id = $1`, [id]);
  }

  static async createTicket(data: Partial<SupportTicket>) {
    const ticketNumber = generateTicketNumber();
    
    return db.one(
      `INSERT INTO support_tickets (ticket_number, customer_id, title, description, issue_category, priority, status, assigned_to, sla_response_hours, sla_resolution_hours, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        ticketNumber,
        data.customer_id,
        data.title,
        data.description,
        data.issue_category || 'other',
        data.priority || 'medium',
        data.status || 'open',
        data.assigned_to,
        data.sla_response_hours || 24,
        data.sla_resolution_hours || 72,
        data.customer_id
      ]
    );
  }

  static async updateTicket(id: string, data: Partial<SupportTicket>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof SupportTicket] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof SupportTicket]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE support_tickets SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
  }

  static async addComment(ticketId: string, comment: string, userId: string) {
    return db.one(
      `INSERT INTO ticket_comments (ticket_id, comment_text, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [ticketId, comment, userId]
    );
  }

  static async getTicketComments(ticketId: string) {
    return db.manyOrNone(
      `SELECT tc.*, u.first_name, u.last_name FROM ticket_comments tc
       JOIN users u ON tc.created_by = u.id
       WHERE tc.ticket_id = $1
       ORDER BY tc.created_at DESC`,
      [ticketId]
    );
  }

  static async getOpenTicketsCount() {
    const result = await db.one(`SELECT COUNT(*) as count FROM support_tickets WHERE status != 'closed'`);
    return result.count;
  }
}
