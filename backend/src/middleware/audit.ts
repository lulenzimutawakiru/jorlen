import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database';

export const auditLog = async (
  userId: string | undefined,
  action: string,
  entityType: string | undefined,
  entityId: string | undefined,
  oldValues?: any,
  newValues?: any
) => {
  try {
    await db.none(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, action, entityType, entityId, JSON.stringify(oldValues), JSON.stringify(newValues)]
    );
  } catch (error) {
    console.error('Error logging audit trail:', error);
  }
};

export const auditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', async () => {
    if (req.method !== 'GET' && req.path.startsWith('/api/')) {
      const action = `${req.method} ${req.path}`;
      await auditLog(
        req.user?.id,
        action,
        undefined,
        undefined,
        undefined,
        req.body
      );
    }
  });
  next();
};
