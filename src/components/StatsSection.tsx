
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

const StatsSection = () => {
  const { isVisible, elementRef } = useScrollAnimation();
  const [animatedValues, setAnimatedValues] = useState({
    satisfaction: 0,
    value: 0,
    projects: 0,
    clients: 0
  });

  const stats = [
    { key: 'satisfaction', label: 'Client Satisfaction', value: 100, suffix: '%' },
    { key: 'value', label: 'Value Delivered', value: 140, suffix: 'M', prefix: '£' },
    { key: 'projects', label: 'Projects Completed', value: 240, suffix: '+' },
    { key: 'clients', label: 'Happy Clients', value: 50, suffix: '+' }
  ];

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat) => {
        let startValue = 0;
        const increment = stat.value / 100;
        const timer = setInterval(() => {
          startValue += increment;
          if (startValue >= stat.value) {
            startValue = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [stat.key]: Math.floor(startValue)
          }));
        }, 20);
      });
    }
  }, [isVisible]);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Impact in Numbers
            </h2>
            <p className="text-gray-400 text-lg">
              Delivering measurable results that drive your business forward
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className="text-center"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 700ms ease, transform 700ms ease'
                }}
              >
                <div className="text-4xl md:text-6xl font-bold text-cyberpunk-magenta mb-2">
                  {stat.prefix || ''}{animatedValues[stat.key as keyof typeof animatedValues]}{stat.suffix}
                </div>
                <div className="text-gray-300 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
