import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { firebaseConfig } from './firebaseConfig'
// meta env not support Jest test
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// }

// I changed vite config to support process.env
// const firebaseConfig = {
//   apiKey: process.env.VITE_API_KEY,
//   authDomain: process.env.VITE_AUTH_DOMAIN,
//   projectId: process.env.VITE_PROJECT_ID,
//   storageBucket: process.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
//   appId: process.env.VITE_APP_ID,
// }

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
const db = getFirestore(firebase)

export { firebase, auth, db }
