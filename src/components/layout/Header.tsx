import { useState, useEffect } from 'react';
import Navigation, { defaultNavigationItems } from '../ui/Navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine which section is currently in view
      const sections = ['hero', 'about', 'skills', 'publications', 'internships', 'certifications', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHeaderStyles = () => {
    // Always start with hero section styling when not scrolled
    if (!isScrolled) {
      return {
        background: 'bg-black/100 backdrop-blur-md',
        textColor: 'text-white',
        mobileBg: 'bg-black/95'
      };
    }

    switch (currentSection) {
      case 'hero':
        return {
          background: 'bg-black/80 backdrop-blur-md',
          textColor: 'text-white',
          mobileBg: 'bg-black/95'
        };
      case 'about':
        return {
          background: 'bg-gray-50/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-gray-50/95'
        };
      case 'skills':
        return {
          background: 'bg-gray-50/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-gray-50/95'
        };
      case 'publications':
        return {
          background: 'bg-gray-50/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-gray-50/95'
        };
      case 'internships':
        return {
          background: 'bg-gray-50/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-gray-50/95'
        };
      case 'certifications':
        return {
          background: 'bg-transparent backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-white/95'
        };
      case 'projects':
        return {
          background: 'bg-white/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-white/95'
        };
      case 'experience':
        return {
          background: 'bg-white/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-white/95'
        };
      case 'contact':
        return {
          background: 'bg-gray-50/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-gray-50/95'
        };
      default:
        return {
          background: 'bg-white/90 backdrop-blur-md',
          textColor: 'text-gray-800',
          mobileBg: 'bg-white/95'
        };
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const styles = getHeaderStyles();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg border-b border-gray-200/20 ${styles.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shailendra
            </h1>
          </div>

          {/* Desktop Navigation */}
          <Navigation 
            items={defaultNavigationItems}
            variant="header"
            itemClassName={styles.textColor}
            activeItem={currentSection}
          />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${styles.textColor} hover:text-blue-600 transition-colors duration-200`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className={`${styles.mobileBg} backdrop-blur-md border-t border-gray-200/20`}>
              <Navigation 
                items={defaultNavigationItems}
                variant="mobile"
                itemClassName={styles.textColor}
                activeItem={currentSection}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 