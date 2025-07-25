import { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import ProjectCard from '../ui/ProjectCard';

const categories = ['all', 'web', 'blockchain', 'ai', 'design'];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const filteredProjects = projectsData.filter(project =>
    filter === 'all' || project.categories.includes(filter)
  );

  return (
    <section
      id="projects"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('https://cdn.dribbble.com/userupload/11944566/file/original-9ce5e473f45879252c45e52fe613a4d7.jpg?resize=1504x1003&vertical=center')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F9FAFB', // fallback
        minHeight: '100vh',
        backgroundAttachment: 'fixed',
      }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }}
    >
      {/* Optional: Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 -z-10 pointer-events-none select-none" />
      {/* Interactive Floating Elements */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none select-none">
        <div
          className="absolute rounded-full bg-primary/40 blur-2xl opacity-70"
          style={{
            width: 180,
            height: 180,
            left: `calc(10% + ${mouse.x * 40}px)`,
            top: `calc(15% + ${mouse.y * 30}px)`,
            transition: 'left 0.3s cubic-bezier(.4,2,.6,1), top 0.3s cubic-bezier(.4,2,.6,1)',
          }}
        />
        <div
          className="absolute rounded-full bg-pink-400/30 blur-2xl opacity-60"
          style={{
            width: 120,
            height: 120,
            right: `calc(12% + ${(1 - mouse.x) * 60}px)`,
            bottom: `calc(18% + ${(1 - mouse.y) * 40}px)`,
            transition: 'right 0.3s cubic-bezier(.4,2,.6,1), bottom 0.3s cubic-bezier(.4,2,.6,1)',
          }}
        />
        <div
          className="absolute rounded-full bg-cyan-300/30 blur-2xl opacity-50"
          style={{
            width: 90,
            height: 90,
            left: `calc(60% + ${mouse.x * 30}px)`,
            bottom: `calc(10% + ${(1 - mouse.y) * 50}px)`,
            transition: 'left 0.3s cubic-bezier(.4,2,.6,1), bottom 0.3s cubic-bezier(.4,2,.6,1)',
          }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark drop-shadow-lg">Featured Projects</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full capitalize font-semibold transition-colors duration-200 border-2 ${
                filter === category
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
