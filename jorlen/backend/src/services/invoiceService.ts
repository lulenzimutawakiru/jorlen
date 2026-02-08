import db from '../config/database';
import { Invoice } from '../types';
import { generateInvoiceNumber } from '../utils/helpers';

export class InvoiceService {
  static async getAllInvoices(limit: number, offset: number, filter?: any) {
    let query = `SELECT * FROM invoices WHERE 1=1`;
    const values: any[] = [];

    if (filter?.status) {
      values.push(filter.status);
      query += ` AND status = $${values.length}`;
    }

    if (filter?.payment_status) {
      values.push(filter.payment_status);
      query += ` AND payment_status = $${values.length}`;
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

  static async getInvoiceById(id: string) {
    return db.oneOrNone(`SELECT * FROM invoices WHERE id = $1`, [id]);
  }

  static async createInvoice(data: Partial<Invoice>) {
    const invoiceNumber = generateInvoiceNumber();

    return db.one(
      `INSERT INTO invoices (invoice_number, customer_id, project_id, subscription_id, invoice_type, issue_date, due_date, total_amount_ugx, tax_amount_ugx, status, line_items, notes, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        invoiceNumber,
        data.customer_id,
        data.project_id,
        data.subscription_id,
        data.invoice_type || 'standard',
        data.issue_date,
        data.due_date,
        data.total_amount_ugx,
        data.tax_amount_ugx || 0,
        data.status || 'draft',
        JSON.stringify(data.line_items || []),
        data.notes,
        data.customer_id
      ]
    );
  }

  static async updateInvoice(id: string, data: Partial<Invoice>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof Invoice] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof Invoice]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE invoices SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
  }

  static async getTotalRevenue() {
    const result = await db.one(
      `SELECT SUM(total_amount_ugx) as total FROM invoices WHERE payment_status = 'paid'`
    );
    return result.total || 0;
  }

  static async getOutstandingBalance() {
    const result = await db.one(
      `SELECT SUM(total_amount_ugx - COALESCE(paid_amount_ugx, 0)) as outstanding FROM invoices WHERE payment_status IN ('unpaid', 'partial')`
    );
    return result.outstanding || 0;
  }
}
