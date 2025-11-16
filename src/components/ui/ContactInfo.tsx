import React from 'react';

export interface ContactDetail {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface ContactInfoProps {
  details: ContactDetail[];
  variant?: 'default' | 'minimal' | 'card';
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
  default: 'space-y-2 text-sm text-gray-300',
  minimal: 'space-y-2 text-sm text-gray-600',
  card: 'space-y-5 mb-8'
};

const itemClasses = {
  default: 'flex items-center space-x-2',
  minimal: 'flex items-center space-x-2',
  card: 'flex items-center space-x-3'
};

const iconClasses = {
  default: 'text-gray-400',
  minimal: 'text-gray-500',
  card: 'text-blue-600'
};

const valueClasses = {
  default: 'hover:text-white transition-colors duration-200',
  minimal: 'hover:text-gray-900 transition-colors duration-200',
  card: 'text-gray-900'
};

export default function ContactInfo({ 
  details, 
  variant = 'default', 
  size = 'md', 
  className = '',
  showLabels = true 
}: ContactInfoProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {details.map((detail, index) => (
        <div key={index} className={itemClasses[variant]}>
          <div className={`${sizeClasses[size]} ${iconClasses[variant]}`}>
            {detail.icon}
          </div>
          {showLabels && (
            <span className="font-medium text-gray-700">{detail.label}:</span>
          )}
          {detail.href ? (
            <a 
              href={detail.href} 
              className={`${valueClasses[variant]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {detail.value}
            </a>
          ) : (
            <span className={valueClasses[variant]}>{detail.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Re-export constants from separate file for Fast Refresh compatibility
export { defaultContactDetails } from './constants/contactInfo'; 