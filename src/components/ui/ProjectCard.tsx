import { useEffect, useRef } from "react";
import gsap from "gsap";
import LikeButton from "./LikeButton";
import { Project } from "../../data/projectsData";
import { Wrench } from "lucide-react";

// Map technology names to icon URLs (add more as needed)
const techIconMap: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Solidity: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  JWT: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jwt/jwt-original.svg",
  Nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Google Maps API": "/favicon.ico",
  "OpenWeather API": "/favicon.ico",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
};

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl shadow-xl p-0 overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/50 flex flex-col relative mb-10 pb-12"
      style={{ border: '1.5px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
    >
      {/* Image */}
      {project.image && (
        <div className="w-full h-48 bg-gray-100/40 overflow-hidden flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            style={{ filter: 'brightness(0.95) saturate(1.1)' }}
          />
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <div>
          <h3 className="text-xl font-bold text-dark mb-1 drop-shadow-sm">{project.title}</h3>
          <span className="text-xs text-gray-700/80 font-medium">{project.period}</span>
        </div>
        <LikeButton />
      </div>
      {/* Body */}
      <div className="px-6 pb-2 flex-1">
        <p className="text-gray-800 mb-3 text-sm drop-shadow-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
          {project.highlights.map((highlight, i) => (
            <span key={i} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold shadow-sm">{highlight}</span>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="px-6 pb-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/30 mt-auto">
        <div className="flex flex-wrap gap-1">
        {project.technologies.map(tech => (
            <span key={tech} className="bg-indigo-100/60 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium shadow-sm">{tech}</span>
        ))}
        </div>
        {/* Remove inline link icons here */}
      </div>
      {/* Bottom Centered Action Icons */}
      <div className="flex flex-row justify-center gap-4 mt-4 mb-2">
        {project.links?.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" title="GitHub"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 shadow hover:bg-gray-100 hover:border-primary transition-colors">
            <svg className="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
          </a>
        )}
        {project.links?.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" title="Live Demo"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-primary shadow hover:bg-primary/10 hover:border-primary transition-colors">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-7-7L21 10z"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}
