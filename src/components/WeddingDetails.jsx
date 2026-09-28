// WeddingDetails.jsx
//
// Great example of the DATA → MAP → JSX pattern.
// All the card content lives in an array of objects.
// One DetailCard component renders any card passed to it via props.

import useReveal from '../hooks/useReveal'
import styles from './WeddingDetails.module.css'

// ── Icon components ────────────────────────────────────────────
// Tiny SVG icon components. They accept no props — they just return SVG markup.
// Storing them as components makes the data array below clean and readable.

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#C9A84C" strokeWidth="1.5"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8"  y1="2" x2="8"  y2="6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3"  y1="10" x2="21" y2="10" stroke="#C9A84C" strokeWidth="1.5"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.5"/>
    <polyline points="12 7 12 12 15 15" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#C9A84C" strokeWidth="1.5"/>
    <circle cx="12" cy="9" r="2.5" stroke="#C9A84C" strokeWidth="1.5"/>
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

// ── Card data ──────────────────────────────────────────────────
// Each object has: an Icon (component), label, primary text, secondary text.
// Notice how we can store a React component IN a JavaScript object.
// When we render {card.Icon}, JSX knows to call it as a component: <CalendarIcon />.
const cards = [
  { Icon: CalendarIcon, label: 'Date',      primary: '[29th October, 2026]', secondary: 'Thursday' },
  { Icon: ClockIcon,    label: 'Time',      primary: '12:00 Noon',        secondary: 'Reception follows' },
  { Icon: LocationIcon, label: 'Venue', primary: 'OTM Central Mosque', secondary: 'Iwo Road, Ibadan' },
  { Icon: HeartIcon,    label: 'Dress Code', primary: 'White & Gold',     secondary: '' },
]

// ── DetailCard sub-component ───────────────────────────────────
// Destructure all four props directly from the parameter.
function DetailCard({ Icon, label, primary, secondary }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Icon />
        {/* <Icon /> renders whatever icon component was passed in.
            Since Icon is a component reference, JSX treats it as a component. */}
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.primary}>{primary}</p>
      <p className={styles.secondary}>{secondary}</p>
    </div>
  )
}

function WeddingDetails() {
  const sectionRef = useReveal()

  return (
    <section id="details" className={styles.section} ref={sectionRef}>
      {/*
        id="details" — this is the anchor target for the "View Details" button.
        When the button calls scrollIntoView, it finds this element by its id.
        In React, id works exactly like in HTML.
      */}
      <div className="section-inner">
        <div className="reveal">
          <p className={styles.label2}>The Celebration</p>
          <h2 className={styles.title}>Nikkah <em>Details</em></h2>
          <div className="ornament" style={{ margin: '1.5rem 0' }}>
            {/*
              Inline styles in JSX use a JavaScript OBJECT, not a CSS string.
              HTML:  style="margin: 1.5rem 0"
              JSX:   style={{ margin: '1.5rem 0' }}
              The outer {} is "I'm writing JavaScript".
              The inner {} is the object literal.
              Property names are camelCase: backgroundColor, not background-color.
            */}
            <span style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }}></span>
            <svg viewBox="0 0 24 24" style={{ fill: 'var(--gold)', opacity: 0.7, width: 20, height: 20 }}>
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            <span style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }}></span>
          </div>
        </div>

        <div className={`${styles.grid} reveal`}>
          {cards.map((card, index) => (
            <DetailCard
              key={index}
              Icon={card.Icon}
              label={card.label}
              primary={card.primary}
              secondary={card.secondary}
            />
            // Or even shorter using the spread operator:
            // <DetailCard key={index} {...card} />
            // "...card" spreads all of card's properties as individual props.
          ))}
        </div>

      </div>
    </section>
  )
}

export default WeddingDetails
