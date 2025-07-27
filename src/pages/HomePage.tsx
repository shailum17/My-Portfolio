import { lazy, Suspense } from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutMeSection from '../components/sections/AboutMeSection';
import SectionTransition, { StaggeredItem } from '../components/ui/SectionTransition';

// Lazy load sections that are below the fold
const SkillsSection = lazy(() => import('../components/sections/SkillsSection'));
const PublicationsSection = lazy(() => import('../components/sections/PublicationsSection'));
const InternshipSection = lazy(() => import('../components/sections/ExperienceSection').then(module => ({ default: module.InternshipSection })));
const CertificationSection = lazy(() => import('../components/sections/ExperienceSection').then(module => ({ default: module.CertificationSection })));
const ProjectsSection = lazy(() => import('../components/sections/ProjectsSection'));
const ExperienceSection = lazy(() => import('../components/sections/ExperienceSection').then(module => ({ default: module.default })));
const ContactSection = lazy(() => import('../components/sections/ContactSection'));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <SectionTransition>
    <div className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </SectionTransition>
);

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* Above the fold - load immediately */}
      <StaggeredItem>
        <HeroSection />
      </StaggeredItem>
      
      <StaggeredItem delay={0.2}>
        <AboutMeSection />
      </StaggeredItem>
      
      {/* Below the fold - lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={0.4}>
          <SkillsSection />
        </StaggeredItem>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={0.6}>
          <ExperienceSection />
        </StaggeredItem>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={0.8}>
          <InternshipSection />
        </StaggeredItem>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={1.0}>
          <ProjectsSection />
        </StaggeredItem>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={1.2}>
          <PublicationsSection />
        </StaggeredItem>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={1.4}>
          <CertificationSection />
        </StaggeredItem>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StaggeredItem delay={1.6}>
          <ContactSection />
        </StaggeredItem>
      </Suspense>
    </main>
  );
} 