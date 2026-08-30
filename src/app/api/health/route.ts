/**
 * Health check endpoint for monitoring and load balancers
 * Returns system status without exposing sensitive information
 */

import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { successResponse, errorResponse, ApiError } from '@/lib/api-response';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const startTime = Date.now();
    
    // Check database connectivity
    const dbHealthy = await checkDatabase();
    
    const duration = Date.now() - startTime;
    
    const status = dbHealthy ? 200 : 503;
    const response = successResponse({
      status: dbHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: {
        database: dbHealthy ? 'ok' : 'failing',
      },
      responseTime: `${duration}ms`,
    });
    
    logger.info('Health check', {
      module: 'health',
      status: dbHealthy ? 'ok' : 'degraded',
      duration,
    });
    
    return NextResponse.json(response, { status });
  } catch (error) {
    logger.error('Health check failed', error, { module: 'health' });
    
    const response = errorResponse(
      new ApiError(
        'HEALTH_CHECK_FAILED',
        'Health check failed',
        503
      )
    );
    
    return NextResponse.json(response, { status: 503 });
  }
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Try to import db client - if it fails, assume DB is unavailable
    // This is safe because we're catching all errors
    const { db } = await import('@/lib/db/client');
    
    if (!db) {
      return false;
    }
    
    // Attempt simple query
    await db.execute('SELECT 1');
    return true;
  } catch (error) {
    logger.debug('Database health check failed', { error: String(error) });
    return false;
  }
}
