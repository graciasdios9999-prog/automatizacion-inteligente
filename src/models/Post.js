import { DataTypes } from 'sequelize';
import sequelize from '../services/database.js';
import User from './User.js';

const Post = sequelize.define('Post', {
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
    values: ['instagram', 'twitter', 'facebook', 'tiktok', 'linkedin']
  },
  content: DataTypes.TEXT,
  mediaUrl: DataTypes.STRING,
  engagement: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  reach: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postId: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    values: ['draft', 'scheduled', 'published', 'failed'],
    defaultValue: 'draft'
  },
  scheduledAt: DataTypes.DATE
}, {
  timestamps: true
});

export default Post;