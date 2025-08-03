import { useEffect, useRef, useMemo } from "react";
import { skills } from '../../data/skillsData';
import { Wrench } from "lucide-react";
import gsap from "gsap";
import { motion } from 'framer-motion';
import LazyLoader from '../ui/LazyLoader';

const skillLogoMap: Record<string, string> = {
  // Programming Languages
  'C': 'https://api.iconify.design/logos:c.svg',
  'C++': 'https://api.iconify.design/logos:c.svg',
  'Python': 'https://api.iconify.design/logos:python.svg',
  'Java': 'https://api.iconify.design/logos:java.svg',
  'JavaScript': 'https://api.iconify.design/logos:javascript.svg',
  
  // Web Technologies
  'HTML5': 'https://api.iconify.design/logos:html-5.svg',
  'CSS3': 'https://api.iconify.design/logos:css-3.svg',
  'Bootstrap': 'https://api.iconify.design/logos:bootstrap.svg',
  'React': 'https://api.iconify.design/logos:react.svg',
  'Node.js': 'https://api.iconify.design/logos:nodejs-icon.svg',
  'Express': 'https://api.iconify.design/logos:express.svg',
  'JSP': 'https://api.iconify.design/logos:java.svg',
  'Servlets': 'https://api.iconify.design/logos:java.svg',
  
  // Security Tools
  'Nmap': 'https://img.icons8.com/?size=100&id=9b5wowKIlo9d&format=png&color=000000',
  'Kali Linux': 'https://www.svgrepo.com/show/330767/kalilinux.svg',
  
  // Databases
  'MySQL': 'https://api.iconify.design/logos:mysql.svg',
  'MongoDB': 'https://api.iconify.design/logos:mongodb-icon.svg',
  
  // Design Tools
  'Canva': 'https://img.icons8.com/color/96/canva.png',
  'Figma': 'https://api.iconify.design/logos:figma.svg',
  'Adobe Photoshop': 'https://img.icons8.com/color/96/adobe-photoshop.png',
  'AI Design Tools': 'https://img.icons8.com/color/96/artificial-intelligence.png',
  
  // Development Tools
  'Git': 'https://api.iconify.design/logos:git-icon.svg',
  'GitHub': 'https://api.iconify.design/logos:github-icon.svg',
  'VS Code': 'https://api.iconify.design/logos:visual-studio-code.svg',
  'Eclipse': 'https://api.iconify.design/logos:eclipse.svg',
  'Vercel': 'https://api.iconify.design/logos:vercel-icon.svg',
  
  // Operating Systems
  'Windows': 'https://api.iconify.design/logos:microsoft-windows.svg',
  'Linux': 'https://api.iconify.design/logos:linux-tux.svg',
};

