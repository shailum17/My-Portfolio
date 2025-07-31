import { track } from '@vercel/analytics';

// Custom analytics events for portfolio tracking
export const analytics = {
  // Track section views
  trackSectionView: (sectionName: string) => {
    track('section_view', { section: sectionName });
  },

  // Track project clicks
  trackProjectClick: (projectName: string, projectUrl?: string) => {
    track('project_click', { 
      project: projectName, 
      url: projectUrl 
    });
  },

  // Track resume download
  trackResumeDownload: () => {
    track('resume_download');
  },

  // Track contact form submission
  trackContactSubmit: (formType: 'email' | 'linkedin' | 'github') => {
    track('contact_submit', { type: formType });
  },

  // Track skill filter usage
  trackSkillFilter: (category: string) => {
    track('skill_filter', { category });
  },

  // Track publication view
  trackPublicationView: (publicationTitle: string) => {
    track('publication_view', { title: publicationTitle });
  },

  // Track experience section interaction
  trackExperienceInteraction: (type: 'education' | 'internship' | 'certification') => {
    track('experience_interaction', { type });
  },

  // Track page performance
  trackPagePerformance: (metric: string, value: number) => {
    track('page_performance', { metric, value });
  },

  // Track user engagement
  trackEngagement: (action: string, details?: Record<string, any>) => {
    track('user_engagement', { action, ...details });
  },

  // Track scroll depth
  trackScrollDepth: (depth: number) => {
    track('scroll_depth', { depth });
  },

  // Track time on page
  trackTimeOnPage: (seconds: number) => {
    track('time_on_page', { seconds });
  }
};

// Hook for tracking scroll depth
export const useScrollTracking = () => {
  const trackScrollDepth = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    // Track at 25%, 50%, 75%, and 100% scroll points
    if (scrollPercent >= 25 && scrollPercent < 50) {
      analytics.trackScrollDepth(25);
    } else if (scrollPercent >= 50 && scrollPercent < 75) {
      analytics.trackScrollDepth(50);
    } else if (scrollPercent >= 75 && scrollPercent < 100) {
      analytics.trackScrollDepth(75);
    } else if (scrollPercent >= 100) {
      analytics.trackScrollDepth(100);
    }
  };

  return { trackScrollDepth };
};

// Hook for tracking time on page
export const useTimeTracking = () => {
  const trackTimeOnPage = (startTime: number) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    analytics.trackTimeOnPage(timeSpent);
  };

  return { trackTimeOnPage };
};

// Intersection Observer for tracking section views
export const useSectionTracking = () => {
  const trackSectionView = (sectionName: string) => {
    analytics.trackSectionView(sectionName);
  };

  return { trackSectionView };
}; 