import React, { useEffect, useRef } from 'react';

const DOTS = 20;
const DOT_SIZE = 18;
const DOT_MIN_SIZE = DOT_SIZE * 0.4; // Last dot is 40% of head size
const COLOR = '#6366f1'; // Tailwind indigo-500

const GooCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const positions = useRef(
    Array.from({ length: DOTS }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener('mousemove', handleMove);
    return () => {
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  useEffect(() => {
    let anim: number;
    const animate = () => {
      // Head follows mouse
      positions.current[0].x += (mouse.current.x - positions.current[0].x) * 0.5;
      positions.current[0].y += (mouse.current.y - positions.current[0].y) * 0.5;
      // Each dot follows the previous
      for (let i = 1; i < DOTS; i++) {
        positions.current[i].x += (positions.current[i - 1].x - positions.current[i].x) * 0.5;
        positions.current[i].y += (positions.current[i - 1].y - positions.current[i].y) * 0.5;
      }
      // Render
      for (let i = 0; i < DOTS; i++) {
        const el = dotRefs.current[i];
        if (el) {
          // Linear decrease in size from head to tail
          const size = DOT_SIZE - ((DOT_SIZE - DOT_MIN_SIZE) * (i / (DOTS - 1)));
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.transform = `translate3d(${positions.current[i].x - size / 2}px, ${positions.current[i].y - size / 2}px, 0)`;
        }
      }
      anim = requestAnimationFrame(animate);
    };
    anim = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(anim);
  }, []);

  // SVG filter for goo effect
  return (
    <>
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99999,
          filter: 'url(#goo)',
        }}
      >
        {Array.from({ length: DOTS }).map((_, i) => (
          <div
            key={i}
            ref={el => (dotRefs.current[i] = el)}
            style={{
              position: 'fixed',
              borderRadius: '50%',
              background: COLOR,
              pointerEvents: 'none',
              zIndex: 99999,
              willChange: 'transform,width,height',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GooCursor; 