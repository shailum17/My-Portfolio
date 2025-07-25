import { motion } from "framer-motion";

interface TimelineItemProps {
  item: {
    id: number;
    title: string;
    period: string;
    description?: string;
  };
  position: 'left' | 'right';
}

export default function TimelineItem({ item, position }: TimelineItemProps) {
  // Accent color
  const accent = 'purple-500';
  // Placeholder SVG icon (optional)
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
            className={`relative rounded-2xl w-full max-w-md p-8 pt-12 neumorph-card`}
          >
            <span className={`absolute -top-6 left-8 bg-${accent} text-white px-5 py-1 rounded-full text-sm font-semibold shadow`}>{item.period}</span>
            <h4 className={`font-bold text-${accent} mb-1 text-lg`}>{item.title}</h4>
            {item.description && <p className="text-gray-700 text-sm mb-2">{item.description}</p>}
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
            className={`relative rounded-2xl w-full max-w-md p-8 pt-12 neumorph-card`}
          >
            <span className={`absolute -top-6 right-8 bg-${accent} text-white px-5 py-1 rounded-full text-sm font-semibold shadow`}>{item.period}</span>
            <h4 className={`font-bold text-${accent} mb-1 text-lg`}>{item.title}</h4>
            {item.description && <p className="text-gray-700 text-sm mb-2">{item.description}</p>}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Neumorphism card style
// Add this to your global CSS (e.g., src/styles/globals.css):
// .neumorph-card {
//   background: #f9fafb;
//   box-shadow: 8px 8px 24px #e0e0e0, -8px -8px 24px #ffffff, inset 2px 2px 8px #e0e0e0, inset -2px -2px 8px #ffffff;
//   border: none;
// }
