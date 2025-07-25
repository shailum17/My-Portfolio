import { useEffect, useRef } from "react";
import { skills } from '../../data/skillsData';
import { Wrench } from "lucide-react";
import gsap from "gsap";
import { motion } from 'framer-motion';

const skillLogoMap: Record<string, string> = {
  'C': 'https://api.iconify.design/logos:c.svg',
  'C++': 'https://api.iconify.design/logos:c.svg',
  'Python': 'https://api.iconify.design/logos:python.svg',
  'Java': 'https://api.iconify.design/logos:java.svg',
  'JavaScript': 'https://api.iconify.design/logos:javascript.svg',
  'HTML5': 'https://api.iconify.design/logos:html-5.svg',
  'CSS3': 'https://api.iconify.design/logos:css-3.svg',
  'Bootstrap': 'https://api.iconify.design/logos:bootstrap.svg',
  'React': 'https://api.iconify.design/logos:react.svg',
  'Node.js': 'https://api.iconify.design/logos:nodejs-icon.svg',
  'Express': 'https://api.iconify.design/logos:express.svg',
  'JSP': 'https://api.iconify.design/logos:java.svg',
  'Servlets': 'https://api.iconify.design/logos:java.svg',
  'MySQL': 'https://api.iconify.design/logos:mysql.svg',
  'MongoDB': 'https://api.iconify.design/logos:mongodb-icon.svg',
  'Git': 'https://api.iconify.design/logos:git-icon.svg',
  'GitHub': 'https://api.iconify.design/logos:github-icon.svg',
  'VS Code': 'https://api.iconify.design/logos:visual-studio-code.svg',
  'Eclipse': 'https://api.iconify.design/logos:eclipse.svg',
  'Wireshark': 'https://www.svgrepo.com/show/377840/wireshark.svg',
  'Nmap': 'https://img.icons8.com/?size=100&id=9b5wowKIlo9d&format=png&color=000000',
  'Kali Linux': 'https://www.svgrepo.com/show/330767/kalilinux.svg',
  'Vercel': 'https://api.iconify.design/logos:vercel-icon.svg',
  'Windows': 'https://api.iconify.design/logos:microsoft-windows.svg',
  'Linux': 'https://api.iconify.design/logos:linux-tux.svg',
};

export default function SkillsSection() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const floatAnims = useRef<gsap.core.Tween[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); // child icon
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]); // parent wrapper

  useEffect(() => {
    // Floating animation on icon (child)
    floatAnims.current = iconRefs.current.map((icon, i) => {
      if (!icon) return null;
      const x = Math.random() * 80 - 40;
      const y = Math.random() * 80 - 40;
      gsap.set(icon, { x, y });
      return gsap.to(icon, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        repeat: -1,
        yoyo: true,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
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
          // Repel effect
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * (maxDist - dist);
          const ty = Math.sin(angle) * (maxDist - dist);
          gsap.to(wrapper, {
            x: tx,
            y: ty,
            scale: 1.15,
            duration: 0.3,
            overwrite: true,
          });
        } else {
          // Return to original position
          gsap.to(wrapper, { x: 0, y: 0, scale: 1, duration: 0.5, overwrite: true });
        }
      });
    };

    const handleLeave = () => {
      wrapperRefs.current.forEach((wrapper) => {
        if (!wrapper) return;
        gsap.to(wrapper, { x: 0, y: 0, scale: 1, duration: 0.5, overwrite: true });
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
    <section className="py-20 bg-light relative overflow-hidden" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-dark">
          Skills
        </h2>
        <div
          ref={cloudRef}
          className="relative min-h-[320px] h-[40vw] max-h-[500px] w-full"
          style={{ minHeight: 320 }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="gsap-skill-logo-wrapper absolute"
              style={{
                left: `${10 + (i % 10) * 8}%`,
                top: `${10 + Math.floor(i / 10) * 25}%`,
                zIndex: 2,
                pointerEvents: "auto",
              }}
              ref={el => { wrapperRefs.current[i] = el; }}
              title={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * i, type: 'spring' }}
            >
              <motion.div
                className="gsap-skill-logo flex flex-col items-center transition-transform"
                ref={el => { iconRefs.current[i] = el; }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i, type: 'spring' }}
              >
                {skillLogoMap[skill.name] ? (
                  <img
                    src={skillLogoMap[skill.name]}
                    alt={skill.name}
                    className="w-12 h-12 object-contain drop-shadow-lg"
                    draggable={false}
                  />
                ) : (
                  <Wrench className="w-10 h-10 text-primary/60" />
                )}
                <motion.span
                  className="text-xs font-semibold text-gray-700 mt-1 bg-white/80 px-2 py-0.5 rounded-full shadow"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 * i, type: 'spring' }}
                >
                  {skill.name}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
