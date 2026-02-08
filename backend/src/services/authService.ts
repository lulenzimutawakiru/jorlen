import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import { User } from '../types';

export class AuthService {
  static async registerUser(email: string, password: string, firstName: string, lastName: string, role: string = 'staff') {
    const hashedPassword = await bcrypt.hash(password, 10);

    return db.one(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name, role`,
      [email, hashedPassword, firstName, lastName, role]
    );
  }

  static async loginUser(email: string, password: string) {
    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await db.none(
      `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1`,
      [user.id]
    );

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      },
      token
    };
  }

  static async getUserById(id: string) {
    return db.oneOrNone(
      `SELECT id, email, first_name, last_name, phone, role, is_active, created_at FROM users WHERE id = $1`,
      [id]
    );
  }

  static async updateUserProfile(id: string, data: Partial<User>) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'created_at' && data[key as keyof User] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(data[key as keyof User]);
        paramCount++;
      }
    });

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    return db.oneOrNone(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, email, first_name, last_name, phone, role, is_active`,
      values
    );
  }

  static async getAllUsers() {
    return db.manyOrNone(
      `SELECT id, email, first_name, last_name, phone, role, is_active, last_login, created_at FROM users ORDER BY created_at DESC`
    );
  }
}