const categoryConfig = {
  programming: {
    title: "Programming Languages",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  web: {
    title: "Web Development",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  cybersecurity: {
    title: "Cybersecurity",
    icon: "🛡️",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  "security-tools": {
    title: "Security Tools",
    icon: "🔧",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  database: {
    title: "Databases",
    icon: "🗄️",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  design: {
    title: "Design Tools",
    icon: "🎨",
    color: "from-pink-500 to-purple-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  tools: {
    title: "Development Tools",
    icon: "⚙️",
    color: "from-gray-500 to-blue-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200"
  },
  "operating-systems": {
    title: "Operating Systems",
    icon: "🖥️",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  "soft-skills": {
    title: "Soft Skills",
    icon: "🤝",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  }
};

// Function to get custom icons for skills without external logos
const getSkillIcon = (skillName: string, category: string) => {
  const iconMap: Record<string, string> = {
    // Cybersecurity
    'Network Security': '🛡️',
    'Cryptography': '🔐',
    'Ethical Hacking': '⚔️',
    'Firewalls': '🔥',
    'Malware Analysis': '🦠',
    'Social Engineering': '🎭',
    'Risk Management': '⚠️',
    'Access Control': '🔑',
    'Cyber Laws': '⚖️',
    
    // Security Tools
    'Wireshark': '🦈',
    'Burp Suite': '🕷️',
    'OWASP ZAP': '🕸️',
    
    // Soft Skills
    'Hardworking': '💪',
    'Honest': '🤝',
    'Adaptable': '🔄',
    'Punctual': '⏰',
    'Team Collaboration': '👥',
    'Visual Communication': '📢',
    'Creativity': '✨',
    'Branding': '🏷️',
    
    // Web
    'Responsive Design': '📱',
  };
  
  return iconMap[skillName] || '🔧';
};

export default function SkillsSection() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const floatAnims = useRef<gsap.core.Tween[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);
    
    return grouped;
  }, []);

  useEffect(() => {
    // Enhanced floating animation on icon (child) with sticky effect
    floatAnims.current = iconRefs.current.map((icon, i) => {
      if (!icon) return null;
      const x = Math.random() * 60 - 30;
      const y = Math.random() * 60 - 30;
      gsap.set(icon, { x, y });
      
      // Create more pronounced floating effect
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(icon, {
        x: `+=${Math.random() * 80 - 40}`,
        y: `+=${Math.random() * 80 - 40}`,
        rotation: Math.random() * 10 - 5,
        scale: 1 + Math.random() * 0.1,
        duration: 4 + Math.random() * 3,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });
      
      // Add subtle sticky hover effect
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });
      
      return tl;
    }).filter(Boolean) as gsap.core.Tween[];

    // Repel effect on wrapper (parent)
    const handleMove = (e: MouseEvent) => {
      if (!cloudRef.current) return;
      const rect = cloudRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper || !iconRefs.current[i]) return;
        const icon = iconRefs.current[i];
        const iconRect = icon!.getBoundingClientRect();
        const iconX = iconRect.left + iconRect.width / 2 - rect.left;
        const iconY = iconRect.top + iconRect.height / 2 - rect.top;
        const dx = iconX - mouseX;
        const dy = iconY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist < maxDist) {
          // Enhanced sticky repel effect
          const angle = Math.atan2(dy, dx);
          const force = (maxDist - dist) / maxDist;
          const tx = Math.cos(angle) * (maxDist - dist) * 1.2;
          const ty = Math.sin(angle) * (maxDist - dist) * 1.2;
          gsap.to(wrapper, {
            x: tx,
            y: ty,
            scale: 1.2 + force * 0.1,
            rotation: force * 5,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          // Sticky return to original position
          gsap.to(wrapper, { 
            x: 0, 
            y: 0, 
            scale: 1, 
            rotation: 0,
            duration: 0.6, 
            ease: "elastic.out(1, 0.5)",
            overwrite: true 
          });
        }
      });
    };

    const handleLeave = () => {
      wrapperRefs.current.forEach((wrapper) => {
        if (!wrapper) return;
        gsap.to(wrapper, { 
          x: 0, 
          y: 0, 
          scale: 1, 
          rotation: 0,
          duration: 0.6, 
          ease: "elastic.out(1, 0.5)",
          overwrite: true 
        });
      });
    };

    const section = cloudRef.current;
    section?.addEventListener("mousemove", handleMove);
    section?.addEventListener("mouseleave", handleLeave);
    return () => {
      section?.removeEventListener("mousemove", handleMove);
      section?.removeEventListener("mouseleave", handleLeave);
      floatAnims.current.forEach(anim => anim && anim.kill());
    };
  }, []);

  return (
    <section className="py-20 bg-light relative overflow-hidden" id="skills" style={{ 
      '--column-gap': '1.5rem',
      '--row-gap': '1.5rem'
    } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-extrabold mb-12 text-center text-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 max-w-7xl mx-auto" style={{ 
          columnGap: '1.5rem',
          columnFill: 'balance' as any
        }}>
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            
            return (
              <LazyLoader
                key={category}
                delay={categoryIndex * 200}
                fallback={
                  <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-xl" />
                }
              >
                <motion.div
                  className={`p-6 rounded-xl border-2 ${config.bgColor} ${config.borderColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid mb-6 transform hover:scale-105 hover:-translate-y-1`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  style={{ 
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                    marginBottom: '1.5rem'
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center text-2xl mr-4 shadow-lg`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{config.title}</h3>
                      <p className="text-sm text-gray-600">{categorySkills.length} skills</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="gsap-skill-logo-wrapper relative group"
                        ref={el => { 
                          const index = categoryIndex * 100 + skillIndex;
                          wrapperRefs.current[index] = el; 
                        }}
                        title={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05), type: 'spring' }}
                      >
                        <motion.div
                          className="gsap-skill-logo flex flex-col items-center p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105"
                          ref={el => { 
                            const index = categoryIndex * 100 + skillIndex;
                            iconRefs.current[index] = el; 
                          }}
                        >
                          {skillLogoMap[skill.name] ? (
                            <img
                              src={skillLogoMap[skill.name]}
                              alt={skill.name}
                              className="w-8 h-8 object-contain drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300"
                              draggable={false}
                            />
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center">
                              {getSkillIcon(skill.name, category)}
                            </div>
                          )}
                          <span className="text-xs font-medium text-gray-700 mt-2 text-center group-hover:text-gray-900 transition-colors duration-300">
                            {skill.name}
                          </span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </LazyLoader>
            );
          })}
        </div>
      </div>
    </section>
  );
}
