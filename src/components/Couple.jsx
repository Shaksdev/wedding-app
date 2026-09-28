// Couple.jsx
import useReveal from '../hooks/useReveal'
import styles from './Couple.module.css'

const coupleData = [
  { name: 'Opeyemi Jelilah', role: 'The Bride',  initial: 'O' },
  { name: 'Olakunle Hammed',  role: 'The Groom',  initial: 'H' },
]

function PortraitCard({ name, role, initial }) {
  return (
    <div className={`${styles.portraitCard} reveal`}>
      <div className={styles.portraitFrame}>
        <span className={styles.portraitInitial}>{initial}</span>
      </div>
      <p className={styles.portraitName}>{name}</p>
      <p className={styles.portraitRole}>{role}</p>
    </div>
  )
}

function Couple() {
  const sectionRef = useReveal()

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">The Couple</p>
          <h2 className="section-title">Two hearts, <em>one journey</em></h2>
        </div>

        <div className={styles.portraitsWrapper}>
          <PortraitCard {...coupleData[0]} />
          <div className={`${styles.portraitsAnd} reveal`}>&amp;</div>
          <PortraitCard {...coupleData[1]} />
        </div>
      </div>
    </section>
  )
}

export default Couple
