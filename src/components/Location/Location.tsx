import styles from './Location.module.css';

export default function Location() {
  const mapLink = "https://www.google.com/maps/place/SPOTFIT/@13.0089359,77.7371972,17.5z/data=!4m6!3m5!1s0x3bae1186c53a0cff:0xa9df04563f0be09c!8m2!3d13.0090261!4d77.7368639!16s%2Fg%2F11nc0lbk2m?entry=ttu";
  const embedLink = "https://maps.google.com/maps?q=SPOT+FIT,+K+Dommasandra,+Bengaluru&t=&z=17&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-section px-container border-b bg-surface-container-low">
      <div className="grid-12">
        <div className="col-span-4 md:col-span-5 flex flex-col justify-center">
          <h3 className="font-label-caps text-primary-fixed mb-4">LOCATION</h3>
          <h2 className="font-display-lg uppercase mb-8">SPOT FIT<br/>HQ.</h2>
          <p className="font-body-lg text-on-surface-variant max-w-md mb-8">
            K Dommasandra, Bengaluru.
            <br />Your fitness freedom starts here.
          </p>
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary font-label-caps" style={{ padding: '16px 32px', alignSelf: 'flex-start' }}>
            GET DIRECTIONS
          </a>
        </div>

        <div className="col-span-4 md:col-start-7 md:col-span-6 mt-12 md:mt-0">
          <div className={styles.mapContainer}>
            <iframe 
              src={embedLink}
              className={styles.mapIframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SPOT FIT GYM Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
