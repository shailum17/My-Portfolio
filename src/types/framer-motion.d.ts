import { HTMLMotionProps } from 'framer-motion';

declare module 'framer-motion' {
  interface MotionProps extends HTMLMotionProps<"div"> {
    className?: string;
    children?: React.ReactNode;
  }
}

declare global {
  interface LayoutShift extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
  }
} 