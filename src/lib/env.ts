/**
 * Environment variable validation — soft mode for Hostinger.
 * Landing + Stripe payment links work WITHOUT Clerk / DB / AI secrets.
 * Missing vars are logged; production never throws.
 */

const optionalEnvVars = [
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'DATABASE_URL',
  'GROK_API_KEY',
  'INSTAGRAM_ACCESS_TOKEN',
  'TIKTOK_ACCESS_TOKEN',
  'YOUTUBE_API_KEY',
  'X_BEARER_TOKEN',
  'RESEND_API_KEY',
] as const;

function validateEnv(): void {
  const missing = optionalEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.warn('[env] Optional secrets not set (OK for Midlife landing):', missing.join(', '));
  }
  console.log('✅ Environment validation passed (soft mode)');
}

export function getEnv() {
  return {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || 'https://hotpink-quail-769272.hostingersite.com',
    NODE_ENV: process.env.NODE_ENV || 'development',
    GROK_API_KEY: process.env.GROK_API_KEY || '',
    NEXT_PUBLIC_GROK_MODEL: process.env.NEXT_PUBLIC_GROK_MODEL || 'grok-2',
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || '',
    INSTAGRAM_BUSINESS_ACCOUNT_ID: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '',
    TIKTOK_ACCESS_TOKEN: process.env.TIKTOK_ACCESS_TOKEN || '',
    TIKTOK_OPEN_ID: process.env.TIKTOK_OPEN_ID || '',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || '',
    X_BEARER_TOKEN: process.env.X_BEARER_TOKEN || '',
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  };
}

if (typeof window === 'undefined') {
  validateEnv();
}
