import HeroSection from '../components/sections/HeroSection';
import SkillsSection from '../components/sections/SkillsSection';
import PublicationsSection from '../components/sections/PublicationsSection';
import { InternshipSection, CertificationSection } from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <PublicationsSection />
      <InternshipSection />
      <CertificationSection />
      <ProjectsSection />
      <ExperienceSection />
    </main>
  );
} 