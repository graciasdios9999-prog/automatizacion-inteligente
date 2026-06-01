-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255),
  plan VARCHAR(50) DEFAULT 'free',
  stripe_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  total_spent DECIMAL(10, 2) DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  platform VARCHAR(50) NOT NULL,
  content TEXT,
  media_url TEXT,
  engagement INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  post_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'draft',
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  platform VARCHAR(50),
  total_posts INTEGER DEFAULT 0,
  total_engagement INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5, 2),
  growth_rate DECIMAL(5, 2),
  date DATE,
  hour INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(255),
  source VARCHAR(50),
  status VARCHAR(50) DEFAULT 'lead',
  last_contact_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Pipeline Table
CREATE TABLE IF NOT EXISTS pipeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stage VARCHAR(50),
  opportunity VARCHAR(255),
  value DECIMAL(10, 2),
  probability DECIMAL(3, 2) DEFAULT 0.5,
  estimated_close_date DATE,
  contact_id UUID REFERENCES contacts(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  plan VARCHAR(50),
  status VARCHAR(50),
  price_per_month DECIMAL(10, 2),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  canceled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_invoice_id VARCHAR(255),
  amount DECIMAL(10, 2),
  status VARCHAR(50),
  due_date TIMESTAMP,
  paid_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Affiliate Links Table
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  affiliate_code VARCHAR(255) UNIQUE,
  earnings DECIMAL(10, 2) DEFAULT 0,
  referrals INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  commission_rate DECIMAL(5, 2) DEFAULT 30,
  total_payout DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Prompts Table (Marketplace)
CREATE TABLE IF NOT EXISTS marketplace_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prompt TEXT NOT NULL,
  price DECIMAL(10, 2),
  category VARCHAR(100),
  rating DECIMAL(3, 2) DEFAULT 5,
  sales INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_user_posts ON posts(user_id);
CREATE INDEX idx_user_analytics ON analytics(user_id);
CREATE INDEX idx_user_contacts ON contacts(user_id);
CREATE INDEX idx_platform_analytics ON analytics(platform);
CREATE INDEX idx_date_analytics ON analytics(date);
CREATE INDEX idx_affiliate_code ON affiliates(affiliate_code);