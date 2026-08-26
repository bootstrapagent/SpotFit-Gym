import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { siteData } from '../../data/site';
import styles from './Nutrition.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState(siteData.nutrition.goals[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current.querySelectorAll('.reveal-up'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    
    // Animate content change
    gsap.fromTo(contentRef.current.children,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
    );
  }, [activeTab]);

  const activeData = siteData.nutrition.goals.find(g => g.id === activeTab);

  return (
    <section ref={containerRef} id="fuel" className="py-section px-container border-b bg-surface-container-high">
      <div className="grid-12">
        <div className="col-span-4 md:col-start-3 md:col-span-8 flex flex-col items-center text-center mb-12">
          <h3 className="font-label-caps text-primary-fixed mb-4 reveal-up">NUTRITION & FUEL</h3>
          <h2 className="font-display-lg uppercase mb-8 reveal-up">FUEL YOUR TRAINING.</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto reveal-up">
            You cannot out-train a poor diet. Our in-house nutritionists design protocols that fuel performance and optimize recovery.
          </p>
        </div>

        <div className="col-span-4 md:col-start-3 md:col-span-8 reveal-up">
          {/* Tabs */}
          <div className={styles.tabContainer}>
            {siteData.nutrition.goals.map(goal => (
              <button
                key={goal.id}
                className={`${styles.tabBtn} ${activeTab === goal.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(goal.id)}
              >
                {goal.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.contentContainer} ref={contentRef}>
            {activeData?.phases.map((phase, idx) => (
              <div key={idx} className={styles.phaseCard}>
                <div className={styles.phaseHeader}>
                  <span className="material-symbols-outlined text-primary-fixed">schedule</span>
                  <span className="font-label-caps text-on-surface">{phase.time}</span>
                </div>
                <div className="w-full h-px bg-surface-variant my-4"></div>
                <p className="font-body-md text-on-surface-variant">{phase.plan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
