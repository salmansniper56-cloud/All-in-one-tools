import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth, googleProvider, db } from '../firebase'
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function createUserProfile(user, additionalData = {}) {
    try {
      const userRef = doc(db, 'users', user.uid)
      const snapshot = await getDoc(userRef)
      
      if (!snapshot.exists()) {
        const { email, displayName, photoURL } = user
        await setDoc(userRef, {
          email,
          displayName: displayName || additionalData.displayName || '',
          photoURL: photoURL || '',
          createdAt: serverTimestamp(),
          plan: 'free',
          resumeCount: 0,
          ...additionalData
        })
      }
      
      const updatedSnapshot = await getDoc(userRef)
      setUserProfile(updatedSnapshot.data())
      return updatedSnapshot.data()
    } catch (error) {
      console.error('Error creating user profile:', error)
      // Still set basic profile from auth user
      setUserProfile({
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        plan: 'free'
      })
      return null
    }
  }

  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName })
    await createUserProfile(result.user, { displayName })
    return result
  }

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    await createUserProfile(result.user)
    return result
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    await createUserProfile(result.user)
    return result
  }

  function logout() {
    setUserProfile(null)
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  // Refresh user profile from Firestore
  async function refreshUserProfile() {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid)
        const snapshot = await getDoc(userRef)
        if (snapshot.exists()) {
          setUserProfile(snapshot.data())
        }
      } catch (error) {
        console.error('Error refreshing user profile:', error)
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid)

          // Set up real-time listener for user profile changes
          const unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
            if (snapshot.exists()) {
              setUserProfile(snapshot.data())
            } else {
              setUserProfile({
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                plan: 'free'
              })
            }
          })

          // Initialize profile on first login
          const snapshot = await getDoc(userRef)
          if (!snapshot.exists()) {
            await createUserProfile(user)
          }

          setLoading(false)

          // Return unsubscribe for snapshot listener
          return () => unsubscribeSnapshot()
        } catch (error) {
          console.error('Error fetching user profile:', error)
          setUserProfile({
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            plan: 'free'
          })
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    refreshUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
