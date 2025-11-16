# Implementation Plan

- [x] 1. Update security-vulnerable dependencies







  - Update package.json with secure versions of nodemailer (^7.0.10), @vercel/node (2.3.0), and vite (^7.2.2)
  - Run npm install to update package-lock.json
  - Verify zero vulnerabilities with npm audit
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Fix ESLint configuration for JSX files





  - Update eslint.config.js to add JSX parsing support for .jsx files
  - Add React plugin configuration for .jsx files
  - Configure proper globals and rules for JSX files
  - Verify ParticleRing.jsx parses without errors
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 3. Remove unused code from API endpoints





  - [x] 3.1 Fix api/contact-resend.js unused variables


    - Remove or use ownerEmail variable (line 66)
    - Remove or use confirmationEmail variable (line 90)
    - Prefix unused error parameter with underscore (line 123)
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.2 Fix api/contact-simple.js unused code


    - Remove unused phone destructuring (line 35) or use it
    - Prefix unused error parameter with underscore (line 61)
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.3 Fix api/contact.js error handling


    - Prefix unused error parameter with underscore (line 162)
    - _Requirements: 2.3, 5.4_

- [ ] 4. Fix React component code quality issues





  - [x] 4.1 Fix AboutMeSection.tsx apostrophes


    - Replace unescaped apostrophes with &apos; or proper escaping (lines 155, 161, 167, 173)
    - _Requirements: 3.1_
  
  - [x] 4.2 Fix ExperienceSection.tsx issues



    - Remove unused Award import (line 3)
    - Fix SVG baseline-shift to baselineShift (lines 31, 202)
    - Prefix unused loop variables with underscore (lines 88, 282, 368, 433, 486)
    - Add missing dependencies to useMemo hooks or add eslint-disable with justification (lines 83, 278)
    - _Requirements: 2.2, 3.2, 2.3, 3.4_
  
  - [x] 4.3 Fix other React component issues



    - Remove unused imports from App.tsx (lazy, Suspense, LazyLoader)
    - Remove unused scrollToSection function from Header.tsx (line 104)
    - Remove unused expanded state from PublicationsSection.tsx (line 63)
    - Fix ErrorBoundary.tsx apostrophe (line 36)
    - Remove unused imports from OptimizedImage.tsx (useRef)
    - Remove unused speed parameter from ParallaxSection.tsx (line 9)
    - Remove unused imports and variables from ProjectCard.tsx (Wrench, techIconMap)
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 3.1_
- [ ] 5. Separate constants from component exports for Fast Refresh



- [ ] 5. Separate constants from component exports for Fast Refresh

  - [x] 5.1 Create constants files


    - Create src/components/ui/constants/contactInfo.ts for ContactInfo constants
    - Create src/components/ui/constants/navigation.ts for Navigation constants
    - Create src/components/ui/constants/socialLinks.ts for SocialLinks constants
    - _Requirements: 3.5_
  
  - [x] 5.2 Update component imports


    - Update ContactInfo.tsx to import from constants file
    - Update Navigation.tsx to import from constants file
    - Update SocialLinks.tsx to import from constants file
    - _Requirements: 3.5_

- [x] 6. Create TypeScript type definitions


  - [x] 6.1 Create SVG types


    - Create src/types/svg.ts with SVGProps interface
    - Export proper types for SVG component props
    - _Requirements: 4.3_
  
  - [x] 6.2 Create analytics types


    - Create src/types/analytics.ts with AnalyticsDetails interface
    - Define proper types for analytics event properties
    - _Requirements: 4.4_
  
  - [x] 6.3 Create logger types


    - Create src/types/logger.ts with LogLevel and LogData types
    - Define proper types for log parameters
    - _Requirements: 4.4_
  
  - [x] 6.4 Create performance types


    - Create src/types/performance.ts with PerformanceMetric and PerformanceEntry interfaces
    - Define proper types for performance monitoring
    - _Requirements: 4.4_

- [x] 7. Replace any types with proper TypeScript types

  - [x] 7.1 Fix ContactSection.tsx types


    - Replace any type on line 99 with proper type
    - _Requirements: 4.1, 4.2, 4.4_
  
  - [x] 7.2 Fix ExperienceSection.tsx types


    - Replace all any types in SVG props with SVGProps type
    - Update lines 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51
    - Update lines 238, 240, 242, 244, 246
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 7.3 Fix analytics.ts types


    - Replace any type on line 49 with AnalyticsDetails type
    - _Requirements: 4.1, 4.2, 4.4_
  
  - [x] 7.4 Fix logger.ts types


    - Replace any types on lines 4, 10, 17 with proper types
    - Use LogData type for log parameters
    - _Requirements: 4.1, 4.2, 4.4_
  
  - [x] 7.5 Fix performance.ts types


    - Replace any types on lines 66, 146, 154, 161, 171, 195
    - Use PerformanceMetric and PerformanceEntry types
    - _Requirements: 4.1, 4.2, 4.4_

- [x] 8. Improve error handling in API endpoints

  - [x] 8.1 Enhance error logging


    - Add contextual error logging in all API catch blocks
    - Use consistent error logging pattern across all endpoints
    - _Requirements: 5.1, 5.4_
  
  - [x] 8.2 Improve error responses


    - Ensure all API endpoints return appropriate HTTP status codes
    - Add user-friendly error messages
    - Include error details only in development mode
    - _Requirements: 5.2, 5.3_
  
  - [x] 8.3 Add input validation


    - Verify all user inputs are validated in API endpoints
    - Add sanitization for contact form inputs
    - _Requirements: 5.5_

- [x] 9. Fix service worker code quality




  - Remove or use CACHE_NAME variable (line 1)
  - Remove or use EXTERNAL_RESOURCES variable (line 18)
  - Prefix unused error parameters with underscore (lines 56, 127, 142, 169)
  - _Requirements: 2.1, 2.3_

- [x] 10. Fix build configuration issues





  - Remove unused ext variable from vite.config.ts (line 52)
  - Simplify assetFileNames function to not create unused variables
  - _Requirements: 2.1_

- [x] 11. Fix backend server issues





  - Fix unnecessary escape character in regex (line 70)
  - Remove or prefix unused next parameter (line 185)
  - _Requirements: 2.3_

- [x] 12. Run automated fixes and verification





  - [x] 12.1 Run ESLint auto-fix


    - Execute npm run lint:fix to auto-fix remaining issues
    - Review and commit auto-fixes
    - _Requirements: 7.2_
  
  - [x] 12.2 Verify security fixes


    - Run npm audit to confirm zero vulnerabilities
    - _Requirements: 7.1_
  
  - [x] 12.3 Verify code quality


    - Run npm run lint to confirm zero errors
    - Run TypeScript compiler to verify no type errors
    - _Requirements: 7.2_
  
  - [x] 12.4 Verify build succeeds



    - Run npm run build to ensure successful production build
    - Check for any build warnings or errors
    - _Requirements: 7.3_
  
  - [ ]* 12.5 Manual functional testing
    - Test contact form submission with all API endpoints
    - Verify navigation and scrolling functionality
    - Test 3D particle ring rendering
    - Verify image loading and optimization
    - Test mobile responsiveness
    - Confirm Fast Refresh works in development
    - _Requirements: 7.4_
  
  - [ ]* 12.6 Document changes
    - Create summary of all fixes applied
    - Document any breaking changes (if any)
    - Update relevant documentation
    - _Requirements: 7.5_
