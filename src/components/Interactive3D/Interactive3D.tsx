import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from './Interactive3D.module.css';

// Lazy load the 3D scene so it doesn't block initial page render
const SpotFitScene = React.lazy(() => import('./SpotFitScene'));

export default function Interactive3D() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Only render the canvas when the section is near the viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { rootMargin: '200px' }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} id="performance" className={styles.section}>
      {/* 3D Canvas with Lazy Loading and Mobile/Reduced-Motion Fallbacks */}
      <div className={styles.canvasContainer}>
        {isVisible && !prefersReducedMotion ? (
          <Suspense fallback={<div className={styles.placeholderGrid}></div>}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <SpotFitScene />
            </Canvas>
          </Suspense>
        ) : (
          <div className={styles.placeholderGrid}></div>
        )}
      </div>
      
      {/* Content Overlay */}
      <h2 className={`font-display-xl ${styles.headline}`}>
        TRAIN.<br />MEASURE.<br />IMPROVE.
      </h2>
    </section>
  );
}
