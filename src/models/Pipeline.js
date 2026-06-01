import { DataTypes } from 'sequelize';
import sequelize from '../services/database.js';
import User from './User.js';

const Pipeline = sequelize.define('Pipeline', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: User, key: 'id' }
  },
  stage: {
    type: DataTypes.STRING,
    values: ['lead', 'prospect', 'proposal', 'negotiation', 'closed-won', 'closed-lost']
  },
  opportunity: DataTypes.STRING,
  value: DataTypes.FLOAT,
  probability: {
    type: DataTypes.FLOAT,
    defaultValue: 0.5
  },
  estimatedCloseDate: DataTypes.DATE,
  contactId: DataTypes.UUID,
  notes: DataTypes.TEXT,
  lastUpdated: DataTypes.DATE
}, {
  timestamps: true
});

export default Pipeline;