import { useState, useEffect } from 'react'
import styles from './Countdown.module.css'

const WEDDING_DATE = import.meta.env.VITE_WEDDING_DATE

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null)
  const [married,  setMarried]  = useState(false)

  useEffect(() => {
    const target = new Date(`${WEDDING_DATE}T12:00:00`)

    const tick = () => {
      const now  = new Date()
      const diff = target - now

      if (diff <= 0) {
        setMarried(true)
        setTimeLeft(null)
        return
      }

      const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  if (married) {
    return (
      <div className={styles.wrap}>
        <p className={styles.marriedText}>We are married!</p>
        <p className={styles.marriedSub}>29 · 10 · 2026</p>
      </div>
    )
  }

  if (!timeLeft) return null

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>The Celebration Begins In</p>
      <div className={styles.ticker}>
        <div className={styles.unit}>
          <span className={styles.number}>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className={styles.unitLabel}>Days</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.unit}>
          <span className={styles.number}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className={styles.unitLabel}>Hours</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.unit}>
          <span className={styles.number}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className={styles.unitLabel}>Minutes</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.unit}>
          <span className={styles.number}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className={styles.unitLabel}>Seconds</span>
        </div>
      </div>
    </div>
  )
}

export default Countdown