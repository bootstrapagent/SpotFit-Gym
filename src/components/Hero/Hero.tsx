import { useEffect, useRef } from 'react';
import HeroSequenceCanvas, { type HeroCanvasHandle } from './HeroSequenceCanvas';
import { setupHeroAnimation, type HeroTextRefs } from '../../animations/hero';
import { preloadFirstFrame, preloadSequence, clearSequenceCache, getFrame } from '../../lib/heroSequence';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasLayerRef = useRef<HeroCanvasHandle>(null);
  
  const phase1Ref = useRef<HTMLHeadingElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Instantly load the first frame so we have something to show
    preloadFirstFrame().then(() => {
      
      // Draw first frame immediately to canvas if it's ready
      if (canvasLayerRef.current?.canvas && canvasLayerRef.current?.context) {
        const frame0 = getFrame(0);
        if (frame0) {
          canvasLayerRef.current.drawFrame(canvasLayerRef.current.context, frame0);
        }
      }
      
      // 2. Start preloading the rest in the background
      preloadSequence();
    });

    return () => {
      clearSequenceCache();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasLayerRef.current) return;
    
    const { canvas, context, drawFrame } = canvasLayerRef.current;
    if (!canvas || !context) return;

    const textRefs: HeroTextRefs = {
      phase1: phase1Ref.current,
      phase2: phase2Ref.current,
      scrollIndicator: scrollIndicatorRef.current
    };

    // Initialize GSAP scroll animation and rAF loop
    const cleanupAnimation = setupHeroAnimation(containerRef.current, context, textRefs, drawFrame);

    // CRITICAL: Refresh all ScrollTriggers because we just added a pin that pushes other sections down
    // after the initial React mount (due to waiting for the first image to load).
    import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });

    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      {/* Canvas Layer */}
      <div className={styles.videoWrapper}>
        <div className={styles.overlay}></div>
        <HeroSequenceCanvas ref={canvasLayerRef} />
        <div className={styles.gradient}></div>
      </div>

      {/* Content Layer (Typography) */}
      <div className={`relative z-10 text-center px-container ${styles.content}`}>
        <h2 
          ref={phase1Ref}
          className="font-display-xl uppercase leading-none mb-6 text-on-surface"
        >
          UNCOMPROMISING<br className="hidden md:block" />
          <span className="text-primary-fixed">PERFORMANCE.</span>
        </h2>
        
        {/* Phase 2 Combined (Paragraph + CTA) */}
        <div 
          ref={phase2Ref}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-container text-center gap-8"
          style={{ opacity: 0 }}
        >
          <p className="font-body-xl text-on-surface max-w-4xl mx-auto">
            The elite training facility designed for results, not resolutions.
          </p>
          <a
            href="#membership" 
            className={styles.ctaButton}
            aria-label="Join SPOT FIT GYM Now"
          >
            JOIN NOW
          </a>
        </div>
      </div>

      {/* Scroll Indicator Layer */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className="font-label-caps text-on-surface-variant mb-2" style={{ fontSize: '10px' }}>SCROLL</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
