// EnvelopeIntro.jsx
//
// ┌─────────────────────────────────────────────────────────────┐
// │  WHAT ARE PROPS?                                            │
// │                                                             │
// │  Props (short for "properties") are how a parent component  │
// │  passes data or functions DOWN to a child component.        │
// │                                                             │
// │  In App.jsx we wrote:  <EnvelopeIntro onOpen={handleEnvelopeOpen} />    │
// │  Here we receive it:   function EnvelopeIntro({ onOpen })  │
// │                                                             │
// │  Props flow ONE way: parent → child. A child cannot directly│
// │  change a parent's state — it can only call a function the  │
// │  parent passed it. That's what onOpen is.                   │
// └─────────────────────────────────────────────────────────────┘

import { useState } from 'react'
import styles from './EnvelopeIntro.module.css'
// ↑ CSS Modules — a way to write CSS where class names are
//   automatically scoped to THIS component only.
//   No risk of one component's CSS accidentally breaking another's.
//   We use styles.className instead of just "className".

// Destructure the onOpen prop directly in the function parameters.
// It's the same as: function EnvelopeIntro(props) { const onOpen = props.onOpen }
function EnvelopeIntro({ onOpen }) {

  // Local state: has the user clicked to open the envelope?
  // This state lives INSIDE this component — App doesn't need to know about it.
  // Only when the animation finishes do we tell App via onOpen().
  const [opening, setOpening] = useState(false)

  const handleClick = () => {
    // Guard: if already opening, ignore extra clicks
    if (opening) return

    // Update state → React re-renders → CSS classes change → animation plays
    setOpening(true)

    // After the animation sequence completes, tell the parent (App)
    // via the onOpen prop function. This will cause App to set
    // envelopeOpened = true and hide this overlay.
    onOpen()
  }

  // We build class strings conditionally:
  // If opening is true, we add the animation class; otherwise empty string.
  const overlayClass  = `${styles.overlay} ${opening ? styles.hide : ''}`
  const flapClass     = `${styles.envFlap}  ${opening ? styles.opening : ''}`
  const cardClass     = `${styles.envCard}  ${opening ? styles.rising : ''}`
  const sealClass     = `${styles.envSeal}  ${opening ? styles.hidden : ''}`

  return (
    // The full-screen overlay that sits on top of everything
    <div className={overlayClass}>

      {/* The clickable envelope wrapper */}
      <div className={styles.envWrap} onClick={handleClick}>

        {/* perspective div enables the 3D rotation effect on the flap */}
        <div className={styles.envPerspective}>
          <div className={styles.envBody}>

            {/* The envelope's bottom fold — made with CSS borders (triangle trick) */}
            <div className={styles.envBottom}>
              <div className={styles.envLeft}></div>
              <div className={styles.envRight}></div>
            </div>

            {/* The small card visible inside the envelope before it rises */}
            <div className={cardClass}>
              <p className={styles.envCardText}>You are cordially invited to the wedding celebration of</p>
              <p className={styles.envCardNames}>Opeyemi &amp; Hammed</p>
              {/*
                &amp; is an HTML entity for the & character.
                In JSX you must use entities for special characters,
                or just write them as JavaScript strings: {'&'}
              */}
            </div>

            {/* The triangular flap that opens */}
            <div className={flapClass}>
              <div className={styles.envFlapShape}>
                {/* Inline SVG — the triangular flap shape */}
                <svg viewBox="0 0 340 130" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="0,0 340,0 170,115" fill="#261808"/>
                  <polyline points="0,0 170,115 340,0" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5"/>
                  <polyline points="12,0 170,103 328,0" fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity="0.25"/>
                  {/*
                    Notice: in JSX, HTML attributes that have dashes become camelCase.
                    HTML:  stroke-width="0.8"
                    JSX:   strokeWidth="0.8"
                    This is because JSX is actually JavaScript, and dashes aren't
                    valid in JS property names.
                  */}
                </svg>
              </div>
            </div>

            {/* The gold wax seal */}
            <div className={sealClass}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>

          </div>
        </div>
      </div>

      {/* Pulsing "Click to open" hint below the envelope */}
      {/*
        CONDITIONAL RENDERING with ternary operator:
        condition ? "show this if true" : "show this if false"
        When opening starts, hide the hint immediately.
      */}
      {!opening && (
        <p className={styles.envHint}>Click to open</p>
      )}

    </div>
  )
}

export default EnvelopeIntro
