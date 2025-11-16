import { internships } from '../../data/experienceData';
import { motion } from 'framer-motion';

export default function InternshipSection() {

  return (
    <section id="internships" className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Internships</h2>
        
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="space-y-8">
            {internships.map((intern, idx) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring', delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline dot for mobile */}
                <div className="absolute left-4 top-6 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-lg z-10" />
                
                <div className="ml-12 relative w-full rounded-2xl shadow-xl bg-white p-0 flex flex-col neumorph-card">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 rounded-t-2xl px-4 sm:px-6 pt-4 sm:pt-6 pb-2 gap-2">
                    <div className="flex items-center gap-3">
                      {intern.image && (
                        <img 
                          src={intern.image} 
                          alt={intern.title} 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200 flex-shrink-0" 
                        />
                      )}
                      <span className="font-bold text-base sm:text-lg text-blue-900 drop-shadow-sm break-words">{intern.title}</span>
                    </div>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow self-start sm:self-auto">{intern.period}</span>
                  </div>
                  
                  {/* Body */}
                  <div className="px-4 sm:px-6 py-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      {/* Company icon */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      <span className="font-medium break-words">{intern.company}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0">&middot; {intern.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic break-words">{intern.location}</div>
                    {intern.skills && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {intern.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow break-words">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="px-4 sm:px-6 pb-4 flex items-center justify-between">
                    {intern.link ? (
                      <a 
                        href={intern.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="card__btn w-full text-center font-semibold border-none cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition"
                      >
                        View
                      </a>
                    ) : <div />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded" />
          {internships.map((intern, idx) => {
            const position = idx % 2 === 0 ? 'left' : 'right';
            return (
              <div key={intern.id} className="flex w-full mb-16">
                {/* Left card */}
                <div className="flex-1 flex justify-end pr-4">
                  {position === 'left' && (
                    <div className="relative w-full max-w-md flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        className="relative w-full rounded-2xl shadow-xl bg-white p-0 flex flex-col neumorph-card"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-blue-50 rounded-t-2xl px-6 pt-6 pb-2">
                          <div className="flex items-center gap-3">
                            {intern.image && (
                              <img src={intern.image} alt={intern.title} className="w-12 h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200" />
                            )}
                            <span className="font-bold text-lg text-blue-900 drop-shadow-sm">{intern.title}</span>
                          </div>
                          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow ml-2 whitespace-nowrap">{intern.period}</span>
                        </div>
                        {/* Body */}
                        <div className="px-6 py-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            {/* Company icon */}
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                            <span className="font-medium">{intern.company}</span>
                            <span className="text-xs text-gray-400">&middot; {intern.type}</span>
                          </div>
                          <div className="text-xs text-gray-500 italic">{intern.location}</div>
                          {intern.skills && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {intern.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow">{skill}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Footer */}
                        <div className="px-6 pb-4 flex items-center justify-between">
                          {intern.link ? (
                            <a href={intern.link} target="_blank" rel="noopener noreferrer" className="card__btn w-full md:w-auto text-center font-semibold border-none cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition">View</a>
                          ) : <div />}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
                {/* Center line and dot */}
                <div className="flex flex-col items-center justify-start relative">
                  <span className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10" />
                  <span className="w-1 flex-1 bg-blue-500/30" style={{ minHeight: 60 }} />
                </div>
                {/* Right card */}
                <div className="flex-1 flex justify-start pl-4">
                  {position === 'right' && (
                    <div className="relative w-full max-w-md flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        className="relative w-full rounded-2xl shadow-xl bg-white p-0 flex flex-col neumorph-card"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-blue-50 rounded-t-2xl px-6 pt-6 pb-2">
                          <div className="flex items-center gap-3">
                            {intern.image && (
                              <img src={intern.image} alt={intern.title} className="w-12 h-12 rounded-full shadow bg-white object-contain border-2 border-blue-200" />
                            )}
                            <span className="font-bold text-lg text-blue-900 drop-shadow-sm">{intern.title}</span>
                          </div>
                          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow ml-2 whitespace-nowrap">{intern.period}</span>
                        </div>
                        {/* Body */}
                        <div className="px-6 py-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            {/* Company icon */}
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                            <span className="font-medium">{intern.company}</span>
                            <span className="text-xs text-gray-400">&middot; {intern.type}</span>
                          </div>
                          <div className="text-xs text-gray-500 italic">{intern.location}</div>
                          {intern.skills && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {intern.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow">{skill}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Footer */}
                        <div className="px-6 pb-4 flex items-center justify-between">
                          {intern.link ? (
                            <a href={intern.link} target="_blank" rel="noopener noreferrer" className="card__btn w-full md:w-auto text-center font-semibold border-none cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition">View</a>
                          ) : <div />}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}