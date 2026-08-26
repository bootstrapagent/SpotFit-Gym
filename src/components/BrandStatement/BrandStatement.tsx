import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animation for line stagger
    const lines = containerRef.current.querySelectorAll('.reveal-line');
    
    gsap.fromTo(lines, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="brand" 
      className="py-section px-container border-b bg-surface-container-lowest"
    >
      <div className="grid-12">
        <div className="col-span-4 md:col-start-3 md:col-span-8 flex flex-col justify-center text-center">
          <h2 className="font-display-xl uppercase text-on-surface">
            <div className="reveal-line overflow-hidden"><span className="block mb-8">MORE THAN A GYM.</span></div>
            <div className="reveal-line overflow-hidden text-primary-fixed"><span className="block leading-none">TRAIN.</span></div>
            <div className="reveal-line overflow-hidden text-primary-fixed"><span className="block leading-none">MEASURE.</span></div>
            <div className="reveal-line overflow-hidden text-primary-fixed"><span className="block leading-none">IMPROVE.</span></div>
            <div className="reveal-line overflow-hidden text-primary-fixed"><span className="block leading-none">TRANSFORM.</span></div>
          </h2>
        </div>
      </div>
    </section>
  );
}
