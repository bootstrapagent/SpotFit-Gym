import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className="w-full px-container py-section bg-surface-container-lowest border-y border-surface-variant">
      <div className="grid-12">
        <div className="col-span-4 md:col-span-6 mb-12 md:mb-0">
          <img src="/assets/brand/logo.webp" alt="SPOT FIT" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
          <p className="font-body-md text-on-surface-variant mt-4">
            © {new Date().getFullYear()} SPOT FIT. UNCOMPROMISING PERFORMANCE.
          </p>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-xs">
            K Dommasandra, Bengaluru. YOUR FITNESS FREEDOM STARTS HERE.
          </p>
        </div>
        
        <div className="col-span-4 md:col-span-6">
          <div className={styles.linkGrid}>
            <a href="#train" className="font-label-caps text-on-surface-variant">TRAIN</a>
            <a href="#membership" className="font-label-caps text-on-surface-variant">MEMBERSHIP</a>
            <a href="#coach" className="font-label-caps text-on-surface-variant">COACH</a>
            <a href="#location" className="font-label-caps text-on-surface-variant">LOCATION</a>
            <a href="#measure" className="font-label-caps text-on-surface-variant">MEASURE</a>
            <a href="#contact" className="font-label-caps text-on-surface-variant">CONTACT</a>
            <a href="#fuel" className="font-label-caps text-on-surface-variant">FUEL</a>
            <a href="#instagram" className="font-label-caps text-on-surface-variant">INSTAGRAM</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
