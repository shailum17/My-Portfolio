import { motion } from 'framer-motion';
import { skills } from '../../data/skillsData';

const skillLogoMap: Record<string, string> = {
  // Programming Languages
  'Python': 'https://api.iconify.design/logos:python.svg',
  'JavaScript': 'https://api.iconify.design/logos:javascript.svg',
  'TypeScript': 'https://api.iconify.design/logos:typescript-icon.svg',
  'Java': 'https://api.iconify.design/logos:java.svg',
  'C++': 'https://api.iconify.design/logos:c-plusplus.svg',
  'C': 'https://api.iconify.design/logos:c.svg',
  
  // Web Technologies
  'React': 'https://api.iconify.design/logos:react.svg',
  'Next.js': 'https://api.iconify.design/logos:nextjs-icon.svg',
  'Node.js': 'https://api.iconify.design/logos:nodejs-icon.svg',
  'Express': 'https://api.iconify.design/logos:express.svg',
  'HTML5': 'https://api.iconify.design/logos:html-5.svg',
  'CSS3': 'https://api.iconify.design/logos:css-3.svg',
  'Tailwind CSS': 'https://api.iconify.design/logos:tailwindcss-icon.svg',
  'Bootstrap': 'https://api.iconify.design/logos:bootstrap.svg',
  'GraphQL': 'https://api.iconify.design/logos:graphql.svg',
  
  // Security Tools
  'Kali Linux': 'https://www.svgrepo.com/show/330767/kalilinux.svg',
  'Metasploit': 'https://img.icons8.com/color/96/metasploit.png',
  'Wireshark': 'https://img.icons8.com/color/96/wireshark.png',
  'Nmap': 'https://img.icons8.com/?size=100&id=9b5wowKIlo9d&format=png&color=000000',
  'Burp Suite': 'https://img.icons8.com/color/96/burp-suite.png',
  'OWASP ZAP': 'https://img.icons8.com/color/96/owasp.png',
  'Nessus': 'https://img.icons8.com/color/96/nessus.png',
  
  // Databases
  'MySQL': 'https://api.iconify.design/logos:mysql.svg',
  'PostgreSQL': 'https://api.iconify.design/logos:postgresql.svg',
  'MongoDB': 'https://api.iconify.design/logos:mongodb-icon.svg',
  'Redis': 'https://api.iconify.design/logos:redis.svg',
  'Firebase': 'https://api.iconify.design/logos:firebase.svg',
  
  // Design Tools
  'Figma': 'https://api.iconify.design/logos:figma.svg',
  'Adobe Creative Suite': 'https://api.iconify.design/logos:adobe.svg',
  'Canva': 'https://img.icons8.com/color/96/canva.png',
  'Sketch': 'https://api.iconify.design/logos:sketch.svg',
  'Framer': 'https://api.iconify.design/logos:framer.svg',
  
  // Development Tools
  'Git': 'https://api.iconify.design/logos:git-icon.svg',
  'GitHub': 'https://api.iconify.design/logos:github-icon.svg',
  'VS Code': 'https://api.iconify.design/logos:visual-studio-code.svg',
  'Docker': 'https://api.iconify.design/logos:docker-icon.svg',
  'AWS': 'https://api.iconify.design/logos:aws.svg',
  'Vercel': 'https://api.iconify.design/logos:vercel-icon.svg',
  'Postman': 'https://api.iconify.design/logos:postman-icon.svg',
  
  // Operating Systems
  'Linux': 'https://api.iconify.design/logos:linux-tux.svg',
  'Windows': 'https://api.iconify.design/logos:microsoft-windows.svg',
  'macOS': 'https://api.iconify.design/logos:apple.svg',
  'Ubuntu': 'https://api.iconify.design/logos:ubuntu.svg',
};

// Function to get custom icons for skills without external logos
const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, string> = {
    // Cybersecurity
    'Network Security': '🛡️',
    'Ethical Hacking': '⚔️',
    'Penetration Testing': '🎯',
    'Vulnerability Assessment': '🔍',
    'Cryptography': '🔐',
    'Incident Response': '🚨',
    'Risk Assessment': '⚠️',
    'Compliance': '✅',
    
    // Web Technologies
    'REST APIs': '🔗',
    'Responsive Design': '📱',
    
    // Soft Skills
    'Leadership': '👑',
    'Problem Solving': '🧩',
    'Team Collaboration': '👥',
    'Communication': '💬',
    'Project Management': '📊',
    'Critical Thinking': '🧠',
    'Adaptability': '🔄',
    'Time Management': '⏰',
  };
  
  return iconMap[skillName] || '🔧';
};

export default function SkillsSection() {
  // Split skills into three rows
  const skillsPerRow = Math.ceil(skills.length / 3);
  const firstRowSkills = skills.slice(0, skillsPerRow);
  const secondRowSkills = skills.slice(skillsPerRow, skillsPerRow * 2);
  const thirdRowSkills = skills.slice(skillsPerRow * 2);

  // Duplicate skills for seamless loop
  const firstRowDuplicated = [...firstRowSkills, ...firstRowSkills];
  const secondRowDuplicated = [...secondRowSkills, ...secondRowSkills];
  const thirdRowDuplicated = [...thirdRowSkills, ...thirdRowSkills];

  return (
    <section className="relative bg-white overflow-hidden" id="skills">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
          </motion.div>
          
          {/* Marquee Container - Three Rows */}
          <div className="space-y-6">
            {/* First Row - Moving Left */}
            <div className="marquee-container">
              <div className="marquee-content marquee-left">
                {firstRowDuplicated.map((skill, index) => (
                  <div
                    key={`row1-${skill.name}-${index}`}
                    className="marquee-item"
                    title={skill.name}
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-50 backdrop-blur-sm rounded-lg p-2 border border-gray-200 hover:bg-gray-100 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
                      {skillLogoMap[skill.name] ? (
                        <img
                          src={skillLogoMap[skill.name]}
                          alt={skill.name}
                          className="w-12 h-12 object-contain"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center text-3xl">
                          {getSkillIcon(skill.name)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Moving Right */}
            <div className="marquee-container">
              <div className="marquee-content marquee-right">
                {secondRowDuplicated.map((skill, index) => (
                  <div
                    key={`row2-${skill.name}-${index}`}
                    className="marquee-item"
                    title={skill.name}
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-50 backdrop-blur-sm rounded-lg p-2 border border-gray-200 hover:bg-gray-100 hover:shadow-lg hover:border-purple-300 transition-all duration-300">
                      {skillLogoMap[skill.name] ? (
                        <img
                          src={skillLogoMap[skill.name]}
                          alt={skill.name}
                          className="w-12 h-12 object-contain"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center text-3xl">
                          {getSkillIcon(skill.name)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third Row - Moving Left */}
            <div className="marquee-container">
              <div className="marquee-content marquee-left">
                {thirdRowDuplicated.map((skill, index) => (
                  <div
                    key={`row3-${skill.name}-${index}`}
                    className="marquee-item"
                    title={skill.name}
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-50 backdrop-blur-sm rounded-lg p-2 border border-gray-200 hover:bg-gray-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                      {skillLogoMap[skill.name] ? (
                        <img
                          src={skillLogoMap[skill.name]}
                          alt={skill.name}
                          className="w-12 h-12 object-contain"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center text-3xl">
                          {getSkillIcon(skill.name)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}