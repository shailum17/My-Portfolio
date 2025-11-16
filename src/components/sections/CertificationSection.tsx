import { certifications } from '../../data/experienceData';
import LazyLoader from '../ui/LazyLoader';
import CertificationCard from '../ui/CertificationCard';

export default function CertificationSection() {
  return (
    <section id="certifications" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Certifications</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {certifications.map((cert, idx) => (
            <LazyLoader
              key={cert.id}
              delay={idx * 100}
              fallback={
                <div className="w-full h-80 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg" />
              }>
              <div className="break-inside-avoid mb-8">
                <CertificationCard cert={cert} />
              </div>
            </LazyLoader>
          ))}
        </div>
      </div>
    </section>
  );
}