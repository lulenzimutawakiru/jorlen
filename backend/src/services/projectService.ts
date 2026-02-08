import db from '../config/database';
import { Project } from '../types';
import { generateProjectCode } from '../utils/helpers';

export class ProjectService {
  static async getAllProjects(limit: number, offset: number, filter?: any) {
    let query = `SELECT * FROM projects WHERE 1=1`;
    const values: any[] = [];

    if (filter?.status) {
      values.push(filter.status);
      query += ` AND status = $${values.length}`;
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

  static async getProjectById(id: string) {
    return db.oneOrNone(`SELECT * FROM projects WHERE id = $1`, [id]);
  }

  static async createProject(data: Partial<Project>) {
    const projectCode = generateProjectCode();

    return db.one(
      `INSERT INTO projects (project_code, customer_id, title, description, project_type, status, start_date, planned_end_date, budget_ugx, assigned_engineer_id, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        projectCode,
        data.customer_id,
        data.title,
        data.description,
        data.project_type,
        data.status || 'planning',
        data.start_date,
        data.planned_end_date,
        data.budget_ugx,
        data.assigned_engineer_id,
        data.notes
      ]
    );
  }

  static async updateProject(id: string, data: Partial<Project>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof Project] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof Project]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
  }

  static async getProjectsByCustomer(customerId: string) {
    return db.manyOrNone(
      `SELECT * FROM projects WHERE customer_id = $1 ORDER BY created_at DESC`,
      [customerId]
    );
  }

  static async getProjectMilestones(projectId: string) {
    return db.manyOrNone(
      `SELECT * FROM project_milestones WHERE project_id = $1 ORDER BY planned_date`,
      [projectId]
    );
  }
}
