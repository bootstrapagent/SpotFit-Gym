import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setScrolled(currentScrollY > 80);
      
      // Handle hide/show based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !menuOpen) {
        setHidden(true); // Scrolling down
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false); // Scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    // Check initial position on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuRef.current) return;
    
    // Setup GSAP timeline for mobile menu
    tlRef.current = gsap.timeline({ paused: true });
    
    tlRef.current.fromTo(menuRef.current, 
      { yPercent: -100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.inOut' }
    );
    
    const links = menuRef.current.querySelectorAll('a');
    tlRef.current.fromTo(links,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      "-=0.2"
    );

  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (menuOpen) {
        tlRef.current.play();
        document.body.style.overflow = 'hidden';
      } else {
        tlRef.current.reverse();
        document.body.style.overflow = '';
      }
    }
  }, [menuOpen]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled || menuOpen ? styles.navScrolled : ''} ${hidden ? styles.navHidden : ''}`}>
        <a href="#" className={styles.logoLink} onClick={() => setMenuOpen(false)}>
          <img src="/assets/brand/logo.webp" alt="SPOT FIT" className={styles.logoImage} />
        </a>
        
        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          <a href="#train" className={styles.navLink}>TRAIN</a>
          <a href="#membership" className={styles.navLink}>MEMBERSHIP</a>
          <a href="#measure" className={styles.navLink}>MEASURE</a>
          <a href="#fuel" className={styles.navLink}>FUEL</a>
          <a href="#facility" className={styles.navLink}>LAB</a>
          <a href="#location" className="btn btn-primary font-label-caps" style={{ padding: '12px 24px', marginLeft: '16px' }}>LOCATION</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        ref={menuRef}
        className={styles.mobileMenu}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileNavContainer}>
          <a href="#train" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>TRAIN</a>
          <a href="#membership" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>MEMBERSHIP</a>
          <a href="#measure" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>MEASURE</a>
          <a href="#fuel" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>FUEL</a>
          <a href="#facility" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>LAB</a>
          <a href="#location" className={`btn btn-primary font-label-caps ${styles.mobileCta}`} onClick={() => setMenuOpen(false)}>
            LOCATION
          </a>
        </div>
      </div>
    </>
  );
}
