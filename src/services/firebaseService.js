import { db, storage } from '../firebase'
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  increment
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

// Resume CRUD operations
export const resumeService = {
  // Create new resume
  async create(userId, resumeData, name = 'Untitled Resume') {
    const resumeRef = await addDoc(collection(db, 'resumes'), {
      userId,
      name,
      data: resumeData,
      settings: resumeData.settings || {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      isPublic: false,
      shareLink: null
    })
    
    // Update user resume count
    try {
      const userRef = doc(db, 'users', userId)
      await updateDoc(userRef, { resumeCount: increment(1) })
    } catch (e) {
      console.log('Could not update resume count')
    }
    
    return resumeRef.id
  },

  // Get all resumes for user
  async getAll(userId) {
    try {
      const q = query(
        collection(db, 'resumes'),
        where('userId', '==', userId)
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting resumes:', error)
      return []
    }
  },

  // Get single resume
  async get(resumeId) {
    const docRef = doc(db, 'resumes', resumeId)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() }
    }
    return null
  },

  // Update resume
  async update(resumeId, data) {
    const docRef = doc(db, 'resumes', resumeId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    })
  },

  // Delete resume
  async delete(resumeId, userId) {
    await deleteDoc(doc(db, 'resumes', resumeId))
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, { resumeCount: increment(-1) })
  },

  // Make resume public/private
  async togglePublic(resumeId, isPublic) {
    const docRef = doc(db, 'resumes', resumeId)
    const shareLink = isPublic ? `${resumeId}` : null
    await updateDoc(docRef, { isPublic, shareLink })
    return shareLink
  },

  // Increment views
  async incrementViews(resumeId) {
    const docRef = doc(db, 'resumes', resumeId)
    await updateDoc(docRef, { views: increment(1) })
  },

  // Get public resume
  async getPublic(resumeId) {
    const resume = await this.get(resumeId)
    if (resume && resume.isPublic) {
      await this.incrementViews(resumeId)
      return resume
    }
    return null
  }
}

// Cover Letter service
export const coverLetterService = {
  async create(userId, data, name = 'Untitled Cover Letter') {
    const ref = await addDoc(collection(db, 'coverLetters'), {
      userId,
      name,
      data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return ref.id
  },

  async getAll(userId) {
    try {
      const q = query(
        collection(db, 'coverLetters'),
        where('userId', '==', userId)
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting cover letters:', error)
      return []
    }
  },

  async update(id, data) {
    const docRef = doc(db, 'coverLetters', id)
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
  },

  async delete(id) {
    await deleteDoc(doc(db, 'coverLetters', id))
  }
}

// Profile photo upload
export const uploadProfilePhoto = async (userId, file) => {
  const storageRef = ref(storage, `profiles/${userId}/${file.name}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

// Resume version history
export const versionService = {
  async saveVersion(resumeId, data, note = '') {
    const ref = await addDoc(collection(db, 'resumeVersions'), {
      resumeId,
      data,
      note,
      createdAt: serverTimestamp()
    })
    return ref.id
  },

  async getVersions(resumeId) {
    const q = query(
      collection(db, 'resumeVersions'),
      where('resumeId', '==', resumeId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async restoreVersion(resumeId, versionData) {
    await resumeService.update(resumeId, { data: versionData })
  }
}

// Payment service
export const paymentService = {
  // Initiate payment - calls Cloud Function
  async initiatePayment(userId, planId, amount) {
    try {
      const response = await fetch(
        `https://asia-south1-campuskart-1545d.cloudfunctions.net/initiatePayment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, planId, amount })
        }
      )
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Payment initiation failed')
      return data
    } catch (error) {
      console.error('Error initiating payment:', error)
      throw error
    }
  },

  // Get user's current plan from Firestore
  async getUserPlan(userId) {
    try {
      const userRef = doc(db, 'users', userId)
      const snapshot = await getDoc(userRef)
      if (snapshot.exists()) {
        return snapshot.data().plan || 'free'
      }
      return 'free'
    } catch (error) {
      console.error('Error getting user plan:', error)
      return 'free'
    }
  },

  // Get payment history
  async getPaymentHistory(userId) {
    try {
      const q = query(
        collection(db, 'payments'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting payment history:', error)
      return []
    }
  },

  // Update user plan (called by backend after successful payment)
  async updateUserPlan(userId, plan) {
    try {
      const userRef = doc(db, 'users', userId)
      await updateDoc(userRef, { plan })
    } catch (error) {
      console.error('Error updating user plan:', error)
      throw error
    }
  }
}
