import React from 'react';
import { Certification } from '../../data/experienceData';
import { motion } from 'framer-motion';

interface CertificationCardProps {
  cert: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ cert }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="flex px-3 py-3 transition-shadow duration-300 hover:shadow-[0_0_20px_5px] hover:shadow-primary/50"
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={cert.image} alt={cert.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{cert.title}</div>
          <p className="text-gray-700 text-base">
            {cert.issuer} - {cert.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default CertificationCard;
