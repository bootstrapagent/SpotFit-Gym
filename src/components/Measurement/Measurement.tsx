import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { siteData } from '../../data/site';
import styles from './Measurement.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Measurement() {
  const containerRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger reveal for the metrics list
    gsap.fromTo(metricsRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Animate progress bars growing
    gsap.fromTo(barsRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Number counter animation logic
    metricsRef.current.forEach(metric => {
      if (!metric) return;
      const valueNode = metric.querySelector(`.${styles.metricValue}`);
      if (!valueNode) return;
      
      const targetText = valueNode.textContent || "0";
      const targetVal = parseFloat(targetText.replace(/[^0-9.]/g, ''));
      if (isNaN(targetVal)) return;

      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: targetVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          // preserve decimals if target had them
          if (targetText.includes('.')) {
            valueNode.textContent = obj.val.toFixed(1);
          } else {
            valueNode.textContent = Math.round(obj.val).toString();
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} id="measure" className="py-section px-container border-b bg-surface-container-highest relative overflow-hidden">
      
      {/* Subtle scanning effect background element */}
      <div className={styles.scanLine}></div>
      
      <div className="grid-12">
        <div className="col-span-4 md:col-span-5 flex flex-col justify-center mb-12 md:mb-0 relative z-10">
          <h3 className="font-label-caps text-primary-fixed mb-4">MEASURE YOUR PROGRESS</h3>
          <h2 className="font-display-lg uppercase mb-8">KNOW YOUR BODY.</h2>
          <p className="font-body-lg text-on-surface-variant max-w-md">
            UNDERSTAND YOUR BODY COMPOSITION. Don't guess your progress. Measure it with surgical precision using our advanced biometric assessment tools.
          </p>
        </div>

        <div className="col-span-4 md:col-start-7 md:col-span-6 relative z-10">
          <div className={styles.dashboard}>
            <div className={styles.dashHeader}>
              <div className="flex items-center gap-2">
                <div className={styles.pulseDot}></div>
                <span className="font-label-caps text-primary-fixed">BCA SCAN // ACTIVE</span>
              </div>
              <span className="material-symbols-outlined text-primary-fixed">analytics</span>
            </div>
            
            <div className={styles.metricList}>
              {siteData.bca.metrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  ref={el => { metricsRef.current[idx] = el; }}
                  className={styles.metricItem}
                >
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-caps text-on-surface">{metric.label}</span>
                    <span className="font-stat-value text-primary-fixed">
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className="text-body-md text-on-surface-variant ml-1">{metric.unit}</span>
                    </span>
                  </div>
                  {/* Progress Bar Visual */}
                  <div className={styles.progressBarTrack}>
                    <div 
                      ref={el => { barsRef.current[idx] = el; }}
                      className={styles.progressBarFill}
                      style={{ width: `${Math.min(100, Math.max(10, parseFloat(metric.value) * 1.5))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
