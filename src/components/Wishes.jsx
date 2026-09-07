// Wishes.jsx
// Changes from previous version:
//   - Removed "relation" field
//   - Added "Send Anonymously" toggle checkbox
//   - Added Donation section below the wishes board

import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import styles from './Wishes.module.css'

// ── WishCard ───────────────────────────────────────────────────
function WishCard({ name, message, anonymous }) {
  return (
    <div className={styles.wishCard}>
      <p className={styles.wishQuote}>{message}</p>
      <p className={styles.wishFrom}>
        {anonymous ? 'Anonymous' : name}
      </p>
    </div>
  )
}

// ── DonationCard ───────────────────────────────────────────────
function DonationCard({ icon, title, detail, sub, note }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(detail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.donationCard}>
      <div className={styles.donationIcon}>{icon}</div>
      <p className={styles.donationTitle}>{title}</p>
      <p className={styles.donationDetail}>{detail}</p>
      {sub  && <p className={styles.donationSub}>{sub}</p>}
      {note && <p className={styles.donationNote}>{note}</p>}
      <button className={styles.copyBtn} onClick={handleCopy}>
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}

// ── Main Wishes component ──────────────────────────────────────
function Wishes() {
  const sectionRef = useReveal()

  const [name,      setName]      = useState('')
  const [message,   setMessage]   = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [wishes,      setWishes]      = useState([])
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    if (!anonymous && !name.trim()) return

    const newWish = {
      name:      anonymous ? '' : name.trim(),
      message:   message.trim(),
      anonymous,
    }

    setWishes([...wishes, newWish])
    setName('')
    setMessage('')
    setAnonymous(false)
    setShowConfirm(true)
    setTimeout(() => setShowConfirm(false), 4000)
  }

  return (
    <section id="wishes" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        <div className="reveal">
          <p className={styles.label}>Blessings &amp; Wishes</p>
          <h2 className={styles.title}>Leave a <em>Message</em></h2>
          <p className={styles.subtitle}>
            Share your love and well wishes for the happy couple
          </p>
        </div>

        <form className={`${styles.form} reveal`} onSubmit={handleSubmit}>

          {!anonymous && (
            <div className={styles.group}>
              <label>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Aunty Funke"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!anonymous}
              />
            </div>
          )}

          <div className={styles.group}>
            <label>Your Message</label>
            <textarea
              placeholder="Write your heartfelt wishes for Opeyemi & Hammed..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <label className={styles.anonToggle}>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <span className={styles.anonBox}>
              {anonymous && <span className={styles.anonCheck}>✦</span>}
            </span>
            <span className={styles.anonLabel}>Send anonymously</span>
          </label>

          <button type="submit" className={styles.submitBtn}>
            Send Your Wishes ✦
          </button>

          {showConfirm && (
            <p className={styles.confirm}>
              ✦ Your blessing has been received. Thank you for your love! ✦
            </p>
          )}
        </form>

        <div className="reveal" style={{ marginTop: '3rem' }}>
          <div className="ornament">
            <span style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)' }}></span>
            <svg viewBox="0 0 24 24" style={{ fill: 'var(--gold)', opacity: 0.6, width: 16, height: 16 }}>
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            <span style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)' }}></span>
          </div>
          <p className={styles.boardLabel}>Messages from loved ones</p>
        </div>

        <div className={styles.board}>
          {wishes.length === 0 ? (
            <p className={styles.empty}>
              Be the first to leave a message for the happy couple ✦
            </p>
          ) : (
            [...wishes].reverse().map((wish, index) => (
              <WishCard
                key={index}
                name={wish.name}
                message={wish.message}
                anonymous={wish.anonymous}
              />
            ))
          )}
        </div>

        {/* ── DONATION SECTION ── */}
        {/* <div className={`${styles.donationSection} reveal`}>

          <div className={styles.donationDivider}>
            <span />
            <div className={styles.donationDividerIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="8" width="18" height="13" rx="1" stroke="#C9A84C" strokeWidth="1.2"/>
                <path d="M3 12h18" stroke="#C9A84C" strokeWidth="1.2"/>
                <path d="M12 8V21" stroke="#C9A84C" strokeWidth="1.2"/>
                <path d="M12 8C12 8 9 5 7 5C5.5 5 5 6 5 7C5 8.5 6.5 8 12 8Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M12 8C12 8 15 5 17 5C18.5 5 19 6 19 7C19 8.5 17.5 8 12 8Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span />
          </div>

          <p className={styles.donationLabel}>Gift the Couple</p>
          <h3 className={styles.donationTitle2}>A <em>Gift of Love</em></h3>
          <p className={styles.donationSubtitle}>
            Your presence is our greatest gift. However, if you wish to bless us further,
            you may do so anonymously through any of the options below.
          </p>

          <div className={styles.donationGrid}>
            <DonationCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="#C9A84C" strokeWidth="1.3"/>
                  <path d="M2 10h20" stroke="#C9A84C" strokeWidth="1.3"/>
                  <rect x="5" y="14" width="4" height="2" rx="0.5" fill="#C9A84C" opacity="0.6"/>
                </svg>
              }
              title="Bank Transfer"
              detail="1234567890"
              sub="GTBank · Opeyemi Adeoje"
              note="Anonymous — no need to identify yourself"
            />
            <DonationCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                  <circle cx="12" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.3"/>
                  <path d="M12 7v5l3 3" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              }
              title="Opay"
              detail="08012345678"
              sub="Opeyemi Adeoje"
              note="Send any amount — no name required"
            />
            <DonationCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#C9A84C" strokeWidth="1.3" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="#C9A84C" strokeWidth="1.3" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="#C9A84C" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
              }
              title="Palmpay / Kuda"
              detail="08012345678"
              sub="Hammed Adeola"
              note="All gifts are received with gratitude"
            />
          </div>

          <p className={styles.donationFootnote}>
            ✦ All donations are entirely optional and anonymous ✦
          </p>
        </div> */}

      </div>
    </section>
  )
}

export default Wishes