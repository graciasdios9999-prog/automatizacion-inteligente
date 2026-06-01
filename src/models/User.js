import { DataTypes } from 'sequelize';
import sequelize from '../services/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  plan: {
    type: DataTypes.STRING,
    defaultValue: 'free'
  },
  stripeId: DataTypes.STRING,
  totalSpent: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  lastLogin: DataTypes.DATE
}, {
  timestamps: true
});

export default User;