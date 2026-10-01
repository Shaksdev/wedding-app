import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'
import useReveal from '../hooks/useReveal'
import styles from './Wishes.module.css'

const SERVICE_ID       = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_COUPLE  = import.meta.env.VITE_EMAILJS_TEMPLATE_COUPLE
const TEMPLATE_GUEST   = import.meta.env.VITE_EMAILJS_TEMPLATE_GUEST
const PUBLIC_KEY       = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// import.meta.env is how Vite reads .env variables.
// VITE_ prefix is required — Vite ignores variables without it for security.

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

function Wishes() {
  const sectionRef = useReveal()

  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [message,     setMessage]     = useState('')
  const [anonymous,   setAnonymous]   = useState(false)
  const [wishes,      setWishes]      = useState([])
  const [loading,     setLoading]     = useState(true)
  const [submitting,  setSubmitting]  = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error,       setError]       = useState('')

  // Initialise EmailJS once when the component mounts
  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY)
  }, [])

  // Real-time Firestore listener
  useEffect(() => {
    if (!db) {
      setError('Wishes are not connected yet. Please configure Firebase to enable them.')
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'wishes'),
      orderBy('timestamp', 'asc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setWishes(fetched)
      setLoading(false)
    }, (err) => {
      console.error('Firestore error:', err)
      setError('Could not load messages. Please refresh.')
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    if (!anonymous && !name.trim()) return
    if (!db) {
      setError('Wishes cannot be sent until Firebase is configured.')
      return
    }
    if (!SERVICE_ID || !TEMPLATE_COUPLE || !PUBLIC_KEY) {
      setError('Wishes cannot be emailed until EmailJS is configured.')
      return
    }
    if (!anonymous && email.trim() && !TEMPLATE_GUEST) {
      setError('Guest confirmation email is not configured yet.')
      return
    }

    setSubmitting(true)
    setError('')

    const displayName = anonymous ? 'Anonymous' : name.trim()

    try {
      // Step 1 — Save to Firestore
      await addDoc(collection(db, 'wishes'), {
        name:      displayName,
        email:     anonymous ? '' : email.trim(),
        message:   message.trim(),
        anonymous,
        timestamp: serverTimestamp()
      })

      // Step 2 — Email the couple (Template 1)
      // The variable names here must match exactly what you used
      // in your EmailJS template: {{name}}, {{message}}, {{email}}
      await emailjs.send(SERVICE_ID, TEMPLATE_COUPLE, {
        name:    displayName,
        message: message.trim(),
        email:   anonymous ? 'Anonymous (no email)' : email.trim(),
      })

      // Step 3 — Email the guest confirmation (Template 2)
      // Only send if the guest provided their email and is not anonymous
      if (!anonymous && email.trim()) {
        await emailjs.send(SERVICE_ID, TEMPLATE_GUEST, {
          name:         displayName,
          message:      message.trim(),
          guest_email:  email.trim(),
        })
      }

      // Reset form
      setName('')
      setEmail('')
      setMessage('')
      setAnonymous(false)
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 5000)

    } catch (err) {
      console.error('Submission error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
            <>
              <div className={styles.group}>
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aunty Ashabi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!anonymous}
                  disabled={submitting}
                />
              </div>
              <div className={styles.group}>
                <label>
                  Your Email
                  <span className={styles.optionalTag}> (optional — for confirmation)</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>
            </>
          )}

          <div className={styles.group}>
            <label>Your Message</label>
            <textarea
              placeholder="Write your heartfelt wishes for Opeyemi &amp; Hammed..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <label className={styles.anonToggle}>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              disabled={submitting}
            />
            <span className={styles.anonBox}>
              {anonymous && <span className={styles.anonCheck}>&#10022;</span>}
            </span>
            <span className={styles.anonLabel}>Send anonymously</span>
          </label>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send Your Wishes '}
          </button>

          {showConfirm && (
            <p className={styles.confirm}>
              &#10022; Your blessing has been received. Thank you for your love! &#10022;
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
          {loading ? (
            <p className={styles.empty}>Loading messages...</p>
          ) : wishes.length === 0 ? (
            <p className={styles.empty}>
              Be the first to leave a message for the happy couple &#10022;
            </p>
          ) : (
            [...wishes].reverse().map((wish) => (
              <WishCard
                key={wish.id}
                name={wish.name}
                message={wish.message}
                anonymous={wish.anonymous}
              />
            ))
          )}
        </div>

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
            Your presence is our greatest gift. However, if you wish to celebrate
            us further, you may send a gift anonymously. No account or name required.
          </p>

          <div className={styles.paystackBox}>
            <div className={styles.psCornerTL} />
            <div className={styles.psCornerTR} />
            <div className={styles.psCornerBL} />
            <div className={styles.psCornerBR} />
            <div className={styles.psLogo}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
                <text x="20" y="27" textAnchor="middle" fontFamily="Cinzel, serif"
                  fontSize="18" fontWeight="600" fill="#C9A84C">P</text>
              </svg>
            </div>
            <p className={styles.psProvider}>Secured by Paystack</p>
            <p className={styles.psAmount}>Enter any amount you wish</p>
            <p className={styles.psNote}>
              You will be taken to a secure Paystack page. No login needed.
              Pay with card, bank transfer, or USSD. Completely anonymous.
            </p>
            <a
              href="https://paystack.com/pay/your-payment-link"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.psButton}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor" opacity="0.9"/>
              </svg>
              Send a Gift
            </a>
            <div className={styles.psTrust}>
              <span>SSL Secured</span>
              <span>|</span>
              <span>Card / Bank / USSD</span>
              <span>|</span>
              <span>Instant</span>
            </div>
          </div>

          <p className={styles.donationFootnote}>
            All gifts are entirely optional and received with gratitude
          </p>
        </div> */}

      </div>
    </section>
  )
}

export default Wishes