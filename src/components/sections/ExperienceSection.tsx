import timelineData from '../../data/timelineData';
import TimelineItem from '../ui/TimelineItem';
import { Award } from "lucide-react";
import { useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { internships, certifications } from '../../data/experienceData';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  // Helper: SVG doodle options
  const doodleSvgs = [
    // Graduation Cap
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><path d="M32 8L4 20l28 12 28-12-28-12zm0 0v8m0 0l20 8m-20-8L12 16m20 8v16m0 0l-8 4m8-4l8 4" stroke="#5b21b6" strokeWidth="2" strokeLinejoin="round"/></svg>,
    // Book
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="20" height="32" rx="2" stroke="#3730a3" strokeWidth="2"/><rect x="36" y="16" width="20" height="32" rx="2" stroke="#3730a3" strokeWidth="2"/><path d="M28 16v32M36 16v32" stroke="#3730a3" strokeWidth="2"/></svg>,
    // Pen
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="20" y="10" width="24" height="8" rx="2" stroke="#ea580c" strokeWidth="2"/><rect x="24" y="18" width="16" height="28" rx="2" stroke="#5b21b6" strokeWidth="2"/><rect x="28" y="46" width="8" height="8" rx="2" stroke="#3730a3" strokeWidth="2"/></svg>,
    // Globe
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" stroke="#047857" strokeWidth="2"/><path d="M32 8a24 24 0 010 48M8 32h48" stroke="#047857" strokeWidth="2"/></svg>,
    // Ruler
    (props: any) => <svg {...props} viewBox="0 0 64 20" fill="none"><rect x="2" y="2" width="60" height="16" rx="3" stroke="#ea580c" strokeWidth="2"/><path d="M10 2v16M18 2v16M26 2v16M34 2v16M42 2v16M50 2v16M58 2v16" stroke="#ea580c" strokeWidth="1.5"/></svg>,
    // Lightbulb
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="20" stroke="#f59e42" strokeWidth="2"/><path d="M32 44v4M28 48h8" stroke="#f59e42" strokeWidth="2"/><path d="M24 32a8 8 0 1116 0c0 4-4 8-8 8s-8-4-8-8z" stroke="#f59e42" strokeWidth="2"/></svg>,
    // Certificate
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="4" stroke="#3730a3" strokeWidth="2"/><circle cx="32" cy="32" r="6" stroke="#5b21b6" strokeWidth="2"/><path d="M32 38v8" stroke="#5b21b6" strokeWidth="2"/></svg>,
    // Apple
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="40" rx="16" ry="12" stroke="#ef4444" strokeWidth="2"/><path d="M32 28c0-4 4-8 8-8" stroke="#22c55e" strokeWidth="2"/><path d="M32 28c0-4-4-8-8-8" stroke="#22c55e" strokeWidth="2"/></svg>,
    // Math: E=mc²
    (props: any) => <svg {...props} viewBox="0 0 120 24" fill="none"><text x="0" y="18" fontFamily="monospace" fontSize="20" fill="#ea580c">E=mc<tspan baseline-shift="super" fontSize="12">2</tspan></text></svg>,
    // Math: π
    (props: any) => <svg {...props} viewBox="0 0 32 32" fill="none"><text x="0" y="24" fontFamily="monospace" fontSize="32" fill="#5b21b6">π</text></svg>,
    // Math: ∑
    (props: any) => <svg {...props} viewBox="0 0 32 32" fill="none"><text x="0" y="24" fontFamily="monospace" fontSize="32" fill="#3730a3">∑</text></svg>,
    // Math: √
    (props: any) => <svg {...props} viewBox="0 0 32 32" fill="none"><text x="0" y="24" fontFamily="monospace" fontSize="32" fill="#10b981">√</text></svg>,
    // Atom
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="32" rx="20" ry="8" stroke="#3730a3" strokeWidth="2"/><ellipse cx="32" cy="32" rx="8" ry="20" stroke="#5b21b6" strokeWidth="2"/><circle cx="32" cy="32" r="4" fill="#f59e42"/></svg>,
    // Flask
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="28" y="16" width="8" height="24" rx="2" stroke="#047857" strokeWidth="2"/><ellipse cx="32" cy="48" rx="12" ry="6" stroke="#3730a3" strokeWidth="2"/></svg>,
    // Paint Palette
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="40" rx="16" ry="12" stroke="#f59e42" strokeWidth="2"/><circle cx="24" cy="40" r="2" fill="#ef4444"/><circle cx="32" cy="44" r="2" fill="#22c55e"/><circle cx="40" cy="40" r="2" fill="#3730a3"/></svg>,
    // Backpack
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="16" y="24" width="32" height="28" rx="8" stroke="#3730a3" strokeWidth="2"/><rect x="24" y="36" width="16" height="8" rx="2" stroke="#5b21b6" strokeWidth="2"/><path d="M32 24v-8" stroke="#5b21b6" strokeWidth="2"/></svg>,
    // Calculator
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="16" y="16" width="32" height="32" rx="4" stroke="#ea580c" strokeWidth="2"/><rect x="24" y="24" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/><rect x="32" y="24" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/><rect x="24" y="32" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/><rect x="32" y="32" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/></svg>,
    // Abacus
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><rect x="16" y="16" width="32" height="32" rx="4" stroke="#ea580c" strokeWidth="2"/><circle cx="24" cy="24" r="2" fill="#ef4444"/><circle cx="32" cy="24" r="2" fill="#22c55e"/><circle cx="40" cy="24" r="2" fill="#3730a3"/></svg>,
    // Compass
    (props: any) => <svg {...props} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" stroke="#3730a3" strokeWidth="2"/><path d="M32 8v48M8 32h48" stroke="#5b21b6" strokeWidth="2"/></svg>,
  ];

  // Generate 100+ doodles with random positions, sizes, and rotations
  const doodleCount = 110;
  const doodleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doodles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < doodleCount; i++) {
      const Svg = doodleSvgs[Math.floor(Math.random() * doodleSvgs.length)];
      const top = Math.random() * 90; // percent
      const left = Math.random() * 90; // percent
      const size = 16 + Math.random() * 32; // px
      const rotate = Math.random() * 360;
      arr.push(
        <div
          key={i}
          ref={el => { doodleRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${rotate}deg)`
          }}
        >
          <Svg className="opacity-40 z-0 drop-shadow w-full h-full" />
        </div>
      );
    }
    return arr;
  }, []);

  // Floating and repel animation
  useEffect(() => {
    // Floating animation
    const floatAnims = doodleRefs.current.map((el, i) => {
      if (!el) return null;
      const x = Math.random() * 80 - 40;
      const y = Math.random() * 80 - 40;
      gsap.set(el, { x, y });
      return gsap.to(el, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        repeat: -1,
        yoyo: true,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    }).filter(Boolean);

    // Repel effect
    const container = document.getElementById('education-doodle-bg');
    const handleMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      doodleRefs.current.forEach((el) => {
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        const elX = elRect.left + elRect.width / 2 - rect.left;
        const elY = elRect.top + elRect.height / 2 - rect.top;
        const dx = elX - mouseX;
        const dy = elY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;
        if (dist < maxDist) {
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * (maxDist - dist);
          const ty = Math.sin(angle) * (maxDist - dist);
          gsap.to(el, {
            x: `+=${tx}`,
            y: `+=${ty}`,
            scale: 1.1,
            duration: 0.3,
            overwrite: true,
          });
        } else {
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, overwrite: true });
        }
      });
    };
    const handleLeave = () => {
      doodleRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, overwrite: true });
      });
    };
    container?.addEventListener('mousemove', handleMove);
    container?.addEventListener('mouseleave', handleLeave);
    return () => {
      container?.removeEventListener('mousemove', handleMove);
      container?.removeEventListener('mouseleave', handleLeave);
      floatAnims.forEach(anim => anim && anim.kill());
    };
  }, []);

  return (
    <section id="experience" className="relative py-20 bg-white overflow-hidden">
      {/* Education SVG Background Elements */}
      <div id="education-doodle-bg" className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
        {doodles}
        {/* Graduation Cap SVGs */}
        <svg className="absolute top-10 left-10 w-10 h-10 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><path d="M32 8L4 20l28 12 28-12-28-12zm0 0v8m0 0l20 8m-20-8L12 16m20 8v16m0 0l-8 4m8-4l8 4" stroke="#5b21b6" strokeWidth="2" strokeLinejoin="round"/></svg>
        <svg className="absolute top-32 left-1/4 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><path d="M32 8L4 20l28 12 28-12-28-12zm0 0v8m0 0l20 8m-20-8L12 16m20 8v16m0 0l-8 4m8-4l8 4" stroke="#5b21b6" strokeWidth="2" strokeLinejoin="round"/></svg>
        {/* Book SVGs */}
        <svg className="absolute bottom-10 right-20 w-12 h-12 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="20" height="32" rx="2" stroke="#3730a3" strokeWidth="2"/><rect x="36" y="16" width="20" height="32" rx="2" stroke="#3730a3" strokeWidth="2"/><path d="M28 16v32M36 16v32" stroke="#3730a3" strokeWidth="2"/></svg>
        <svg className="absolute bottom-32 right-1/3 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="20" height="32" rx="2" stroke="#3730a3" strokeWidth="2"/><rect x="36" y="16" width="20" height="32" rx="2" stroke="#3730a3" strokeWidth="2"/><path d="M28 16v32M36 16v32" stroke="#3730a3" strokeWidth="2"/></svg>
        {/* Pencil SVGs */}
        <svg className="absolute bottom-24 left-1/3 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="44" y="8" width="8" height="32" rx="2" transform="rotate(45 44 8)" stroke="#ea580c" strokeWidth="2"/><rect x="20" y="44" width="8" height="12" rx="2" transform="rotate(-45 20 44)" stroke="#ea580c" strokeWidth="2"/></svg>
        <svg className="absolute top-1/2 left-1/4 w-6 h-6 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="44" y="8" width="8" height="32" rx="2" transform="rotate(45 44 8)" stroke="#ea580c" strokeWidth="2"/><rect x="20" y="44" width="8" height="12" rx="2" transform="rotate(-45 20 44)" stroke="#ea580c" strokeWidth="2"/></svg>
        {/* Globe SVGs */}
        <svg className="absolute top-24 right-10 w-10 h-10 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" stroke="#047857" strokeWidth="2"/><path d="M32 8a24 24 0 010 48M8 32h48" stroke="#047857" strokeWidth="2"/></svg>
        <svg className="absolute bottom-10 left-1/2 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" stroke="#047857" strokeWidth="2"/><path d="M32 8a24 24 0 010 48M8 32h48" stroke="#047857" strokeWidth="2"/></svg>
        {/* Ruler SVGs */}
        <svg className="absolute top-1/2 left-10 w-10 h-4 opacity-50 drop-shadow" viewBox="0 0 64 20" fill="none"><rect x="2" y="2" width="60" height="16" rx="3" stroke="#ea580c" strokeWidth="2"/><path d="M10 2v16M18 2v16M26 2v16M34 2v16M42 2v16M50 2v16M58 2v16" stroke="#ea580c" strokeWidth="1.5"/></svg>
        <svg className="absolute top-1/4 right-1/4 w-8 h-2 opacity-50 drop-shadow" viewBox="0 0 64 20" fill="none"><rect x="2" y="2" width="60" height="16" rx="3" stroke="#ea580c" strokeWidth="2"/><path d="M10 2v16M18 2v16M26 2v16M34 2v16M42 2v16M50 2v16M58 2v16" stroke="#ea580c" strokeWidth="1.5"/></svg>
        {/* Lightbulb SVGs */}
        <svg className="absolute bottom-10 left-10 w-6 h-6 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="20" stroke="#f59e42" strokeWidth="2"/><path d="M32 44v4M28 48h8" stroke="#f59e42" strokeWidth="2"/><path d="M24 32a8 8 0 1116 0c0 4-4 8-8 8s-8-4-8-8z" stroke="#f59e42" strokeWidth="2"/></svg>
        <svg className="absolute top-10 right-10 w-6 h-6 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="20" stroke="#f59e42" strokeWidth="2"/><path d="M32 44v4M28 48h8" stroke="#f59e42" strokeWidth="2"/><path d="M24 32a8 8 0 1116 0c0 4-4 8-8 8s-8-4-8-8z" stroke="#f59e42" strokeWidth="2"/></svg>
        {/* Certificate SVGs */}
        <svg className="absolute top-10 right-1/4 w-6 h-6 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="4" stroke="#3730a3" strokeWidth="2"/><circle cx="32" cy="32" r="6" stroke="#5b21b6" strokeWidth="2"/><path d="M32 38v8" stroke="#5b21b6" strokeWidth="2"/></svg>
        <svg className="absolute bottom-1/4 left-1/4 w-6 h-6 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="4" stroke="#3730a3" strokeWidth="2"/><circle cx="32" cy="32" r="6" stroke="#5b21b6" strokeWidth="2"/><path d="M32 38v8" stroke="#5b21b6" strokeWidth="2"/></svg>
        {/* Apple SVG */}
        <svg className="absolute top-16 right-1/3 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="40" rx="16" ry="12" stroke="#ef4444" strokeWidth="2"/><path d="M32 28c0-4 4-8 8-8" stroke="#22c55e" strokeWidth="2"/><path d="M32 28c0-4-4-8-8-8" stroke="#22c55e" strokeWidth="2"/></svg>
        {/* Backpack SVG */}
        <svg className="absolute bottom-16 right-1/5 w-10 h-10 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="16" y="24" width="32" height="28" rx="8" stroke="#3730a3" strokeWidth="2"/><rect x="24" y="36" width="16" height="8" rx="2" stroke="#5b21b6" strokeWidth="2"/><path d="M32 24v-8" stroke="#5b21b6" strokeWidth="2"/></svg>
        {/* Calculator SVG */}
        <svg className="absolute top-1/3 left-1/5 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="16" y="16" width="32" height="32" rx="4" stroke="#ea580c" strokeWidth="2"/><rect x="24" y="24" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/><rect x="32" y="24" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/><rect x="24" y="32" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/><rect x="32" y="32" width="8" height="8" rx="1" stroke="#3730a3" strokeWidth="2"/></svg>
        {/* Paint Palette SVG */}
        <svg className="absolute top-1/4 left-1/2 w-10 h-10 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="40" rx="16" ry="12" stroke="#f59e42" strokeWidth="2"/><circle cx="24" cy="40" r="2" fill="#ef4444"/><circle cx="32" cy="44" r="2" fill="#22c55e"/><circle cx="40" cy="40" r="2" fill="#3730a3"/></svg>
        {/* Atom SVG */}
        <svg className="absolute bottom-1/3 right-1/2 w-10 h-10 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="32" rx="20" ry="8" stroke="#3730a3" strokeWidth="2"/><ellipse cx="32" cy="32" rx="8" ry="20" stroke="#5b21b6" strokeWidth="2"/><circle cx="32" cy="32" r="4" fill="#f59e42"/></svg>
        {/* Flask SVG */}
        <svg className="absolute bottom-10 right-1/6 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="28" y="16" width="8" height="24" rx="2" stroke="#047857" strokeWidth="2"/><ellipse cx="32" cy="48" rx="12" ry="6" stroke="#3730a3" strokeWidth="2"/></svg>
        {/* Paper SVG */}
        <svg className="absolute top-1/5 left-1/6 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="16" y="16" width="32" height="32" rx="4" stroke="#5b21b6" strokeWidth="2"/><path d="M32 16v32" stroke="#3730a3" strokeWidth="2"/></svg>
        {/* Abacus SVG */}
        <svg className="absolute bottom-1/5 left-1/5 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="16" y="16" width="32" height="32" rx="4" stroke="#ea580c" strokeWidth="2"/><circle cx="24" cy="24" r="2" fill="#ef4444"/><circle cx="32" cy="24" r="2" fill="#22c55e"/><circle cx="40" cy="24" r="2" fill="#3730a3"/></svg>
        {/* Compass SVG */}
        <svg className="absolute top-1/6 right-1/6 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" stroke="#3730a3" strokeWidth="2"/><path d="M32 8v48M8 32h48" stroke="#5b21b6" strokeWidth="2"/></svg>
        {/* Pen SVG */}
        <svg className="absolute top-1/3 right-1/5 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><rect x="20" y="10" width="24" height="8" rx="2" stroke="#ea580c" strokeWidth="2"/><rect x="24" y="18" width="16" height="28" rx="2" stroke="#5b21b6" strokeWidth="2"/><rect x="28" y="46" width="8" height="8" rx="2" stroke="#3730a3" strokeWidth="2"/></svg>
        {/* Open Book SVG */}
        <svg className="absolute top-1/4 right-1/6 w-10 h-10 opacity-50 drop-shadow" viewBox="0 0 64 64" fill="none"><path d="M8 16c8 0 16 4 24 4s16-4 24-4v32c-8 0-16 4-24 4s-16-4-24-4V16z" stroke="#6366f1" strokeWidth="2"/><path d="M32 20v32" stroke="#7c3aed" strokeWidth="2"/></svg>
        {/* Blackboard SVG */}
        <svg className="absolute bottom-1/3 left-1/6 w-10 h-8 opacity-50 drop-shadow" viewBox="0 0 64 48" fill="none"><rect x="8" y="8" width="48" height="32" rx="4" stroke="#3730a3" strokeWidth="2" fill="#f3f4f6"/><rect x="16" y="16" width="32" height="16" rx="2" stroke="#5b21b6" strokeWidth="2"/></svg>
        {/* Math Formula: E=mc² */}
        <svg className="absolute top-1/2 right-1/3 w-16 h-6 opacity-50 drop-shadow" viewBox="0 0 120 24" fill="none"><text x="0" y="18" fontFamily="monospace" fontSize="20" fill="#ea580c">E=mc<tspan baseline-shift="super" fontSize="12">2</tspan></text></svg>
        {/* Math Symbol: π */}
        <svg className="absolute bottom-1/3 right-1/6 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 32 32" fill="none"><text x="0" y="24" fontFamily="monospace" fontSize="32" fill="#5b21b6">π</text></svg>
        {/* Math Symbol: ∑ */}
        <svg className="absolute top-1/5 left-1/3 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 32 32" fill="none"><text x="0" y="24" fontFamily="monospace" fontSize="32" fill="#3730a3">∑</text></svg>
        {/* Math Symbol: √ */}
        <svg className="absolute bottom-1/4 right-1/4 w-8 h-8 opacity-50 drop-shadow" viewBox="0 0 32 32" fill="none"><text x="0" y="24" fontFamily="monospace" fontSize="32" fill="#10b981">√</text></svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Education</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded" />
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InternshipSection() {
  const accent = 'blue-500';
  return (
    <section 
      id="internships" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/Internship/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll' // Changed from 'fixed' for better mobile performance
      }}
    >
      {/* Zoom overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transform: 'scale3d(1.05, 1.05, 1)',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Internships</h2>
        
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="space-y-8">
            {internships.map((intern, idx) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring', delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline dot for mobile */}
                <div className="absolute left-4 top-6 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-lg z-10" />
                
                <div className="ml-12 relative w-full rounded-2xl shadow-xl bg-white p-0 flex flex-col">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 rounded-t-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-2 gap-2">
                    <div className="flex items-center gap-3">
                      {intern.image && (
                        <img 
                          src={intern.image} 
                          alt={intern.title} 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200 flex-shrink-0" 
                        />
                      )}
                      <span className="font-bold text-base sm:text-lg text-blue-900 drop-shadow-sm break-words">{intern.title}</span>
                    </div>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow self-start sm:self-auto">{intern.period}</span>
                  </div>
                  
                  {/* Body */}
                  <div className="px-4 sm:px-6 py-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      {/* Company icon */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      <span className="font-medium break-words">{intern.company}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0">&middot; {intern.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic break-words">{intern.location}</div>
                    {intern.skills && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {intern.skills.map((skill, i) => (
                          <span key={skill} className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow break-words">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="px-4 sm:px-6 pb-4 flex items-center justify-between">
                    {intern.link ? (
                      <a 
                        href={intern.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="card__btn w-full text-center font-semibold border-none cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition"
                      >
                        View
                      </a>
                    ) : <div />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative w-full max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded" />
          {internships.map((intern, idx) => {
            const position = idx % 2 === 0 ? 'left' : 'right';
            return (
              <div key={intern.id} className="flex w-full mb-16">
                {/* Left card */}
                <div className="flex-1 flex justify-end pr-4">
                  {position === 'left' && (
                    <div className="relative w-full max-w-md flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        className="relative w-full rounded-2xl shadow-xl bg-white p-0 flex flex-col"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-blue-50 rounded-t-2xl px-6 pt-6 pb-2">
                          <div className="flex items-center gap-3">
                            {intern.image && (
                              <img src={intern.image} alt={intern.title} className="w-12 h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200" />
                            )}
                            <span className="font-bold text-lg text-blue-900 drop-shadow-sm">{intern.title}</span>
                          </div>
                          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow ml-2 whitespace-nowrap">{intern.period}</span>
                        </div>
                        {/* Body */}
                        <div className="px-6 py-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            {/* Company icon */}
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                            <span className="font-medium">{intern.company}</span>
                            <span className="text-xs text-gray-400">&middot; {intern.type}</span>
                          </div>
                          <div className="text-xs text-gray-500 italic">{intern.location}</div>
                          {intern.skills && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {intern.skills.map((skill, i) => (
                                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow">{skill}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Footer */}
                        <div className="px-6 pb-4 flex items-center justify-between">
                          {intern.link ? (
                            <a href={intern.link} target="_blank" rel="noopener noreferrer" className="card__btn w-full md:w-auto text-center font-semibold border-none cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition">View</a>
                          ) : <div />}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
                {/* Center line and dot */}
                <div className="flex flex-col items-center justify-start relative">
                  <span className={`w-4 h-4 rounded-full bg-${accent} border-4 border-white shadow-lg z-10`} />
                  <span className={`w-1 flex-1 bg-${accent}/30`} style={{ minHeight: 60 }} />
                </div>
                {/* Right card */}
                <div className="flex-1 flex justify-start pl-4">
                  {position === 'right' && (
                    <div className="relative w-full max-w-md flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        className="relative w-full rounded-2xl shadow-xl bg-white p-0 flex flex-col"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-blue-50 rounded-t-2xl px-6 pt-6 pb-2">
                          <div className="flex items-center gap-3">
                            {intern.image && (
                              <img src={intern.image} alt={intern.title} className="w-12 h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200" />
                            )}
                            <span className="font-bold text-lg text-blue-900 drop-shadow-sm">{intern.title}</span>
                          </div>
                          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow ml-2 whitespace-nowrap">{intern.period}</span>
                        </div>
                        {/* Body */}
                        <div className="px-6 py-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            {/* Company icon */}
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                            <span className="font-medium">{intern.company}</span>
                            <span className="text-xs text-gray-400">&middot; {intern.type}</span>
                          </div>
                          <div className="text-xs text-gray-500 italic">{intern.location}</div>
                          {intern.skills && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {intern.skills.map((skill, i) => (
                                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow">{skill}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Footer */}
                        <div className="px-6 pb-4 flex items-center justify-between">
                          {intern.link ? (
                            <a href={intern.link} target="_blank" rel="noopener noreferrer" className="card__btn w-full md:w-auto text-center font-semibold border-none cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition">View</a>
                          ) : <div />}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CertificationSection() {
  // Keyframes for accent animation
  const accentOne = {
    animation: 'cert-accent-one 5s infinite',
  };
  const accentTwo = {
    animation: 'cert-accent-two 5s infinite',
  };
  return (
    <section id="certifications" className="py-20 bg-transparent relative">
      <style>{`
        @keyframes cert-accent-one {
          0% { top: 30px; left: 20px; }
          20% { top: 50px; left: 40px; }
          40% { top: 80px; left: 70px; }
          50% { top: 60px; left: 40px; }
          60% { top: 35px; left: 90px; }
          80% { top: 70px; left: 70px; }
          100% { top: 30px; left: 20px; }
        }
        @keyframes cert-accent-two {
          0% { top: 90px; left: 90px; }
          20% { top: 50px; left: 40px; }
          40% { top: 60px; left: 20px; }
          50% { top: 80px; left: 30px; }
          60% { top: 35px; left: 90px; }
          80% { top: 70px; left: 60px; }
          100% { top: 90px; left: 90px; }
        }
      `}</style>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Certifications</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map((cert, idx) => (
            <div key={cert.id} className="relative w-[285px] h-[381px] flex items-center justify-center">
              {/* Animated accent circles */}
              <div className="absolute w-[90px] h-[90px] bg-purple-700 rounded-full filter blur-md opacity-80 z-0" style={{ ...accentOne }} />
              <div className="absolute w-[90px] h-[90px] bg-emerald-400 rounded-full filter blur-md opacity-80 z-0" style={{ ...accentTwo }} />
              {/* Glass card */}
              <div className="relative z-10 w-[285px] h-[381px] rounded-2xl bg-white/55 backdrop-blur-lg border border-white/30 shadow-xl flex flex-col items-center justify-between p-10" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-orange-200 to-amber-300 shadow mb-4">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-yellow-700"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.91L12 2z" fill="currentColor"/></svg>
                </div>
                {/* Title */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <span className="block text-center text-xl font-semibold text-gray-900 mb-4 break-words">{cert.title}</span>
                </div>
                {/* Date */}
                <span className="block text-center italic text-lg text-gray-700/80 font-semibold mt-4">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
