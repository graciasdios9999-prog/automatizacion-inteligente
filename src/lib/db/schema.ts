import { pgTable, text, serial, timestamp, boolean, integer, decimal, jsonb, varchar, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}));

// Social Media Accounts Table
export const socialAccounts = pgTable('social_accounts', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  platform: varchar('platform', { length: 50 }).notNull(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  handle: varchar('handle', { length: 255 }).notNull(),
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at'),
  followers: integer('followers').default(0),
  isConnected: boolean('is_connected').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('social_accounts_user_id_idx').on(table.userId),
  platformIdx: index('social_accounts_platform_idx').on(table.platform),
}));

// Content Templates Table
export const contentTemplates = pgTable('content_templates', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  contentType: varchar('content_type', { length: 50 }).notNull(),
  description: text('description'),
  prompt: text('prompt').notNull(),
  tags: jsonb('tags').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('content_templates_user_id_idx').on(table.userId),
  categoryIdx: index('content_templates_category_idx').on(table.category),
}));

// Generated Content Table
export const generatedContent = pgTable('generated_content', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  templateId: integer('template_id').references(() => contentTemplates.id, { onDelete: 'set null' }),
  platform: varchar('platform', { length: 50 }).notNull(),
  contentType: varchar('content_type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content').notNull(),
  hooks: jsonb('hooks').$type<string[]>(),
  cta: text('cta'),
  hashtags: jsonb('hashtags').$type<string[]>(),
  emojis: jsonb('emojis').$type<string[]>(),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  scheduledFor: timestamp('scheduled_for'),
  publishedAt: timestamp('published_at'),
  platformPostId: varchar('platform_post_id', { length: 255 }),
  engagementData: jsonb('engagement_data'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('generated_content_user_id_idx').on(table.userId),
  statusIdx: index('generated_content_status_idx').on(table.status),
  platformIdx: index('generated_content_platform_idx').on(table.platform),
  scheduledIdx: index('generated_content_scheduled_idx').on(table.scheduledFor),
}));

// Leads Table
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sourceContentId: integer('source_content_id').references(() => generatedContent.id, { onDelete: 'set null' }),
  platform: varchar('platform', { length: 50 }).notNull(),
  platformUserId: varchar('platform_user_id', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  followersCount: integer('followers_count'),
  engagementScore: decimal('engagement_score', { precision: 5, scale: 2 }).default('0'),
  temperature: varchar('temperature', { length: 20 }).default('cold'),
  initialMessage: text('initial_message'),
  leadMagnetDelivered: boolean('lead_magnet_delivered').default(false),
  leadMagnetType: varchar('lead_magnet_type', { length: 100 }),
  followUpSequenceStep: integer('follow_up_sequence_step').default(0),
  lastInteractionAt: timestamp('last_interaction_at'),
  convertedToSale: boolean('converted_to_sale').default(false),
  saleAmount: decimal('sale_amount', { precision: 10, scale: 2 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('leads_user_id_idx').on(table.userId),
  temperatureIdx: index('leads_temperature_idx').on(table.temperature),
  platformIdx: index('leads_platform_idx').on(table.platform),
  convertedIdx: index('leads_converted_idx').on(table.convertedToSale),
}));

// Analytics/Metrics Table
export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentId: integer('content_id').references(() => generatedContent.id, { onDelete: 'set null' }),
  platform: varchar('platform', { length: 50 }).notNull(),
  date: timestamp('date').notNull(),
  impressions: integer('impressions').default(0),
  engagement: integer('engagement').default(0),
  clicks: integer('clicks').default(0),
  shares: integer('shares').default(0),
  comments: integer('comments').default(0),
  saves: integer('saves').default(0),
  leads: integer('leads').default(0),
  conversions: integer('conversions').default(0),
  revenue: decimal('revenue', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('metrics_user_id_idx').on(table.userId),
  dateIdx: index('metrics_date_idx').on(table.date),
  platformIdx: index('metrics_platform_idx').on(table.platform),
}));

// Lead Magnet Library
export const leadMagnets = pgTable('lead_magnets', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  description: text('description'),
  fileUrl: text('file_url'),
  downloadLink: text('download_link'),
  deliveryMethod: varchar('delivery_method', { length: 100 }).default('email'),
  emailContent: text('email_content'),
  conversionRate: decimal('conversion_rate', { precision: 5, scale: 2 }).default('0'),
  timesDelivered: integer('times_delivered').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('lead_magnets_user_id_idx').on(table.userId),
  typeIdx: index('lead_magnets_type_idx').on(table.type),
}));

// Automation Rules
export const automationRules = pgTable('automation_rules', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  trigger: jsonb('trigger').notNull(),
  action: jsonb('action').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('automation_rules_user_id_idx').on(table.userId),
  activeIdx: index('automation_rules_active_idx').on(table.isActive),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  socialAccounts: many(socialAccounts),
  generatedContent: many(generatedContent),
  leads: many(leads),
  metrics: many(metrics),
  contentTemplates: many(contentTemplates),
  leadMagnets: many(leadMagnets),
  automationRules: many(automationRules),
}));

export const socialAccountsRelations = relations(socialAccounts, ({ one }) => ({
  user: one(users, { fields: [socialAccounts.userId], references: [users.id] }),
}));

export const generatedContentRelations = relations(generatedContent, ({ one, many }) => ({
  user: one(users, { fields: [generatedContent.userId], references: [users.id] }),
  template: one(contentTemplates, { fields: [generatedContent.templateId], references: [contentTemplates.id] }),
  leads: many(leads),
  metrics: many(metrics),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  user: one(users, { fields: [leads.userId], references: [users.id] }),
  sourceContent: one(generatedContent, { fields: [leads.sourceContentId], references: [generatedContent.id] }),
}));

export const metricsRelations = relations(metrics, ({ one }) => ({
  user: one(users, { fields: [metrics.userId], references: [users.id] }),
  content: one(generatedContent, { fields: [metrics.contentId], references: [generatedContent.id] }),
}));

export const contentTemplatesRelations = relations(contentTemplates, ({ one, many }) => ({
  user: one(users, { fields: [contentTemplates.userId], references: [users.id] }),
  generatedContent: many(generatedContent),
}));

export const leadMagnetsRelations = relations(leadMagnets, ({ one }) => ({
  user: one(users, { fields: [leadMagnets.userId], references: [users.id] }),
}));

export const automationRulesRelations = relations(automationRules, ({ one }) => ({
  user: one(users, { fields: [automationRules.userId], references: [users.id] }),
}));