import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FRAME_COUNT, getFrame } from '../lib/heroSequence';

gsap.registerPlugin(ScrollTrigger);

export interface HeroTextRefs {
  phase1: HTMLElement | null; // "UNCOMPROMISING PERFORMANCE"
  phase2: HTMLElement | null; // "The elite training facility..."
  scrollIndicator: HTMLElement | null;
}

export const setupHeroAnimation = (
  container: HTMLElement,
  context: CanvasRenderingContext2D,
  textRefs: HeroTextRefs,
  drawFrame: (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => void
) => {
  const mm = gsap.matchMedia();
  
  // Animation state (kept out of React state)
  const state = {
    targetFrame: 0,
    currentFrame: 0
  };
  
  let animationFrameId: number;
  const damping = 0.2; // Tuning factor for rAF smoothing (increased for faster catch-up)

  // The custom render loop
  const renderLoop = () => {
    // Smoothly approach the target frame
    state.currentFrame += (state.targetFrame - state.currentFrame) * damping;
    
    // Round to nearest integer for actual frame index
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(state.currentFrame)));
    
    // Get the image from cache
    const img = getFrame(frameIndex);
    if (img && img.complete) {
      drawFrame(context, img);
    }
    
    animationFrameId = requestAnimationFrame(renderLoop);
  };
  
  // Start the render loop
  renderLoop();

  // Set initial text states
  gsap.set([textRefs.phase2], { opacity: 0, y: 30 });

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    },
    (contextInfo) => {
      const { isDesktop } = contextInfo.conditions as { isDesktop: boolean };
      
      // Desktop: 500vh, Mobile: 400vh
      const scrollDistance = isDesktop ? "+=500%" : "+=400%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: scrollDistance,
          pin: true,
          scrub: 1.2, // GSAP scrub smoothing
        }
      });

      // 1. Scrub through the targetFrame
      tl.to(state, {
        targetFrame: FRAME_COUNT - 1,
        ease: "none",
        duration: 85 // Finishes at 85% of the scroll timeline to ensure we see the last frame before unpinning
      }, 0);

      // 2. Text Choreography (Synchronized to timeline progress)
      
      // Scroll Indicator fades out immediately
      if (textRefs.scrollIndicator) {
        tl.to(textRefs.scrollIndicator, { opacity: 0, duration: 5 }, 0);
      }

      // Phase 1 (0-25%): "UNCOMPROMISING PERFORMANCE" stays, then fades out
      if (textRefs.phase1) {
        tl.to(textRefs.phase1, {
          y: -40,
          opacity: 0,
          duration: 15,
          ease: "power2.inOut"
        }, 10); // Starts fading at 10%
      }

      // Phase 2 (25-100%): Paragraph + CTA enters and stays
      if (textRefs.phase2) {
        tl.to(textRefs.phase2, {
          y: 0,
          opacity: 1,
          duration: 15,
          ease: "power2.out"
        }, 30); // Enters at 30%
        // It now naturally stays on screen until the hero unpins
      }
    }
  );

  return () => {
    cancelAnimationFrame(animationFrameId);
    mm.revert();
  };
};
