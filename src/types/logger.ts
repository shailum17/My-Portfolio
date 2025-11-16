/**
 * Type definitions for logging utilities
 */

/**
 * Log level types
 */
export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * Log data that can be passed to logger functions
 * Can be any serializable data structure
 */
export type LogData = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined
  | Error
  | Record<string, unknown>
  | Array<unknown>
  | unknown;

/**
 * Structured log entry
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: LogData;
  timestamp: number;
  context?: string;
}

/**
 * Logger configuration options
 */
export interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  includeTimestamp?: boolean;
  includeContext?: boolean;
}

/**
 * Error log data with additional context
 */
export interface ErrorLogData {
  error: Error;
  context?: string;
  stack?: string;
  additionalInfo?: Record<string, unknown>;
}

/**
 * Logger interface
 */
export interface Logger {
  info: (message: string, data?: LogData) => void;
  warn: (message: string, data?: LogData) => void;
  error: (message: string, error?: LogData) => void;
  debug?: (message: string, data?: LogData) => void;
}
