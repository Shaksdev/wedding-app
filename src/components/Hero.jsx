// Hero.jsx
//
// ┌─────────────────────────────────────────────────────────────┐
// │  PROPS AGAIN — receiving data from the parent               │
// │                                                             │
// │  App.jsx passes:  <Hero envelopeOpened={envelopeOpened} />  │
// │  Here we receive: function Hero({ envelopeOpened })         │
// │                                                             │
// │  envelopeOpened is a boolean (true/false).                  │
// │  We use it to trigger the hero's entrance animation:        │
// │  only AFTER the envelope opens should the names appear.     │
// └─────────────────────────────────────────────────────────────┘

import styles from './Hero.module.css'

// The CornerOrnament is a tiny reusable sub-component.
// It draws one decorative SVG corner and accepts a "position" prop
// so the parent can place it in all four corners without repeating code.
// This is one of React's superpowers: composability.
function CornerOrnament({ position }) {
  return (
    <div className={`${styles.corner} ${styles[position]}`}>
      {/*
        Template literal + computed property:
        styles[position] looks up styles['cornerTl'] or styles['cornerTr'] etc.
        This is equivalent to writing styles.cornerTl directly, but dynamic.
      */}
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 L10 80 Q10 100 30 100" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <path d="M10 10 L80 10 Q100 10 100 30" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <path d="M30 30 L30 65 Q30 80 45 80" stroke="#C9A84C" strokeWidth="0.6" fill="none" opacity="0.6"/>
        <path d="M30 30 L65 30 Q80 30 80 45" stroke="#C9A84C" strokeWidth="0.6" fill="none" opacity="0.6"/>
        <circle cx="10" cy="10" r="3" fill="#C9A84C" opacity="0.8"/>
        <circle cx="30" cy="30" r="2" fill="#C9A84C" opacity="0.5"/>
      </svg>
    </div>
  )
}

function Hero({ envelopeOpened }) {
  // Build the content class string conditionally.
  // When envelopeOpened is true, we add the "animate" class,
  // which triggers the CSS animations on the child elements.
  const contentClass = `${styles.heroContent} ${envelopeOpened ? styles.animate : ''}`

  return (
    <section className={styles.hero}>
      {/* Radial gradient background */}
      <div className={styles.heroBg}></div>

      {/* Ambient gold glow in the centre */}
      <div className={styles.glow}></div>

      {/* Four decorative corners — same component, different position prop */}
      <CornerOrnament position="cornerTl" />
      <CornerOrnament position="cornerTr" />
      <CornerOrnament position="cornerBl" />
      <CornerOrnament position="cornerBr" />

      {/* Main content */}
      <div className={contentClass}>
        <p className={styles.tagline}>Together with their families</p>

        <div className={styles.namesWrapper}>
          <span className={styles.brideName}>Opeyemi Adeoje</span>
          <span className={styles.ampersand}>&amp;</span>
          <span className={styles.groomName}>Hammed Adeola</span>
        </div>

        <div className={styles.dividerLine}>
          <span className={styles.line}></span>
          <span className={styles.diamond}></span>
          <span className={styles.line}></span>
        </div>

        <p className={styles.heroDate}>
          Saturday, the [Day] of [Month] &middot; [Year] &middot; Lagos, Nigeria
        </p>

        <div className={styles.heroCta}>
          {/*
            Smooth scroll to a section:
            onClick fires a function when clicked.
            e.preventDefault() stops the browser's default anchor jump behaviour.
            scrollIntoView animates smoothly to the target element.
          */}
          <a
            href="#details"
            className="btn-gold"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('details').scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Details
          </a>
          <a
            href="#wishes"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Send Wishes
          </a>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
