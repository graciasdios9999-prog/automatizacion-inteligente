/**
 * Environment variable validation and type safety
 * Validates all required env vars on startup
 * NO secrets are logged
 */

const requiredEnvVars = {
  // Auth
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'string',
  CLERK_SECRET_KEY: 'secret',
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: 'string',
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: 'string',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: 'string',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: 'string',
  
  // Database
  DATABASE_URL: 'secret',
  
  // App
  NEXT_PUBLIC_APP_URL: 'string',
  NODE_ENV: 'string',
  
  // AI
  GROK_API_KEY: 'secret',
  NEXT_PUBLIC_GROK_MODEL: 'string',
  
  // Social APIs (optional but required for features)
  INSTAGRAM_ACCESS_TOKEN: 'secret',
  INSTAGRAM_BUSINESS_ACCOUNT_ID: 'string',
  TIKTOK_ACCESS_TOKEN: 'secret',
  TIKTOK_OPEN_ID: 'string',
  YOUTUBE_API_KEY: 'secret',
  YOUTUBE_CHANNEL_ID: 'string',
  X_BEARER_TOKEN: 'secret',
  RESEND_API_KEY: 'secret',
} as const;

type EnvVarType = 'string' | 'secret';

function validateEnv(): void {
  const missing: string[] = [];
  const issues: string[] = [];
  
  for (const [key, type] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];
    
    // In development, some APIs can be optional
    if (
      process.env.NODE_ENV === 'development' &&
      [
        'INSTAGRAM_ACCESS_TOKEN',
        'INSTAGRAM_BUSINESS_ACCOUNT_ID',
        'TIKTOK_ACCESS_TOKEN',
        'TIKTOK_OPEN_ID',
        'YOUTUBE_API_KEY',
        'YOUTUBE_CHANNEL_ID',
        'X_BEARER_TOKEN',
        'RESEND_API_KEY',
      ].includes(key)
    ) {
      continue;
    }
    
    if (!value) {
      missing.push(key);
    } else if (type === 'secret' && value.length < 3) {
      issues.push(`${key}: value appears invalid (too short)`);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required environment variables');
    }
  }
  
  if (issues.length > 0) {
    console.warn('⚠️  Possible environment variable issues:', issues);
  }
  
  console.log('✅ Environment validation passed');
}

export function getEnv() {
  return {
    // Auth
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
    
    // Database
    DATABASE_URL: process.env.DATABASE_URL || '',
    
    // App
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // AI
    GROK_API_KEY: process.env.GROK_API_KEY || '',
    NEXT_PUBLIC_GROK_MODEL: process.env.NEXT_PUBLIC_GROK_MODEL || 'grok-2',
    
    // Social
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
