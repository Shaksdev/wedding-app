// main.jsx — The entry point of the entire React application.
//
// Think of this file as the "ignition key" of your app.
// It does ONE job: it finds the <div id="root"> in your index.html
// and tells React to take control of it by rendering your App component inside it.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'        // <-- imports your main App component
import './index.css'           // <-- imports your global CSS styles

// ReactDOM.createRoot() says: "React, take over this DOM element."
// document.getElementById('root') finds the <div id="root"> in index.html.
// .render(<App />) puts your entire App component tree inside that div.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*
      <React.StrictMode> is a development helper.
      It runs your components twice in development to catch bugs early.
      It has NO effect on the final production build — it's just a safety net.
    */}
    <App />
  </React.StrictMode>
)
