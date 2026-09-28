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
  const canvasRef = useRef(null)

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

    // Step 1: flap opens (0.5s delay + 1.4s duration = done at ~1.9s)
    // Step 2: card rises at 1.6s, takes 1.2s = done at ~2.8s
    setTimeout(() => setCardUp(true), 1600)

    // Step 3: overlay fades at 3.4s
    setTimeout(() => setHiding(true), 3400)

    // Step 4: tell parent at 4.0s (after fade)
    onOpen() // App.jsx waits its own 3.2s internally
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

      {/* THE ENVELOPE */}
      <div className={styles.envOuter} onClick={handleClick}>
        <div className={styles.perspective}>
          <div className={styles.envelope}>

            {/* ── Back of envelope (visible behind card) ── */}
            <div className={styles.envBack} />

            {/* ── Invitation card (sits inside, rises out) ── */}
            <div className={cardClass}>
              {/* Card inner border */}
              <div className={styles.cardInner}>
                <div className={styles.cardTopLine} />

                <p className={styles.cardEyebrow}>Together with their families</p>

                {/* Monogram on card */}
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

            {/* ── Envelope body ── */}
            <div className={styles.envBody}>

              {/* Side folds (left & right triangles) */}
              <div className={styles.foldLeft} />
              <div className={styles.foldRight} />
              {/* Bottom fold */}
              <div className={styles.foldBottom} />

              {/* Lining pattern — subtle inner diamond grid */}
              <svg className={styles.lining} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="diamond" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.6"/>
                  </pattern>
                </defs>
                <rect width="400" height="260" fill="url(#diamond)" />
              </svg>

              {/* Decorative border lines */}
              <div className={styles.envBorderOuter} />
              <div className={styles.envBorderInner} />

              {/* Corner ornaments on envelope face */}
              <svg className={`${styles.cornerOrn} ${styles.cornTL}`} viewBox="0 0 60 60" fill="none">
                <path d="M4 4 L4 28 Q4 36 12 36" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <path d="M4 4 L28 4 Q36 4 36 12" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <circle cx="4" cy="4" r="2" fill="#C9A84C" opacity="0.5"/>
              </svg>
              <svg className={`${styles.cornerOrn} ${styles.cornTR}`} viewBox="0 0 60 60" fill="none">
                <path d="M4 4 L4 28 Q4 36 12 36" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <path d="M4 4 L28 4 Q36 4 36 12" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <circle cx="4" cy="4" r="2" fill="#C9A84C" opacity="0.5"/>
              </svg>
              <svg className={`${styles.cornerOrn} ${styles.cornBL}`} viewBox="0 0 60 60" fill="none">
                <path d="M4 4 L4 28 Q4 36 12 36" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <path d="M4 4 L28 4 Q36 4 36 12" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <circle cx="4" cy="4" r="2" fill="#C9A84C" opacity="0.5"/>
              </svg>
              <svg className={`${styles.cornerOrn} ${styles.cornBR}`} viewBox="0 0 60 60" fill="none">
                <path d="M4 4 L4 28 Q4 36 12 36" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <path d="M4 4 L28 4 Q36 4 36 12" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
                <circle cx="4" cy="4" r="2" fill="#C9A84C" opacity="0.5"/>
              </svg>

            </div>

            {/* ── THE FLAP ── */}
            <div className={flapClass}>
              <svg viewBox="0 0 400 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flap face */}
                <polygon points="0,0 400,0 200,175" fill="#1C1004"/>
                {/* Flap lining (slightly lighter — the inner face seen when open) */}
                <polygon points="0,0 400,0 200,175" fill="#251508" opacity="0"/>
                {/* Outer fold edge */}
                <polyline points="0,0 200,175 400,0" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.45"/>
                {/* Inner fold edge */}
                <polyline points="14,0 200,161 386,0" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.2"/>
                {/* Diamond pattern on flap */}
                <defs>
                  <pattern id="flapDiamond" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5"/>
                  </pattern>
                  <clipPath id="flapClip">
                    <polygon points="0,0 400,0 200,175"/>
                  </clipPath>
                </defs>
                <rect width="400" height="200" fill="url(#flapDiamond)" clipPath="url(#flapClip)"/>
              </svg>
            </div>

            {/* ── MONOGRAM SEAL ── */}
            <div className={sealClass}>
              <svg className={styles.sealSvg} viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="monoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#F5EDD5"/>
                    <stop offset="40%"  stopColor="#C9A84C"/>
                    <stop offset="100%" stopColor="#8B6914"/>
                  </linearGradient>
                  <linearGradient id="lineGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="transparent"/>
                    <stop offset="50%"  stopColor="#C9A84C"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </linearGradient>
                  <filter id="monoGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Left decorative line */}
                <line x1="4" y1="40" x2="34" y2="40" stroke="url(#lineGold)" strokeWidth="0.8"/>
                {/* Left tiny diamond */}
                <polygon points="36,40 39,37 42,40 39,43" fill="#C9A84C" opacity="0.7"/>

                {/* The O */}
                <text
                  x="58" y="52"
                  textAnchor="middle"
                  fontFamily="Cinzel, serif"
                  fontSize="38"
                  fontWeight="400"
                  fill="url(#monoGold)"
                  filter="url(#monoGlow)"
                  letterSpacing="-1"
                >O</text>

                {/* Thin vertical divider between letters */}
                <line x1="80" y1="18" x2="80" y2="62" stroke="#C9A84C" strokeWidth="0.6" opacity="0.4"/>

                {/* The H */}
                <text
                  x="102" y="52"
                  textAnchor="middle"
                  fontFamily="Cinzel, serif"
                  fontSize="38"
                  fontWeight="400"
                  fill="url(#monoGold)"
                  filter="url(#monoGlow)"
                  letterSpacing="-1"
                >H</text>

                {/* Right tiny diamond */}
                <polygon points="118,40 121,37 124,40 121,43" fill="#C9A84C" opacity="0.7"/>
                {/* Right decorative line */}
                <line x1="126" y1="40" x2="156" y2="40" stroke="url(#lineGold)" strokeWidth="0.8"/>

                {/* Tagline beneath */}
                <text
                  x="80" y="72"
                  textAnchor="middle"
                  fontFamily="Cinzel, serif"
                  fontSize="5"
                  fill="#C9A84C"
                  letterSpacing="4"
                  opacity="0.6"
                >FOREVER BEGINS</text>
              </svg>
            </div>

          </div>{/* /envelope */}
        </div>{/* /perspective */}
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
