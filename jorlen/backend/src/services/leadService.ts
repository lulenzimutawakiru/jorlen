import db from '../config/database';
import { Lead } from '../types';

export class LeadService {
  static async getAllLeads(limit: number, offset: number, filter?: any) {
    let query = `SELECT * FROM leads WHERE 1=1`;
    const values: any[] = [];

    if (filter?.pipeline_stage) {
      values.push(filter.pipeline_stage);
      query += ` AND pipeline_stage = $${values.length}`;
    }

    if (filter?.assigned_to) {
      values.push(filter.assigned_to);
      query += ` AND assigned_to = $${values.length}`;
    }

    values.push(limit);
    query += ` ORDER BY created_at DESC LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    return db.manyOrNone(query, values);
  }

  static async getLeadById(id: string) {
    return db.oneOrNone(`SELECT * FROM leads WHERE id = $1`, [id]);
  }

  static async createLead(data: Partial<Lead>) {
    return db.one(
      `INSERT INTO leads (title, company_name, contact_name, contact_email, contact_phone, service_interested, estimated_value_ugx, pipeline_stage, source, assigned_to, probability_percentage, expected_close_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        data.title,
        data.company_name,
        data.contact_name,
        data.contact_email,
        data.contact_phone,
        data.service_interested,
        data.estimated_value_ugx,
        data.pipeline_stage || 'new-lead',
        data.source,
        data.assigned_to,
        data.probability_percentage || 0,
        data.expected_close_date,
        data.notes
      ]
    );
  }

  static async updateLead(id: string, data: Partial<Lead>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof Lead] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof Lead]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE leads SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
  }

  static async getLeadsCount() {
    const result = await db.one(`SELECT COUNT(*) as count FROM leads`);
    return result.count;
  }

  static async getLeadsByStage(stage: string) {
    return db.manyOrNone(`SELECT * FROM leads WHERE pipeline_stage = $1`, [stage]);
  }
}
