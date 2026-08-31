/**
 * Input validation schemas using Zod
 * Ensures type-safe validation across API endpoints
 */

import { z } from 'zod';

// Common schemas
const userId = z.string().uuid('Invalid user ID');
const email = z.string().email('Invalid email address');
const url = z.string().url('Invalid URL');
const platform = z.enum([
  'instagram',
  'tiktok',
  'youtube',
  'x',
  'linkedin',
]);
const contentCategory = z.enum([
  'personal_finance',
  'investment',
  'business',
  'lifestyle',
  'motivation',
]);

// Content Generation
export const generateContentSchema = z.object({
  platform,
  category: contentCategory,
  topic: z.string().min(3).max(200),
  tone: z.enum(['professional', 'casual', 'humorous', 'inspirational']).optional(),
  includeHashtags: z.boolean().default(true),
});

export type GenerateContentInput = z.infer<typeof generateContentSchema>;

// Lead Creation
export const createLeadSchema = z.object({
  name: z.string().min(2).max(100),
  email,
  platform,
  source: z.string().max(255),
  temperature: z.enum(['cold', 'warm', 'hot']).default('cold'),
  metadata: z.record(z.any()).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

// Social Media Account
export const socialAccountSchema = z.object({
  platform,
  accountId: z.string(),
  accessToken: z.string().min(1),
  username: z.string().optional(),
});

export type SocialAccountInput = z.infer<typeof socialAccountSchema>;

// Pagination
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

// Validation helper
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { valid: true; data: T } | { valid: false; errors: string[] } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { valid: true, data: result.data };
  }
  
  const errors = result.error.errors.map(err => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  });
  
  return { valid: false, errors };
}
