import { useState, useEffect, useRef } from 'react'
import styles from './EnvelopeIntro.module.css'

// Floating particle — a tiny gold speck that drifts upward
function Particle({ style }) {
  return <div className={styles.particle} style={style} />
}

function EnvelopeIntro({ onOpen }) {
  const [opening, setOpening]   = useState(false)
  const [cardUp,  setCardUp]    = useState(false)
  const [hiding,  setHiding]    = useState(false)
  const [particles, setParticles] = useState([])

  // Generate random floating particles on mount
  useEffect(() => {
    const pts = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:     `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${4 + Math.random() * 5}s`,
      width:  `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      opacity: 0.2 + Math.random() * 0.5,
    }))
    setParticles(pts)
  }, [])

  const handleClick = () => {
    if (opening) return
    setOpening(true)

    // Step 1: flap opens 
    // Step 2: card rises at 1.6s
    setTimeout(() => setCardUp(true), 1600)

    // Step 3: overlay fades at 3.4s
    setTimeout(() => setHiding(true), 3400)

    // Step 4: tell parent at 4.0s (after fade)
    onOpen() 
  }

  const overlayClass = [styles.overlay, hiding ? styles.hide : ''].join(' ')
  const flapClass    = [styles.flap,    opening ? styles.flapOpen : ''].join(' ')
  const cardClass    = [styles.card,    cardUp  ? styles.cardRise : ''].join(' ')
  const sealClass    = [styles.seal,    opening ? styles.sealHide : ''].join(' ')

  return (
    <div className={overlayClass}>

      {/* Ambient particles */}
      {particles.map(p => (
        <Particle key={p.id} style={{
          left: p.left,
          width: p.width,
          height: p.height,
          opacity: p.opacity,
          animationDelay: p.animationDelay,
          animationDuration: p.animationDuration,
        }} />
      ))}

      {/* Radial glow behind envelope */}
      <div className={styles.glow} />

      {/* Pre-text */}
      {!opening && (
        <p className={styles.preText}>Nikkah invitation</p>
      )}

      {/* THE ENVELOPE (Contained physical object on screen) */}
      <div className={styles.envOuter}>
        
        {/* Envelope Base (Darkest layer behind everything) */}
        <div className={styles.envBack} />

        {/* ── Invitation card ── */}
        <div className={cardClass}>
          <div className={styles.cardInner}>
            <div className={styles.cardTopLine} />

            {/* Bismillah beautifully placed at the top of the card */}
            <p className={styles.cardArabic}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            
            <p className={styles.cardEyebrow}>Together with their families</p>

            <div className={styles.cardMonogram}>
              <span className={styles.cardInitial}>O</span>
              <span className={styles.cardAmp}>&amp;</span>
              <span className={styles.cardInitial}>H</span>
            </div>

            <p className={styles.cardNames}>Opeyemi &amp; Hammed</p>
            <div className={styles.cardDivider}>
              <span /><span className={styles.cardDiamond} /><span />
            </div>
            <p className={styles.cardDate}>[Day · Month · Year]</p>
            <p className={styles.cardVenue}>Ibadan, Nigeria</p>

            <div className={styles.cardBottomLine} />
          </div>
        </div>

        {/* ── Envelope Body (Bottom, Left, Right Intersecting Flaps) ── */}
        <div className={styles.envBody}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.flapLinesSvg}>
            <polygon points="0,0 50,50 0,100" fill="rgba(0,0,0,0.15)" />
            <polygon points="100,0 50,50 100,100" fill="rgba(0,0,0,0.15)" />
            <polygon points="0,100 50,50 100,100" fill="rgba(0,0,0,0.3)" />
            
            {/* Minimalist Gold Lines */}
            <line x1="0" y1="100" x2="50" y2="50" stroke="#C9A84C" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.3" />
            <line x1="100" y1="100" x2="50" y2="50" stroke="#C9A84C" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.3" />
          </svg>
        </div>

        {/* ── THE TOP FLAP (Animates Open) ── */}
        <div className={flapClass}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.flapLinesSvg}>
            <polygon points="0,0 100,0 50,50" fill="#150C03" />
            <polygon points="0,0 100,0 50,50" fill="url(#flapGradient)" opacity="0.4" />
            
            <defs>
              <linearGradient id="flapGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#251508" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
            </defs>

            <line x1="0" y1="0" x2="50" y2="50" stroke="#C9A84C" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.35" />
            <line x1="100" y1="0" x2="50" y2="50" stroke="#C9A84C" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.35" />
          </svg>
        </div>

        {/* ── DUAL-TONE GOLD & WHITE SEAL ── */}
        <div className={sealClass} onClick={handleClick}>
          <svg className={styles.sealSvg} viewBox="0 0 120 120">
            <defs>
              <linearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8D5A3" />
                <stop offset="40%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
            </defs>

            {/* Outer Gold Rim */}
            <circle cx="60" cy="60" r="54" fill="url(#sealGold)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.7))" />
            
            {/* Inner White/Ivory Plate */}
            <circle cx="60" cy="60" r="45" fill="#FDFBF7" />

            {/* Delicate ring accents */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="#FDFBF7" strokeWidth="0.5" opacity="0.5" />
            <circle cx="60" cy="60" r="42" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.7" />

            {/* Subtle Geometric Star within the white center */}
            <g stroke="#8B6914" strokeWidth="0.5" fill="none" opacity="0.3">
              <rect x="33" y="33" width="54" height="54" transform="rotate(0 60 60)" />
              <rect x="33" y="33" width="54" height="54" transform="rotate(45 60 60)" />
            </g>

            {/* Arabic Nikkah text */}
            <text x="60" y="44" fontFamily="'Amiri', 'Traditional Arabic', serif" fontSize="11" fill="#8B6914" textAnchor="middle">نِكَاح</text>

            {/* Modern Stacked Monogram */}
            <text x="60" y="63" fontFamily="'Cinzel', serif" fontSize="21" fill="#8B6914" textAnchor="middle" letterSpacing="1">O</text>
            
            {/* Center Diamond Divider */}
            <polygon points="60,69 62,71 60,73 58,71" fill="#8B6914" opacity="0.8" />
            
            <text x="60" y="85" fontFamily="'Cinzel', serif" fontSize="21" fill="#8B6914" textAnchor="middle" letterSpacing="1">H</text>
          </svg>
        </div>

      </div>{/* /envOuter */}

      {/* Click hint */}
      {!opening && (
        <div className={styles.hintWrap}>
          <div className={styles.hintLine} />
          <p className={styles.hint}>Touch to reveal your invitation</p>
          <div className={styles.hintLine} />
        </div>
      )}

    </div>
  )
}

export default EnvelopeIntro