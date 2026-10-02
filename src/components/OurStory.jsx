// OurStory.jsx
// A purely presentational component — it receives no props and manages no state.
// It just renders HTML structure with styling. These are the simplest kind of components.

import useReveal from '../hooks/useReveal'
// ↑ "../" means "go up one folder level" (from components/ to src/).
//   Then "/hooks/useReveal" navigates into the hooks folder.

import styles from './OurStory.module.css'

function OurStory() {
  // Call our custom hook. It returns a ref we attach to the section.
  // The hook sets up IntersectionObserver on all .reveal children inside.
  const sectionRef = useReveal()

  return (
    // We attach sectionRef to this element via the "ref" prop.
    // Now containerRef.current inside useReveal points to this <section>.
    <section className={styles.section} ref={sectionRef}>
      <div className="section-inner">

        {/* reveal class + global CSS makes this fade in on scroll */}
        <div className="reveal">
          <p className="section-label">Our Love Story</p>
          {/* <h2 className="section-title">
            A love <em>written in the stars</em>
          </h2> */}

          {/* Ornamental gold divider */}
          <div className="ornament">
            <span></span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            <span></span>
          </div>
        </div>

        <div className={`${styles.storyText} reveal`}>
          {/*
            Template literals with backticks let you combine strings and class names.
            styles.storyText gives the CSS Module class name,
            "reveal" is a global class from index.css.
            Together: className="storyText_abc123 reveal"
          */}
          <p className={styles.dropCap}>
            Through seasons of growth and the quiet beauty of everyday moments, Jelilah and Hammed
            discovered in each other a companion, a confidant, and a home. Today, they invite you
            to witness the completion of their deen and beginning of their forever.
          </p>
        
        </div>

      </div>
    </section>
  )
}

export default OurStory
