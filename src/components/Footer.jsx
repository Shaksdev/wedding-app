// Footer.jsx — A simple, stateless presentational component.
// No hooks, no state, no props. Just structure + styling.
// This is the simplest kind of React component.

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="ornament">
        <span style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)' }}></span>
        <svg viewBox="0 0 24 24" style={{ fill: 'var(--gold)', opacity: 0.6, width: 20, height: 20 }}>
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
        <span style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)' }}></span>
      </div>

      <p className={styles.names}>Opeyemi &amp; Hammed</p>
      <p className={styles.date}>[Thursday, the 29th of October &middot; 2026] · Ibadan</p>
      <p className={styles.verse}>
        “And of His signs is that He created for you from yourselves mates that you may find tranquility in them. And He placed between you affection and mercy. Indeed, in that are signs for a people who give thought.”
        <br />— Surah Ar-Rum (30:21)
      </p>
      <p className={styles.credit}>Made with love ✦</p>
    </footer>
  )
}

export default Footer
