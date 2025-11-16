import { SVGProps as ReactSVGProps } from 'react';

/**
 * Extended SVG props interface for custom SVG components
 * Includes all standard SVG attributes plus common custom props
 */
export interface SVGProps extends ReactSVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

/**
 * Props for SVG path elements
 */
export interface SVGPathProps extends ReactSVGProps<SVGPathElement> {
  d?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
}

/**
 * Props for SVG icon components
 */
export interface IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}
