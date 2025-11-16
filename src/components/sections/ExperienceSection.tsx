import timelineData from '../../data/timelineData';
import TimelineItem from '../ui/TimelineItem';
import LazyLoader from '../ui/LazyLoader';

export default function ExperienceSection() {

  return (
    <section id="education" className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-dark">Education</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded" />
          {timelineData.map((item, index) => (
            <LazyLoader
              key={item.id}
              delay={index * 200}
              fallback={
                <div className="w-full h-32 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg mb-8" />
              }
            >
              <TimelineItem
                item={item}
                position={index % 2 === 0 ? 'left' : 'right'}
              />
            </LazyLoader>
          ))}
        </div>
      </div>
    </section>
  );
}