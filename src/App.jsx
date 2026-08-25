// App.jsx — The ROOT component of your React application.
//
// ┌─────────────────────────────────────────────────────────────┐
// │  WHAT IS A COMPONENT?                                       │
// │                                                             │
// │  A component is just a JavaScript FUNCTION that returns    │
// │  JSX (HTML-like code). React calls these functions and      │
// │  builds the real HTML from their output.                    │
// │                                                             │
// │  Rule: Component names MUST start with a Capital letter.   │
// │  <div> = regular HTML   |   <Hero> = React component        │
// └─────────────────────────────────────────────────────────────┘
//
// App.jsx is the "director" — it doesn't do much visual work itself,
// it just imports and arranges all the other components in order.
// Think of it as a table of contents for your UI.

import { useState, useEffect } from 'react'
// ↑ useState and useEffect are React "hooks" — special functions
//   that let you add features (like state and side effects) to components.
//   We'll explain each one in detail inside the components that use them.

import EnvelopeIntro  from './components/EnvelopeIntro'
import Hero           from './components/Hero'
import OurStory       from './components/OurStory'
import Couple         from './components/Couple'
import WeddingDetails from './components/WeddingDetails'
import Programme      from './components/Programme'
import Wishes         from './components/Wishes'
import Footer         from './components/Footer'

// This is the App component function.
// It returns JSX — React's special syntax that looks like HTML but is JavaScript.
function App() {

  // ── STATE: envelopeOpened ───────────────────────────────────────
  // useState is a Hook. It gives a component "memory" — a value that
  // React watches. When the value changes, React automatically re-renders
  // (redraws) the component with the new value.
  //
  // useState(false) means: "start this value as false"
  // It returns an ARRAY of exactly two things:
  //   [0] the current value           → envelopeOpened
  //   [1] a function to change it     → setEnvelopeOpened
  //
  // We destructure (unpack) them with [ ] on the left.
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  // envelopeOpened = false → show the envelope overlay
  // envelopeOpened = true  → hide envelope, show the real page

  // ── EFFECT: lock/unlock body scroll ────────────────────────────
  // useEffect runs CODE AFTER the component renders.
  // It's for "side effects" — things that affect the outside world
  // (like the DOM, timers, or fetching data) rather than just drawing UI.
  //
  // The second argument [] is the "dependency array".
  // An empty [] means: "run this effect only ONCE, when the
  // component first mounts (appears on screen)."
  useEffect(() => {
    // While the envelope is showing, prevent the page from scrolling.
    document.body.style.overflow = 'hidden'
  }, []) // ← empty array = run once on mount

  // This function is passed DOWN to the EnvelopeIntro component.
  // When the user clicks the envelope, EnvelopeIntro calls this function,
  // which changes envelopeOpened to true — causing App to re-render,
  // which hides the envelope and shows the page.
  // This pattern (passing functions as props) is called "lifting state up."
  const handleEnvelopeOpen = () => {
    setTimeout(() => {
      setEnvelopeOpened(true)
      document.body.style.overflow = '' // restore scrolling
    }, 3200) // wait for animation to finish (3.2 seconds)
  }

  // ── JSX RETURN ─────────────────────────────────────────────────
  // Every component must return JSX.
  // JSX looks like HTML but has a few rules:
  //   1. Must have ONE root element (here it's the empty <> ... </> fragment)
  //   2. Use className instead of class (class is a reserved JS word)
  //   3. JavaScript expressions go inside { curly braces }
  //   4. Self-closing tags need a slash: <Component />
  return (
    <>
      {/*
        JSX COMMENTS go inside {curly braces} with a slash-star.
        Regular HTML <!-- comments --> don't work in JSX.
      */}

      {/*
        CONDITIONAL RENDERING with &&:
        If envelopeOpened is FALSE, render <EnvelopeIntro>.
        If envelopeOpened is TRUE,  render nothing (skip it).
        The && operator short-circuits: if the left side is false,
        it stops and doesn't evaluate/render the right side.
      */}
      {!envelopeOpened && (
        <EnvelopeIntro onOpen={handleEnvelopeOpen} />
        // ↑ onOpen is a "prop" — data/functions passed into a component.
        //   Props are like arguments to a function.
        //   EnvelopeIntro receives this and calls it when the animation ends.
      )}

      {/*
        The rest of the page renders immediately but is hidden behind the overlay.
        When envelopeOpened becomes true, the overlay disappears and these appear.
        
        We pass envelopeOpened as a prop to Hero so it knows when to
        trigger its entrance animation.
      */}
      <Hero envelopeOpened={envelopeOpened} />
      <OurStory />
      <Couple />
      <WeddingDetails />
      <Programme />
      <Wishes />
      <Footer />
    </>
  )
}

// Every component file MUST export the component so other files can import it.
// "export default" means this is the main thing this file exports.
export default App
