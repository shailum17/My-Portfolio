import React from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
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
        <div key={item.id} className="relative group">
          <button
            onClick={() => handleItemClick(item)}
            className={`${variantClasses[variant].item} ${itemClassName} ${
              activeItem === item.id ? 'text-blue-600' : ''
            }`}
          >
            {item.icon || item.label}
          </button>
          {/* Tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
            {/* Tooltip arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
          </div>
        </div>
      ))}
    </nav>
  );
}

// Re-export constants from separate file for Fast Refresh compatibility
export { defaultNavigationItems, footerNavigationItems } from './constants/navigation'; 