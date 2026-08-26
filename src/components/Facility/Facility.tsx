import styles from './Facility.module.css';

export default function Facility() {
  return (
    <section id="facility" className={styles.section}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source src="/assets/videos/facility.webm" type="video/webm" />
        </video>
      </div>

      <div className={`relative z-10 text-center ${styles.content}`}>
        <h3 className="font-label-caps text-primary-fixed mb-4">THE LAB</h3>
        <h2 className="font-display-lg uppercase">
          NO DISTRACTIONS.<br className="hidden md:block" />
          ONLY RESULTS.
        </h2>
      </div>
    </section>
  );
}
