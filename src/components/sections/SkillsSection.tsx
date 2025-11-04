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

  return (
    <section className="py-20 bg-white" id="skills">
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
        
        {/* Simple Grid Layout */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05 
              }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              title={skill.name}
            >
              {/* Skill Icon */}
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                {skillLogoMap[skill.name] ? (
                  <img
                    src={skillLogoMap[skill.name]}
                    alt={skill.name}
                    className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
                    draggable={false}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110">
                    {getSkillIcon(skill.name)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}