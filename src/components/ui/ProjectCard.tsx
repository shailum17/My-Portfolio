import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LikeButton from "./LikeButton";
import { Project } from "../../data/projectsData";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <div
      ref={cardRef}
      className="backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl shadow-xl p-0 overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/50 flex flex-col relative mb-10 pb-12"
      style={{ border: '1.5px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
    >
      {/* Image */}
      {project.image && (
        <div className="w-full h-48 bg-gray-100/40 overflow-hidden flex items-center justify-center">
          {!imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className={`object-cover w-full h-full transition-all duration-300 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } group-hover:scale-105`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ filter: 'brightness(0.95) saturate(1.1)' }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image not available</span>
            </div>
          )}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
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
      <div className="px-6 pb-4 flex-grow">
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 pb-4 mt-auto">
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
