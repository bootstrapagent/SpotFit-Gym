import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={`py-section px-container ${styles.section}`}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source src="/assets/videos/final-cta.webm" type="video/webm" />
        </video>
        <div className={styles.gradient}></div>
      </div>

      <div className={`relative z-10 text-center mx-auto max-w-5xl ${styles.content}`}>
        <h2 className={`font-display-xl uppercase mb-8 ${styles.headline}`}>
          STOP WAITING.<br />
          <span className="text-primary-fixed">START BUILDING.</span>
        </h2>
        <button className="btn btn-primary font-label-caps" style={{ padding: '20px 48px', fontSize: '14px' }}>
          CLAIM YOUR TRIAL
        </button>
      </div>
    </section>
  );
}
