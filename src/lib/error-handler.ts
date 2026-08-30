/**
 * Centralized error handling for API routes
 * Logs errors consistently and returns appropriate status codes
 */

import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { errorResponse, ApiError } from '@/lib/api-response';

export async function handleApiError(
  error: unknown,
  requestId?: string
) {
  logger.error('API error', error, {
    module: 'api',
    requestId,
  });
  
  if (error instanceof ApiError) {
    return NextResponse.json(
      errorResponse(error),
      { status: error.statusCode }
    );
  }
  
  if (error instanceof SyntaxError) {
    return NextResponse.json(
      errorResponse(
        new ApiError('INVALID_REQUEST', 'Invalid request format', 400)
      ),
      { status: 400 }
    );
  }
  
  if (error instanceof Error && error.message.includes('database')) {
    return NextResponse.json(
      errorResponse(
        new ApiError(
          'DATABASE_ERROR',
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Database error occurred',
          500
        )
      ),
      { status: 500 }
    );
  }
  
  return NextResponse.json(
    errorResponse(
      new ApiError(
        'INTERNAL_SERVER_ERROR',
        'An unexpected error occurred',
        500
      )
    ),
    { status: 500 }
  );
}
