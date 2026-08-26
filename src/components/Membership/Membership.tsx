import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { siteData } from '../../data/site';
import styles from './Membership.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Membership() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headerRef.current || !bottomElementsRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    // 1. Header reveal
    tl.fromTo(headerRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );

    // 2. Cards stagger in
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      // Card container reveals
      tl.fromTo(card,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        i === 0 ? "-=0.4" : "-=0.4" // Start shortly after header, subsequent cards stagger manually
      );

      // Card internal sections
      const sections = card.querySelectorAll(':scope > div > div, :scope > div > button');
      tl.fromTo(sections,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        "-=0.4"
      );

      // Benefits stagger
      const benefits = card.querySelectorAll('li');
      if (benefits.length) {
        tl.fromTo(benefits,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out' },
          "-=0.2"
        );
      }
    });

    // 3. Bottom benefit strip reveal
    tl.fromTo(bottomElementsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      "-=0.2"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Enforce correct order for 4-card desktop layout
  const orderedIds = ['monthly', 'quarterly', 'half-yearly', 'yearly'];
  const orderedPlans = orderedIds.map(id => 
    siteData.membershipPlans.find(p => p.id === id)!
  );

  return (
    <section ref={containerRef} id="membership" className={styles.section}>
      {/* Cinematic Background */}
      <div className={styles.backgroundWrapper}>
        <video className={styles.videoBg} autoPlay loop muted playsInline poster="/assets/brand/logo.webp">
          <source src="/assets/videos/facility.webm" type="video/webm" />
        </video>
        <div className={styles.overlay}></div>
      </div>

      <div className={`px-container relative z-10 ${styles.contentWrapper}`}>
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h3 className="font-label-caps text-primary-fixed mb-4">SPOT FIT MEMBERSHIP</h3>
          <h2 className="font-display-lg text-on-surface uppercase leading-none mb-4">
            MEMBERSHIP<br className="hidden md:block" />PRICING
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-md mx-auto">
            Choose your training commitment.
          </p>
        </div>

        {/* 4-Card Composition */}
        <div className={styles.cardsContainer}>
          {orderedPlans.map((plan, idx) => {
            const isYearly = plan.id === 'yearly';
            
            return (
              <div 
                key={plan.id}
                ref={el => { cardsRef.current[idx] = el; }}
                className={`${styles.pricingCard} ${isYearly ? styles.primaryCard : ''}`}
              >
                {/* BEST VALUE Badge */}
                {isYearly && (
                  <div className={`font-label-caps ${styles.bestValueBadge}`}>
                    BEST VALUE
                  </div>
                )}
                
                <div className="flex flex-col h-full text-center">
                  
                  {/* Plan Label */}
                  <div className="font-label-caps text-on-surface mb-2 tracking-widest uppercase">
                    {plan.name}
                  </div>
                  <div className="font-label-caps text-on-surface-variant mb-6 uppercase min-h-[16px]">
                    {plan.label}
                  </div>
                  
                  {/* Price */}
                  <div className="flex flex-col items-center justify-center mb-2">
                    <div className="font-stat-value text-on-surface leading-none mb-2" style={{ fontSize: isYearly ? '56px' : '48px' }}>
                      {formatCurrency(plan.monthlyPrice)}
                    </div>
                    <div className="font-label-caps text-on-surface-variant">
                      / MONTH
                    </div>
                  </div>

                  {/* Value / Bonus / Total */}
                  <div className="font-label-caps uppercase mt-6 mb-8 border-b border-surface-variant pb-6 min-h-[48px] flex items-center justify-center">
                    {isYearly ? (
                      <div className="text-primary-fixed">
                        {plan.paidMonths} MONTHS PAID<br />+ {plan.bonusMonths} MONTHS BONUS
                      </div>
                    ) : plan.totalPrice ? (
                      <div className="text-on-surface-variant">
                        {formatCurrency(plan.totalPrice)} TOTAL
                      </div>
                    ) : (
                      <div className="opacity-0">N/A</div>
                    )}
                  </div>

                  {/* Benefits */}
                  <ul className={styles.featureList}>
                    {plan.benefits.map((benefit, i) => {
                      const isPremiumBenefit = benefit.includes('BCA Test') || benefit.includes('Diet Plan') || benefit.includes('Extra');
                      return (
                        <li key={i} className={isPremiumBenefit ? styles.premiumBenefit : ''}>
                          {benefit}
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA */}
                  <button className={`btn mt-auto w-full ${isYearly ? 'btn-primary' : 'btn-secondary'} ${isYearly ? styles.primaryCta : ''} font-label-caps`}>
                    JOIN NOW
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefit Strip */}
        <div ref={bottomElementsRef} className="flex justify-center mt-12 md:mt-16">
          <div className={styles.benefitStrip}>
            {/* Standard Add-ons */}
            {siteData.addons.map((addon, idx) => (
              <div key={`addon-${idx}`} className={styles.benefitItem}>
                <div className="flex flex-col text-center">
                  <span className="font-label-caps text-on-surface uppercase">{addon.title}</span>
                  <span className="font-label-caps text-on-surface-variant text-xs mt-1 uppercase">{addon.description}</span>
                </div>
              </div>
            ))}
            {/* Yearly Benefits in strip */}
            <div className={styles.benefitItem}>
              <div className="flex flex-col text-center">
                <span className="font-label-caps text-on-surface uppercase">EXTRA GROUP CLASS</span>
                <span className="font-label-caps text-on-surface-variant text-xs mt-1 uppercase">YEARLY OFFER</span>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className="flex flex-col text-center">
                <span className="font-label-caps text-on-surface uppercase">EXTRA 2 MONTHS</span>
                <span className="font-label-caps text-on-surface-variant text-xs mt-1 uppercase">YEARLY OFFER</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
