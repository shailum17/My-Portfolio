import HeroSection from '../components/sections/HeroSection';
import AboutMeSection from '../components/sections/AboutMeSection';
import SkillsSection from '../components/sections/SkillsSection';
import PublicationsSection from '../components/sections/PublicationsSection';
import { InternshipSection, CertificationSection } from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="pt-16">
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <PublicationsSection />
      <InternshipSection />
      <CertificationSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
} 