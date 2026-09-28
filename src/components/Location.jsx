import useReveal from '../hooks/useReveal'
import styles from './Location.module.css'

function Location() {
  const sectionRef = useReveal()
  const VENUE_NAME    = 'OTM Central Mosque'
  const VENUE_ADDRESS = 'Iwo Road, Ibadan, Oyo State'
  const MAPS_LINK     = 'https://maps.app.goo.gl/Z9eQ24yLY5Kb3Urs5'
  const EMBED_SRC     = 'https://www.google.com/maps?q=OTM%20Central%20Mosque%2C%20Iwo%20Road%2C%20Ibadan%2C%20Oyo%20State&output=embed'

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        <div className="reveal">
          <p className={styles.label}>Find Us</p>
          <h2 className={styles.title}>The <em>Venue</em></h2>
          <p className={styles.subtitle}>{VENUE_ADDRESS}</p>
        </div>

        <div className={`${styles.card} reveal`}>

          <div className={styles.cornerTL} />
          <div className={styles.cornerTR} />
          <div className={styles.cornerBL} />
          <div className={styles.cornerBR} />

          <div className={styles.venueInfo}>
            <div className={styles.venueIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="#C9A84C" strokeWidth="1.3"/>
                <circle cx="12" cy="9" r="2.5" stroke="#C9A84C" strokeWidth="1.3"/>
              </svg>
            </div>
            <div className={styles.venueText}>
              <p className={styles.venueName}>{VENUE_NAME}</p>
              <p className={styles.venueAddr}>{VENUE_ADDRESS}</p>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              Get Directions
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              src={EMBED_SRC}
              className={styles.mapFrame}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OTM Central Mosque - Iwo Road Ibadan"
            />
            <div className={styles.mapOverlay} />
          </div>

          <div className={styles.detailsRow}>
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#C9A84C" strokeWidth="1.3"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="#C9A84C" strokeWidth="1.3"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>[29th October, 2026]</span>
            </div>
            <div className={styles.detailDot} />
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <circle cx="12" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.3"/>
                <polyline points="12 7 12 12 15 15" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>12:00 Noon</span>
            </div>
            <div className={styles.detailDot} />
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="#C9A84C" strokeWidth="1.3"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>All Guests Welcome</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Location