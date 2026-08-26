import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="results" className="py-section px-container border-b bg-surface-container-lowest">
      <div className="grid-12 items-center">
        <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
          <div className="font-display-xl text-primary-fixed mb-4">15k+</div>
          <div className="font-label-caps text-on-surface-variant">TRANSFORMATIONS ACHIEVED</div>
        </div>

        <div className="col-span-4 md:col-start-6 md:col-span-7">
          <blockquote className={styles.quote}>
            "I've trained at premium facilities globally. SPOT FIT is different. 
            The attention to biomechanics and data-driven protocols is unmatched."
          </blockquote>
          <div className="font-label-caps text-on-surface mt-8">— ARJUN K. / ELITE MEMBER</div>
        </div>
      </div>
    </section>
  );
}
