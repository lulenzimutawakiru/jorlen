import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

const connection = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'jorlen_crm',
  user: process.env.DB_USER || 'crm_user',
  password: process.env.DB_PASSWORD || 'password'
};

export const db = pgp(connection);

export default db;
