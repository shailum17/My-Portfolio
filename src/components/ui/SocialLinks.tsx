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

// Predefined social links data
export const defaultSocialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/shailum17',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shailum17/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Twitter',
    url: 'https://x.com/shailum_17',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    )
  },
  {
    name: 'Email',
    url: 'mailto:shailendramourya17@gmail.com',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

// Extended social links with colors for Contact section
export const extendedSocialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/shailum17',
    color: 'hover:bg-[#181717]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-.89-.609.068-.597.068-.597 1.004.07 1.532 1.032 1.532 1.032.875 1.5 2.294 1.067 2.855.816.089-.634.342-1.067.622-1.313-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shailum17/',
    color: 'hover:bg-[#0077B5]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595zm-7.5-10h-3v-10h3v10z" />
      </svg>
    )
  },
  {
    name: 'Twitter',
    url: 'https://x.com/shailum_17',
    color: 'hover:bg-[#1DA1F2]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.162c-.417.722-.656 1.561-.656 2.475 0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/shailu_m17',
    color: 'hover:bg-[#E4405F]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    )
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/message/PHLWVAD672GSJ1',
    color: 'hover:bg-[#25D366]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.363.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.768.464 3.484 1.347 4.997l-1.429 5.221 5.352-1.406c1.463.801 3.125 1.264 4.727 1.264h.001c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.182-2.929-7.071-1.889-1.889-4.401-2.929-7.07-2.929zm0 18.13c-1.504 0-2.977-.401-4.253-1.158l-.305-.18-3.176.836.847-3.104-.198-.319c-.822-1.319-1.257-2.839-1.257-4.405 0-4.411 3.588-7.999 7.999-7.999 2.137 0 4.146.832 5.656 2.344 1.511 1.511 2.344 3.52 2.344 5.656 0 4.411-3.588 7.999-7.999 7.999z" />
      </svg>
    )
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/shailu_m17',
    color: 'hover:bg-[#5865F2]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.163-.385-.405-.874-.617-1.249a.07.07 0 00-.073-.035c-1.67.285-3.282.822-4.885 1.515a.064.064 0 00-.03.027C.533 7.045-.32 9.58.099 12.057c.002.014.01.028.021.037a19.935 19.935 0 005.993 3.058.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098 13.087 13.087 0 01-1.872-.893.07.07 0 01-.007-.117c.126-.094.252-.192.371-.291a.07.07 0 01.073-.01c3.927 1.793 8.18 1.793 12.062 0a.07.07 0 01.074.009c.12.099.245.198.372.291a.07.07 0 01-.006.117 12.64 12.64 0 01-1.873.893.07.07 0 00-.037.098c.36.699.772 1.364 1.225 1.994a.07.07 0 00.076.028 19.888 19.888 0 005.994-3.058.07.07 0 00.021-.037c.5-3.177-.838-5.682-2.548-7.661a.061.061 0 00-.03-.027zM8.02 13.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
      </svg>
    )
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/Dry-Health-1080/',
    color: 'hover:bg-[#FF4500]',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12zm-6.406-2.845c.457 0 .828.371.828.828 0 .457-.371.828-.828.828-.457 0-.828-.371-.828-.828 0-.457.371-.828.828-.828zm-11.188 0c.457 0 .828.371.828.828 0 .457-.371.828-.828.828-.457 0-.828-.371-.828-.828 0-.457.371-.828.828-.828zm11.406 4.845c0 2.485-2.686 4.5-6 4.5s-6-2.015-6-4.5c0-.293.035-.573.102-.845.13.053.263.098.398.134.293.08.6.145.917.192.317.047.646.08.983.098.337.018.684.027 1.04.027.356 0 .703-.009 1.04-.027.337-.018.666-.051.983-.098.317-.047.624-.112.917-.192.135-.036.268-.081.398-.134.067.272.102.552.102.845zm-6.5-2.5c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm7 0c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm-3.5-7c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5z" />
      </svg>
    )
  }
]; 