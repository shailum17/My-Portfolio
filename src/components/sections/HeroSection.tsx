import { useState, useEffect } from "react";

const typingPhrases = [
  "Cybersecurity Specialist",
  "Web Developer",
  "Programmer"
];

function useTypingEffect(phrases: string[], speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (display.length < phrases[index].length) {
        timeout = setTimeout(() => {
          setDisplay(phrases[index].slice(0, display.length + 1));
        }, speed);
      } else {
        setTyping(false);
        timeout = setTimeout(() => setTyping(true), pause);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(phrases[index].slice(0, display.length - 1));
        }, speed / 2);
      } else {
        setTyping(true);
        setIndex((index + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, index, phrases, speed, pause]);

  return display;
}

export default function HeroSection() {
  const typedSubtitle = useTypingEffect(typingPhrases);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden font-sans">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/video.mp4"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[60vh] w-full px-4 py-20 gap-10 md:gap-20">
        {/* 3D Vector Illustration Left */}
        <div className="flex-shrink-0 flex flex-col items-center mb-8 md:mb-0">
          <img
            src="/assets/3d-hero.svg"
            alt="Cybersecurity 3D Illustration"
            className="w-64 h-64 md:w-80 md:h-80 object-contain"
          />
        </div>
        {/* Info Right */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-heading drop-shadow-lg font-sans">
            Shailendra Mourya
          </h1>
          <p className="text-2xl md:text-3xl mb-4 max-w-2xl font-medium drop-shadow h-10 md:h-12 font-sans">
            <span className="text-secondary">{typedSubtitle}</span>
            <span className="animate-pulse">|</span>
          </p>
          <p className="mb-2 text-lg text-gray-200 font-medium font-sans">
            Passionate about defending digital frontiers and building secure, modern web applications.<br />
            Experienced in penetration testing, full-stack development, and cloud deployment.
          </p>
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z" /></svg>
              India
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H9m3 0h3" /></svg>
              shailendramourya17@gmail.com
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="#projects" className="btn-primary text-lg shadow-lg">View Projects</a>
            <a href="/resume.pdf" className="btn-secondary text-lg shadow-lg">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}
