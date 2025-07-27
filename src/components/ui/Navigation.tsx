import React from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavigationProps {
  items: NavigationItem[];
  variant?: 'header' | 'footer' | 'mobile';
  className?: string;
  itemClassName?: string;
  activeItem?: string;
}

const variantClasses = {
  header: {
    container: 'hidden md:flex space-x-8',
    item: 'hover:text-blue-600 transition-colors duration-200 font-medium'
  },
  footer: {
    container: 'space-y-2',
    item: 'text-gray-300 hover:text-white transition-colors duration-200 text-sm'
  },
  mobile: {
    container: 'px-2 pt-2 pb-3 space-y-1',
    item: 'block w-full text-left px-3 py-2 hover:text-blue-600 hover:bg-gray-50/50 rounded-md transition-colors duration-200 font-medium'
  }
};

export default function Navigation({ 
  items, 
  variant = 'header', 
  className = '',
  itemClassName = '',
  activeItem 
}: NavigationProps) {
  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      const element = document.getElementById(item.href);
      if (element) {
        const headerHeight = 64; // Height of the fixed header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`${variantClasses[variant].container} ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`${variantClasses[variant].item} ${itemClassName} ${
            activeItem === item.id ? 'text-blue-600' : ''
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

// Predefined navigation items
export const defaultNavigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Home', href: 'hero' },
  { id: 'about', label: 'About', href: 'about' },
  { id: 'skills', label: 'Skills', href: 'skills' },
  { id: 'experience', label: 'Education', href: 'experience' },
  { id: 'internships', label: 'Internships', href: 'internships' },
  { id: 'projects', label: 'Projects', href: 'projects' },
  { id: 'publications', label: 'Publications', href: 'publications' },
  { id: 'certifications', label: 'Certifications', href: 'certifications' },
  { id: 'contact', label: 'Contact', href: 'contact' }
];

export const footerNavigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Home', href: 'hero' },
  { id: 'about', label: 'About', href: 'about' },
  { id: 'skills', label: 'Skills', href: 'skills' },
  { id: 'experience', label: 'Education', href: 'experience' },
  { id: 'internships', label: 'Internships', href: 'internships' },
  { id: 'projects', label: 'Projects', href: 'projects' },
  { id: 'publications', label: 'Publications', href: 'publications' },
  { id: 'certifications', label: 'Certifications', href: 'certifications' },
  { id: 'contact', label: 'Contact', href: 'contact' }
]; 