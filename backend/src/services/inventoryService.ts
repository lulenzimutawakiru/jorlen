import db from '../config/database';
import { InventoryItem } from '../types';

export class InventoryService {
  static async getAllItems(limit: number, offset: number, filter?: any) {
    let query = `SELECT * FROM inventory_items WHERE 1=1`;
    const values: any[] = [];

    if (filter?.category) {
      values.push(filter.category);
      query += ` AND category = $${values.length}`;
    }

    values.push(limit);
    query += ` ORDER BY name ASC LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    return db.manyOrNone(query, values);
  }

  static async getItemById(id: string) {
    return db.oneOrNone(`SELECT * FROM inventory_items WHERE id = $1`, [id]);
  }

  static async createItem(data: Partial<InventoryItem>) {
    return db.one(
      `INSERT INTO inventory_items (item_code, name, description, category, quantity_in_stock, reorder_level, unit_cost_ugx, unit_selling_price_ugx, supplier, warranty_months, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        data.item_code,
        data.name,
        data.description,
        data.category,
        data.quantity_in_stock || 0,
        data.reorder_level || 10,
        data.unit_cost_ugx,
        data.unit_selling_price_ugx,
        data.supplier,
        data.warranty_months,
        data.notes
      ]
    );
  }

  static async updateItem(id: string, data: Partial<InventoryItem>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof InventoryItem] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof InventoryItem]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE inventory_items SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
  }

  static async getLowStockItems() {
    return db.manyOrNone(
      `SELECT * FROM inventory_items WHERE quantity_in_stock <= reorder_level`
    );
  }

  static async getTotalInventoryValue() {
    const result = await db.one(
      `SELECT SUM(quantity_in_stock * unit_cost_ugx) as total_value FROM inventory_items`
    );
    return result.total_value || 0;
  }
}
