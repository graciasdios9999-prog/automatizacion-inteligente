import { DataTypes } from 'sequelize';
import sequelize from '../services/database.js';
import User from './User.js';

const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: User, key: 'id' }
  },
  platform: {
    type: DataTypes.STRING,
    values: ['instagram', 'twitter', 'facebook', 'tiktok', 'linkedin', 'overall']
  },
  totalPosts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalEngagement: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalReach: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalImpressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  engagementRate: DataTypes.FLOAT,
  topPost: DataTypes.STRING,
  growthRate: DataTypes.FLOAT,
  date: DataTypes.DATE,
  hour: DataTypes.INTEGER
}, {
  timestamps: true
});

export default Analytics;