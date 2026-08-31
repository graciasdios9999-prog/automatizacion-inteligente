/**
 * Structured logging for production observability
 * Formats logs consistently for monitoring and debugging
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  requestId?: string;
  module?: string;
  duration?: number;
  [key: string]: any;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';
  
  private formatLog(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): object {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context }),
    };
  }
  
  debug(message: string, context?: LogContext): void {
    if (!this.isDev) return;
    console.log(JSON.stringify(this.formatLog('debug', message, context)));
  }
  
  info(message: string, context?: LogContext): void {
    console.log(JSON.stringify(this.formatLog('info', message, context)));
  }
  
  warn(message: string, context?: LogContext): void {
    console.warn(JSON.stringify(this.formatLog('warn', message, context)));
  }
  
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorInfo = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: this.isDev ? error.stack : undefined,
    } : {
      error: String(error),
    };
    
    console.error(JSON.stringify(this.formatLog('error', message, {
      ...context,
      ...errorInfo,
    })));
  }
}

export const logger = new Logger();
