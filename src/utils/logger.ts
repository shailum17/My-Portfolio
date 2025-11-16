import type { LogData } from '../types/logger';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  info: (message: string, data?: LogData) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  error: (message: string, error?: LogData) => {
    if (isDevelopment) {
      console.error(message, error);
    }
    // In production, send to error tracking service
  },
  
  warn: (message: string, data?: LogData) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  }
}; 