import { DataTypes } from 'sequelize';
import sequelize from '../services/database.js';
import User from './User.js';

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: User, key: 'id' }
  },
  stripeSubscriptionId: DataTypes.STRING,
  stripeCustomerId: DataTypes.STRING,
  plan: {
    type: DataTypes.STRING,
    values: ['free', 'basic', 'pro', 'enterprise']
  },
  status: {
    type: DataTypes.STRING,
    values: ['active', 'canceled', 'past_due', 'paused']
  },
  pricePerMonth: DataTypes.FLOAT,
  currentPeriodStart: DataTypes.DATE,
  currentPeriodEnd: DataTypes.DATE,
  canceledAt: DataTypes.DATE,
  features: DataTypes.JSON
}, {
  timestamps: true
});

export default Subscription;