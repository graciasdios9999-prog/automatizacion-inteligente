import { DataTypes } from 'sequelize';
import sequelize from '../services/database.js';
import User from './User.js';

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: User, key: 'id' }
  },
  email: DataTypes.STRING,
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  company: DataTypes.STRING,
  source: {
    type: DataTypes.STRING,
    values: ['instagram', 'twitter', 'facebook', 'website', 'direct', 'other']
  },
  status: {
    type: DataTypes.STRING,
    values: ['lead', 'prospect', 'customer', 'inactive'],
    defaultValue: 'lead'
  },
  tags: DataTypes.JSON,
  lastContactDate: DataTypes.DATE,
  notes: DataTypes.TEXT,
  customFields: DataTypes.JSON
}, {
  timestamps: true
});

export default Contact;