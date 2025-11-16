/**
 * Type definitions for analytics tracking
 */

/**
 * Details object for analytics events
 * Used to pass additional context with analytics events
 */
export interface AnalyticsDetails {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Form types for contact submission tracking
 */
export type ContactFormType = 'email' | 'linkedin' | 'github';

/**
 * Experience interaction types
 */
export type ExperienceType = 'education' | 'internship' | 'certification';

/**
 * Performance metric names
 */
export type PerformanceMetricName = 
  | 'FCP'  // First Contentful Paint
  | 'LCP'  // Largest Contentful Paint
  | 'FID'  // First Input Delay
  | 'CLS'  // Cumulative Layout Shift
  | 'TTFB' // Time to First Byte
  | string;

/**
 * User engagement action types
 */
export type EngagementAction = 
  | 'click'
  | 'scroll'
  | 'hover'
  | 'focus'
  | 'submit'
  | 'download'
  | string;

/**
 * Scroll depth percentages
 */
export type ScrollDepth = 25 | 50 | 75 | 100;

/**
 * Analytics event data structure
 */
export interface AnalyticsEvent {
  name: string;
  properties?: AnalyticsDetails;
  timestamp?: number;
}

/**
 * Section view event data
 */
export interface SectionViewEvent {
  section: string;
}

/**
 * Project click event data
 */
export interface ProjectClickEvent {
  project: string;
  url?: string;
}

/**
 * Contact submit event data
 */
export interface ContactSubmitEvent {
  type: ContactFormType;
}

/**
 * Skill filter event data
 */
export interface SkillFilterEvent {
  category: string;
}

/**
 * Publication view event data
 */
export interface PublicationViewEvent {
  title: string;
}

/**
 * Experience interaction event data
 */
export interface ExperienceInteractionEvent {
  type: ExperienceType;
}

/**
 * Page performance event data
 */
export interface PagePerformanceEvent {
  metric: PerformanceMetricName;
  value: number;
}

/**
 * User engagement event data
 */
export interface UserEngagementEvent {
  action: EngagementAction;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Scroll depth event data
 */
export interface ScrollDepthEvent {
  depth: ScrollDepth;
}

/**
 * Time on page event data
 */
export interface TimeOnPageEvent {
  seconds: number;
}
