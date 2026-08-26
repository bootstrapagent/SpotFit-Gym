import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { siteData } from '../../data/site';
import styles from './Training.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Training() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const desktopItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Desktop pinned horizontal scroll animation
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      if (!containerRef.current || !scrollWrapperRef.current) return;
      
      const items = desktopItemsRef.current;
      const totalItems = items.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${100 * totalItems}%`,
          scrub: 1,
        }
      });

      // Animate horizontal movement
      tl.to(scrollWrapperRef.current, {
        xPercent: -100 * (totalItems - 1) / totalItems,
        ease: "none"
      });

      // Manage active states based on scroll position
      items.forEach((item, i) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top ${-100 * i}%`,
          end: `top ${-100 * (i + 1)}%`,
          onToggle: (self) => {
            if (self.isActive) {
              item.classList.add(styles.active);
            } else {
              item.classList.remove(styles.active);
            }
          }
        });
      });
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section ref={containerRef} id="train" className={styles.section}>
      {/* Desktop Horizontal Scroll Wrapper */}
      <div className={styles.desktopContainer}>
        <div 
          ref={scrollWrapperRef}
          className={styles.scrollWrapper} 
          style={{ width: `${siteData.services.length * 100}vw` }}
        >
          {siteData.services.map((service, index) => (
            <div 
              key={service.id} 
              ref={el => { desktopItemsRef.current[index] = el; }}
              className={styles.desktopItem}
            >
              <div className={styles.desktopBackground}>
                <video className={styles.video} autoPlay loop muted playsInline poster="/assets/brand/logo.webp">
                  <source src={service.video} type="video/webm" />
                </video>
                <div className={styles.desktopOverlay}></div>
              </div>
              <div className={styles.desktopContent}>
                <div className="font-display-xl text-primary-fixed mb-4" style={{ fontSize: '15vw', lineHeight: 0.8, opacity: 0.2 }}>
                  {service.id} <span style={{ fontSize: '8vw', opacity: 0.5 }}>/ {siteData.services.length.toString().padStart(2, '0')}</span>
                </div>
                <h3 className="font-display-lg uppercase text-on-surface mb-2">{service.title}</h3>
                <p className="font-body-lg text-on-surface-variant max-w-lg">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stacked Cards */}
      <div className={`py-section px-container space-y-8 bg-surface-container-lowest ${styles.mobileContainer}`}>
        <h2 className="font-display-lg uppercase mb-8">SERVICES</h2>
        {siteData.services.map((service) => (
          <div key={service.id} className={styles.mobileCard}>
            <div className={styles.mobileVideoContainer}>
              <video className={styles.mobileVideo} autoPlay loop muted playsInline>
                <source src={service.video} type="video/webm" />
              </video>
              <div className={styles.mobileOverlay}></div>
            </div>
            <div className={styles.mobileContent}>
              <div className="font-label-caps text-primary-fixed mb-2">{service.id} // {siteData.services.length.toString().padStart(2, '0')}</div>
              <h3 className="font-headline-lg uppercase text-on-surface mb-2">{service.title}</h3>
              <p className="font-body-md text-on-surface-variant">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
