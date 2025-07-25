import { useState, useEffect } from 'react';
import { publicationsData } from '../../data/publicationsData';
import { motion, AnimatePresence } from 'framer-motion';

const fallbackImages = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80', // mobile security
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // plant disease
];

export default function PublicationsSection() {
  const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});
  const [modalPub, setModalPub] = useState<null | typeof publicationsData[0]>(null);

  // Close modal on Esc or backdrop click
  useEffect(() => {
    if (!modalPub) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalPub(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [modalPub]);
  return (
    <section id="publications" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Publications</h2>
        <div className="flex flex-col gap-8">
          {publicationsData.map((pub, idx) => {
            const isImageLeft = idx % 2 === 0;
            const imageSrc = pub.image || fallbackImages[idx % fallbackImages.length];
            return (
              <motion.div
                key={pub.id}
                className={`flex flex-col md:flex-row ${!isImageLeft ? 'md:flex-row-reverse' : ''} bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <motion.div
                  className="md:w-72 w-full min-h-[180px] aspect-[4/3] flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
                >
                  <img src={imageSrc} alt={pub.title} className="object-cover w-full h-full" />
                </motion.div>
                <motion.div
                  className="flex-1 p-6 flex flex-col justify-between min-w-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                >
                  <span className="absolute top-4 right-6 text-md italic font-semibold text-gray-700/80">{pub.date}</span>
                  <h3 className="text-xl font-bold text-primary mb-1 break-words">{pub.title}</h3>
                  {pub.tags && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {pub.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 shadow"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3, type: 'spring' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mb-2 break-words">{pub.authors}</div>
                  <div className="text-xs text-gray-500 mb-2 italic break-words">{pub.venue}</div>
                  {pub.description && (
                    <>
                      <p className="text-gray-700 mb-3 text-sm whitespace-pre-line line-clamp-3">{pub.description}</p>
                      <button
                        className="text-primary font-semibold text-sm hover:underline focus:outline-none mb-2"
                        onClick={() => setModalPub(pub)}
                      >
                        Read More
                      </button>
                    </>
                  )}
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-semibold hover:underline text-sm">Publication Link</a>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Modal Popup */}
      <AnimatePresence>
        {modalPub && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setModalPub(null); }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-4 overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
                onClick={() => setModalPub(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="w-44 h-44 flex-shrink-0 rounded-lg shadow bg-gray-100 overflow-hidden md:static md:row-span-2">
                 <img src={modalPub.image || fallbackImages[0]} alt={modalPub.title} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                  <span className="block text-md italic font-semibold text-gray-700/80 mb-2">{modalPub.date}</span>
                  <h3 className="text-2xl font-bold text-primary mb-2 break-words">{modalPub.title}</h3>
                  {modalPub.tags && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {modalPub.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 shadow"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3, type: 'spring' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mb-2 break-words">{modalPub.authors}</div>
                  <div className="text-xs text-gray-500 mb-2 italic break-words">{modalPub.venue}</div>
                  {modalPub.description && (
                    <p className="text-gray-700 mb-3 text-sm whitespace-pre-line break-words">{modalPub.description}</p>
                  )}
                  {modalPub.link && (
                    <a href={modalPub.link} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-semibold hover:underline text-sm">Publication Link</a>
                  )}
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
