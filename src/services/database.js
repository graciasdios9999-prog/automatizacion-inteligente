import { Sequelize } from 'sequelize';
import logger from '../utils/logger.js';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'auto_inteligente_2026',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    ssl: process.env.DB_SSL === 'true'
  }
);

sequelize.authenticate()
  .then(() => logger.info('✅ Database connected'))
  .catch(err => logger.error('❌ Database error:', err));

export default sequelize;