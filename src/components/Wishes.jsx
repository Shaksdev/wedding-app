// Wishes.jsx
//
// ┌─────────────────────────────────────────────────────────────┐
// │  THIS IS THE MOST INSTRUCTIVE COMPONENT IN THE PROJECT      │
// │                                                             │
// │  It demonstrates:                                           │
// │  1. CONTROLLED INPUTS — React owns the form field values    │
// │  2. MULTIPLE STATE VALUES — three separate useState calls   │
// │  3. EVENT HANDLERS — onChange and onSubmit                  │
// │  4. CONDITIONAL RENDERING — showing/hiding the confirm msg  │
// │  5. ARRAY STATE — adding to a list and re-rendering it      │
// └─────────────────────────────────────────────────────────────┘

import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import styles from './Wishes.module.css'

// ── WishCard: renders one submitted message ────────────────────
function WishCard({ name, relation, message }) {
  return (
    <div className={styles.wishCard}>
      <p className={styles.wishQuote}>{message}</p>
      <p className={styles.wishFrom}>
        {name}{relation ? ` · ${relation}` : ''}
        {/*
          Conditional rendering with ternary in JSX:
          If relation is not empty, render " · relation", else render nothing ('').
          The backtick template literal builds the string dynamically.
        */}
      </p>
    </div>
  )
}

function Wishes() {
  const sectionRef = useReveal()

  // ── CONTROLLED FORM STATE ─────────────────────────────────────
  // In React, form inputs are "controlled" — React holds the value
  // in state and the input displays whatever React says.
  //
  // Why controlled inputs?
  // - You always know the current value (it's in state, not the DOM).
  // - You can validate, transform, or reset values easily.
  // - React and the DOM stay in sync.
  //
  // The pattern:
  //   value={stateName}           ← input displays this state value
  //   onChange={e => setStateName(e.target.value)}  ← updates state on every keystroke
  //
  // e is the event object (the browser's event).
  // e.target is the input element.
  // e.target.value is what the user typed.
  const [name,     setName]     = useState('')
  const [relation, setRelation] = useState('')
  const [message,  setMessage]  = useState('')

  // ── WISHES LIST STATE ─────────────────────────────────────────
  // An array of wish objects: [{ name, relation, message }, ...]
  // Initially empty — no one has submitted yet.
  const [wishes, setWishes] = useState([])

  // ── CONFIRMATION MESSAGE STATE ────────────────────────────────
  // A boolean: show the "thank you" message after submitting?
  const [showConfirm, setShowConfirm] = useState(false)

  // ── FORM SUBMIT HANDLER ───────────────────────────────────────
  // Called when the form's submit button is clicked.
  const handleSubmit = (e) => {
    // e.preventDefault() stops the browser from reloading the page.
    // By default, submitting a form causes a full page reload.
    // React forms always need this.
    e.preventDefault()

    // Basic validation — don't submit if name or message is empty
    if (!name.trim() || !message.trim()) return

    // Create the new wish object
    const newWish = { name: name.trim(), relation: relation.trim(), message: message.trim() }

    // Update the wishes array state.
    // IMPORTANT: Never mutate state directly! Don't do: wishes.push(newWish)
    // Instead, create a NEW array with the spread operator:
    // [...wishes] copies all existing wishes, newWish adds the new one at the end.
    // React compares old and new state — if it's the same object, it won't re-render.
    // Spreading creates a new array reference, so React detects the change.
    setWishes([...wishes, newWish])

    // Reset form fields back to empty strings
    setName('')
    setRelation('')
    setMessage('')

    // Show the thank-you message
    setShowConfirm(true)

    // Hide it again after 4 seconds using a timer
    // setTimeout is a browser API — runs a function after a delay (ms)
    setTimeout(() => setShowConfirm(false), 4000)
  }

  return (
    <section id="wishes" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        <div className="reveal">
          <p className={styles.label}>Blessings &amp; Wishes</p>
          <h2 className={styles.title}>Leave a <em>Message</em></h2>
          <p className={styles.subtitle}>Share your love and well wishes for the happy couple</p>
        </div>

        {/* ── THE FORM ── */}
        {/*
          onSubmit={handleSubmit} attaches our handler to the form's submit event.
          Note: we pass the FUNCTION REFERENCE handleSubmit, not a call handleSubmit().
          onSubmit={handleSubmit}    ✓ correct — passes the function
          onSubmit={handleSubmit()}  ✗ wrong — calls it immediately on render
        */}
        <form className={`${styles.form} reveal`} onSubmit={handleSubmit}>

          <div className={styles.formRow}>
            <div className={styles.group}>
              <label>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Aunty Funke"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                // value= makes this a controlled input.
                // onChange= keeps state in sync with every keystroke.
                // required= is native HTML validation.
              />
            </div>
            <div className={styles.group}>
              <label>Your Relation</label>
              <input
                type="text"
                placeholder="e.g. Friend of the bride"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.group}>
            <label>Your Message</label>
            <textarea
              placeholder="Write your heartfelt wishes for Opeyemi & Hammed..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Your Wishes ✦
          </button>

          {/*
            Conditional rendering with &&:
            Only render the confirm paragraph if showConfirm is true.
          */}
          {showConfirm && (
            <p className={styles.confirm}>
              ✦ Your blessing has been received. Thank you for your love! ✦
            </p>
          )}
        </form>

        {/* ── WISHES BOARD ── */}
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
          {/*
            Conditional rendering using ternary:
            If no wishes yet, show the placeholder.
            Otherwise, render all the wish cards.

            [...wishes].reverse() creates a reversed COPY (newest first).
            We copy with [...] before reversing because .reverse() mutates
            the original array — we never want to mutate state directly.
          */}
          {wishes.length === 0 ? (
            <p className={styles.empty}>
              Be the first to leave a message for the happy couple ✦
            </p>
          ) : (
            [...wishes].reverse().map((wish, index) => (
              <WishCard
                key={index}
                name={wish.name}
                relation={wish.relation}
                message={wish.message}
              />
            ))
          )}
        </div>

      </div>
    </section>
  )
}

export default Wishes
