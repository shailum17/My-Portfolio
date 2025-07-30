import { motion } from "framer-motion";

interface InternshipTimelineItemProps {
  item: {
    id: number;
    title: string;
    company: string;
    period: string;
    location: string;
    type: string;
    skills?: string[];
    image?: string;
    link?: string;
  };
  position: 'left' | 'right';
}

export default function InternshipTimelineItem({ item, position }: InternshipTimelineItemProps) {
  // Accent color for internships
  const accent = 'blue-500';
  
  return (
    <div className="flex w-full mb-12">
      {/* Left card */}
      <div className="flex-1 flex justify-end pr-4">
        {position === 'left' && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative rounded-2xl w-full max-w-md p-0 neumorph-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-50 rounded-t-2xl px-6 pt-6 pb-2">
              <div className="flex items-center gap-3">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-12 h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200" 
                  />
                )}
                <span className="font-bold text-lg text-blue-900 drop-shadow-sm">{item.title}</span>
              </div>
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow ml-2 whitespace-nowrap">{item.period}</span>
            </div>
            
            {/* Body */}
            <div className="px-6 py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                {/* Company icon */}
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <span className="font-medium">{item.company}</span>
                <span className="text-xs text-gray-400">&middot; {item.type}</span>
              </div>
              <div className="text-xs text-gray-500 italic">{item.location}</div>
              {item.skills && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.skills.map((skill, i) => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow">{skill}</span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 pb-4 flex items-center justify-between">
              {item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card__btn w-full md:w-auto text-center font-semibold border-none cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition"
                >
                  View
                </a>
              ) : <div />}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Center line and dot */}
      <div className="flex flex-col items-center justify-start relative">
        <span className={`w-4 h-4 rounded-full bg-${accent} border-4 border-white shadow-lg z-10`} />
        <span className={`w-1 flex-1 bg-${accent}/30`} style={{ minHeight: 60 }} />
      </div>
      
      {/* Right card */}
      <div className="flex-1 flex justify-start pl-4">
        {position === 'right' && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative rounded-2xl w-full max-w-md p-0 neumorph-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-50 rounded-t-2xl px-6 pt-6 pb-2">
              <div className="flex items-center gap-3">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-12 h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200" 
                  />
                )}
                <span className="font-bold text-lg text-blue-900 drop-shadow-sm">{item.title}</span>
              </div>
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow ml-2 whitespace-nowrap">{item.period}</span>
            </div>
            
            {/* Body */}
            <div className="px-6 py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                {/* Company icon */}
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <span className="font-medium">{item.company}</span>
                <span className="text-xs text-gray-400">&middot; {item.type}</span>
              </div>
              <div className="text-xs text-gray-500 italic">{item.location}</div>
              {item.skills && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.skills.map((skill, i) => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow">{skill}</span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 pb-4 flex items-center justify-between">
              {item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card__btn w-full md:w-auto text-center font-semibold border-none cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition"
                >
                  View
                </a>
              ) : <div />}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 