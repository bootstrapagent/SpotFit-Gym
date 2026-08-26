import './styles/variables.css';
import './styles/globals.css';
import './styles/utilities.css';

import React, { useEffect, Suspense } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import BrandStatement from './components/BrandStatement/BrandStatement';
import Training from './components/Training/Training';
import Measurement from './components/Measurement/Measurement';
import Nutrition from './components/Nutrition/Nutrition';
import Facility from './components/Facility/Facility';
import Membership from './components/Membership/Membership';
import Testimonials from './components/Testimonials/Testimonials';
import Location from './components/Location/Location';
import FinalCTA from './components/FinalCTA/FinalCTA';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const Interactive3D = React.lazy(() => import('./components/Interactive3D/Interactive3D'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle hash links for smooth scrolling with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hash && target.hash.startsWith('#') && target.origin === window.location.origin) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          // If the target is pinned by ScrollTrigger, it will be wrapped in a .pin-spacer.
          // We must scroll to the spacer's position, as the target itself may be translated.
          const pinSpacer = targetElement.closest('.pin-spacer') as HTMLElement;
          const scrollToTarget = pinSpacer || targetElement;
          
          lenis.scrollTo(scrollToTarget);
          
          // Also update URL without native jump
          window.history.pushState(null, '', target.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStatement />
        <Training />
        <Measurement />
        <Suspense fallback={<div style={{ height: '100vh', backgroundColor: 'var(--background)' }} />}>
          <Interactive3D />
        </Suspense>
        <Nutrition />
        <Facility />
        <Membership />
        <Testimonials />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
