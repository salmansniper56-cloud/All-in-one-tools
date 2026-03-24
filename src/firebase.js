import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA05v8RYPGv72LN9ZuGXKnrQGz6f66wT_g",
  authDomain: "campuskart-1545d.firebaseapp.com",
  projectId: "campuskart-1545d",
  storageBucket: "campuskart-1545d.firebasestorage.app",
  messagingSenderId: "380134811918",
  appId: "1:380134811918:web:cde714e3cc59edced00f5f"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
