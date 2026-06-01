import fs from 'fs';
import { Pool } from 'pg';
import logger from '../utils/logger.js';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'auto_inteligente_2026',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
});

const runMigrations = async () => {
  try {
    const sqlFile = fs.readFileSync('./migrations/001-initial-schema.sql', 'utf-8');
    const statements = sqlFile.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      await pool.query(statement);
      logger.info(`✅ Migration executed`);
    }
    
    logger.info(`✅ All migrations completed`);
    process.exit(0);
  } catch (error) {
    logger.error(`Migration error: ${error.message}`);
    process.exit(1);
  }
};

runMigrations();