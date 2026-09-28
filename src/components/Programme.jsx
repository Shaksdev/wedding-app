// Programme.jsx — another data → .map() → JSX example
import useReveal from '../hooks/useReveal'
import styles from './Programme.module.css'

// The timeline data. Each event has a time, label, and which "side" it appears on.
// Storing data separately from JSX is a React best practice —
// it makes content changes trivial (no touching JSX).
const events = [
  { time: '10:00 AM', label: 'Arrival of Guests',       side: 'left'  },
  { time: '10:00 AM', label: 'Introduction Ceremony',         side: 'right' },
  { time: '12:00 PM', label: 'Aqd Nikkah',  side: 'left'  },
  { time: '2:00 PM', label: 'Photography & Reception',       side: 'right' },
  
]

function TimelineItem({ time, label, side }) {
  // The zigzag layout: "left" items have content on the left, blank on right; vice versa.
  const isLeft = side === 'left'
  return (
    <div className={styles.timelineRow}>
      {/* Left column: show content if isLeft, otherwise empty */}
      <div className={`${styles.col} ${styles.colLeft}`}>
        {isLeft && (
          <>
            {/*
              <> </> is a React Fragment — a wrapper with NO DOM output.
              Use it when you need to return multiple elements
              but don't want an extra <div> in the HTML.
            */}
            <p className={styles.time}>{time}</p>
            <p className={styles.eventLabel}>{label}</p>
          </>
        )}
      </div>

      {/* Centre diamond marker */}
      <div className={styles.diamond}></div>

      {/* Right column: show content if NOT left (i.e. right) */}
      <div className={`${styles.col} ${styles.colRight}`}>
        {!isLeft && (
          <>
            <p className={styles.time}>{time}</p>
            <p className={styles.eventLabel}>{label}</p>
          </>
        )}
      </div>
    </div>
  )
}

function Programme() {
  const sectionRef = useReveal()

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Programme</p>
          <h2 className="section-title">Order of <em>Events</em></h2>
        </div>

        <div className={`${styles.timeline} reveal`}>
          {/* The vertical centre line */}
          <div className={styles.timelineLine}></div>

          {events.map((event, index) => (
            <TimelineItem
              key={index}
              time={event.time}
              label={event.label}
              side={event.side}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programme
