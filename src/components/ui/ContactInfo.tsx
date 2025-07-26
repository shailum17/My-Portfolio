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

// Predefined contact details data
export const defaultContactDetails: ContactDetail[] = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Gwalior, Madhya Pradesh, India'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'shailendramourya17@gmail.com',
    href: 'mailto:shailendramourya17@gmail.com'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 62600 42814',
    href: 'tel:+916260042814'
  }
]; 