// useReveal.js — A CUSTOM HOOK
//
// ┌─────────────────────────────────────────────────────────────┐
// │  WHAT IS A CUSTOM HOOK?                                     │
// │                                                             │
// │  A custom hook is a regular JavaScript function whose name  │
// │  starts with "use". It lets you EXTRACT and REUSE logic     │
// │  that uses other hooks (useState, useEffect etc.).          │
// │                                                             │
// │  Our scroll-reveal logic (IntersectionObserver) is used     │
// │  in MULTIPLE components. Instead of copy-pasting it into    │
// │  every component, we extract it here once.                  │
// │                                                             │
// │  Files in /hooks/ hold custom hooks — a common convention.  │
// └─────────────────────────────────────────────────────────────┘

import { useEffect, useRef } from 'react'

// useRef gives you a "ref" — a way to hold a reference to a DOM element
// or any mutable value WITHOUT causing a re-render when it changes.
// Think of it like a sticky note that persists between renders.

function useReveal() {
  // Create a ref. We'll attach this to a DOM element in the component.
  // containerRef.current will point to the actual DOM node.
  const containerRef = useRef(null)

  useEffect(() => {
    // Get the DOM element this ref is attached to
    const container = containerRef.current
    if (!container) return

    // Find all elements with class "reveal" inside this container
    const elements = container.querySelectorAll('.reveal')

    // IntersectionObserver watches elements and fires a callback
    // when they enter or leave the viewport (visible area of the screen).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible — add .visible class to trigger CSS animation
            entry.target.classList.add('visible')
            // Stop watching this element — we only want to animate it once
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 } // fire when 10% of the element is visible
    )

    // Start observing each element
    elements.forEach((el) => observer.observe(el))

    // CLEANUP FUNCTION:
    // useEffect can return a function that React calls when the component
    // UNMOUNTS (is removed from the screen) or before the effect re-runs.
    // This prevents memory leaks by disconnecting the observer.
    return () => observer.disconnect()

  }, []) // Empty array → only run once when component mounts

  // Return the ref so components can attach it to their root element
  return containerRef
}

export default useReveal
