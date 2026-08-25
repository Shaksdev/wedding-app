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
      <p className={styles.date}>[Date] · Lagos</p>
      <p className={styles.verse}>
        "Two are better than one, because they have a good reward for their toil."
        <br />— Ecclesiastes 4:9
      </p>
      <p className={styles.credit}>Made with love ✦</p>
    </footer>
  )
}

export default Footer
