import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'default' | 'minimal' | 'colored';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

const variantClasses = {
  default: 'text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800',
  minimal: 'text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100',
  colored: 'bg-gray-100 hover:scale-110 transition-all duration-300 p-2 rounded-lg text-gray-700 backdrop-blur-sm'
};

export default function SocialLinks({ 
  links, 
  variant = 'default', 
  size = 'md', 
  className = '',
  showLabels = false 
}: SocialLinksProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${variantClasses[variant]} ${link.color || ''}`}
          aria-label={link.name}
        >
          <div className={sizeClasses[size]}>
            {link.icon}
          </div>
          {showLabels && (
            <span className="ml-2 text-sm font-medium">{link.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}

// Re-export constants from separate file for Fast Refresh compatibility
export { defaultSocialLinks, extendedSocialLinks } from './constants/socialLinks'; 