import { useState, useEffect } from "react";

const typingPhrases = [
  "Cybersecurity Enthusiast ",
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden font-sans">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/video.mp4"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[60vh] w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 gap-6 sm:gap-8 md:gap-12 lg:gap-20">
        {/* 3D Vector Illustration Left */}
        <div className="flex-shrink-0 flex flex-col items-center mb-6 sm:mb-8 md:mb-0">
          <img
            src="/assets/3d-hero.svg"
            alt="Cybersecurity Enthusiast 3D Illustration"
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
          />
        </div>
        {/* Info Right */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 font-heading drop-shadow-lg font-sans break-words">
            Shailendra Mourya
          </h1>
          <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 max-w-2xl font-medium drop-shadow h-8 sm:h-10 md:h-12 font-sans">
            <span className="text-secondary">{typedSubtitle}</span>
            <span className="animate-pulse">|</span>
          </p>
          <p className="mb-2 text-base sm:text-lg text-gray-200 font-medium font-sans leading-relaxed">
            Passionate about defending digital frontiers and building secure, modern web applications.<br className="hidden sm:block" />
            Experienced in penetration testing, full-stack development, and cloud deployment.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-300">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z" /></svg>
              India
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H9m3 0h3" /></svg>
              <span className="hidden sm:inline">shailendramourya17@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
            <a href="#projects" className="btn-primary text-base sm:text-lg shadow-lg w-full sm:w-auto text-center">View Projects</a>
            <a href="/resume.pdf" className="btn-secondary text-base sm:text-lg shadow-lg w-full sm:w-auto text-center">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}
