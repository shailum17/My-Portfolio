import React, { useEffect, useRef } from 'react';

const DOTS = 12; // Reduced from 20 for better performance
const DOT_SIZE = 16; // Reduced from 18
const DOT_MIN_SIZE = DOT_SIZE * 0.3; // Last dot is 30% of head size

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRefs.current;
    
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = Array(DOTS).fill(0);
    let trailY = Array(DOTS).fill(0);

    const updateCursor = () => {
      // Smooth cursor movement with easing
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Update trail with optimized interpolation
      for (let i = 0; i < DOTS; i++) {
        if (i === 0) {
          trailX[i] += (cursorX - trailX[i]) * 0.3;
          trailY[i] += (cursorY - trailY[i]) * 0.3;
        } else {
          trailX[i] += (trailX[i - 1] - trailX[i]) * 0.25;
          trailY[i] += (trailY[i - 1] - trailY[i]) * 0.25;
        }
        
        if (trail[i]) {
          trail[i]!.style.left = `${trailX[i]}px`;
          trail[i]!.style.top = `${trailY[i]}px`;
          
          // Calculate decreasing size for snake effect
          const sizeRatio = 1 - (i / DOTS) * 0.7; // More dramatic size decrease
          const currentSize = DOT_MIN_SIZE + (DOT_SIZE - DOT_MIN_SIZE) * sizeRatio;
          trail[i]!.style.width = `${currentSize}px`;
          trail[i]!.style.height = `${currentSize}px`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseRef.current = { x: mouseX, y: mouseY };
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'scale(0.8)';
      trail.forEach(dot => {
        if (dot) dot.style.transform = 'scale(0.8)';
      });
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'scale(1)';
      trail.forEach(dot => {
        if (dot) dot.style.transform = 'scale(1)';
      });
    };

    // Start animation loop
    updateCursor();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-blue-600 rounded-full mix-blend-normal pointer-events-none transition-transform duration-150 ease-out"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      />
      
      {/* Trail dots */}
      {Array.from({ length: DOTS }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          className="fixed bg-blue-600 rounded-full pointer-events-none transition-transform duration-150 ease-out"
          style={{
            transform: 'translate(-50%, -50%)',
            width: `${DOT_MIN_SIZE + (DOT_SIZE - DOT_MIN_SIZE) * (1 - i / DOTS)}px`,
            height: `${DOT_MIN_SIZE + (DOT_SIZE - DOT_MIN_SIZE) * (1 - i / DOTS)}px`,
            opacity: 0.8 - (i / DOTS) * 0.6,
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  );
} 