import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyB3YCk7RRQr_FIeUzsPVjbNlrWsNwjyxjE",
  authDomain:        "wedding-app-5bebc.firebaseapp.com",
  projectId:         "wedding-app-5bebc",
  storageBucket:     "wedding-app-5bebc.firebasestorage.app",
  messagingSenderId: "957035545197",
  appId:             "1:957035545197:web:de19c5cca055278d033564"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app