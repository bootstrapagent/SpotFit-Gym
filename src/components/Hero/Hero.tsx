import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current || !contentRef.current) return;

    // --- On Load Animations ---
    const tlLoad = gsap.timeline();
    tlLoad.fromTo(contentRef.current.children, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
    if (scrollIndicatorRef.current) {
      tlLoad.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    // --- Scroll Animations (Pinning) ---
    // MatchMedia ensures we don't pin weirdly on very small screens if it breaks, but the prompt says 
    // "pin hero" as a general scroll animation. We'll use matchMedia for safety.
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      if (!containerRef.current) return;
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // Pin for 100vh
          pin: true,
          scrub: 1,
        }
      });

      // Scale video and dim overlay
      tlScroll.to(videoWrapperRef.current, {
        scale: 1.12,
        yPercent: 5,
        ease: "none"
      }, 0);

      // Fade and move content up
      tlScroll.to(contentRef.current, {
        y: -100,
        opacity: 0,
        ease: "none"
      }, 0);
      
      if (scrollIndicatorRef.current) {
        tlScroll.to(scrollIndicatorRef.current, { opacity: 0, ease: "none" }, 0);
      }
    });

    mm.add("(max-width: 767px)", () => {
      // simplified mobile parallax without full pinning to avoid jank
      if (!containerRef.current) return;
      gsap.to(videoWrapperRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      <div ref={videoWrapperRef} className={styles.videoWrapper}>
        <div className={styles.overlay}></div>
        <video 
          className={styles.video} 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/assets/brand/logo.webp"
        >
          <source src="/assets/videos/hero.webm" type="video/webm" />
        </video>
        <div className={styles.gradient}></div>
      </div>

      <div ref={contentRef} className={`relative z-10 text-center px-container ${styles.content}`}>
        <h2 className="font-display-xl uppercase leading-none mb-6 text-on-surface">
          UNCOMPROMISING<br className="hidden md:block" />
          <span className="text-primary-fixed">PERFORMANCE.</span>
        </h2>
        <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
          The elite training facility designed for results, not resolutions.
        </p>
        <a href="#membership" className="btn btn-primary font-label-caps" style={{ padding: '20px 48px', fontSize: '14px' }}>
          JOIN NOW
        </a>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className="font-label-caps text-on-surface-variant mb-2" style={{ fontSize: '10px' }}>SCROLL</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
