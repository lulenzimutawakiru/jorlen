import db from '../config/database';
import { Customer } from '../types';

export class CustomerService {
  static async getAllCustomers(limit: number, offset: number) {
    return db.manyOrNone(
      `SELECT * FROM customers ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  }

  static async getCustomerById(id: string) {
    return db.oneOrNone(
      `SELECT * FROM customers WHERE id = $1`,
      [id]
    );
  }

  static async createCustomer(data: Partial<Customer>) {
    return db.one(
      `INSERT INTO customers (name, category, email, phone, physical_address, city, country, postal_code, contact_person_name, contact_person_phone, contact_person_email, tax_id, registration_number, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        data.name,
        data.category || 'SME',
        data.email,
        data.phone,
        data.physical_address,
        data.city,
        data.country || 'Uganda',
        data.postal_code,
        data.contact_person_name,
        data.contact_person_phone,
        data.contact_person_email,
        data.tax_id,
        data.registration_number,
        data.notes
      ]
    );
  }

  static async updateCustomer(id: string, data: Partial<Customer>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof Customer] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof Customer]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE customers SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
  }

  static async deleteCustomer(id: string) {
    return db.result(
      `DELETE FROM customers WHERE id = $1`,
      [id]
    );
  }

  static async getCustomerSubscriptions(customerId: string) {
    return db.manyOrNone(
      `SELECT * FROM customer_subscriptions WHERE customer_id = $1 AND is_active = true`,
      [customerId]
    );
  }

  static async getCustomerCount() {
    const result = await db.one(`SELECT COUNT(*) as count FROM customers`);
    return result.count;
  }
}
