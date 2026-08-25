import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is a build tool / dev server.
// This config file tells Vite: "use the React plugin"
// so it understands JSX syntax (the HTML-like code inside .jsx files).
export default defineConfig({
  plugins: [react()],
})
