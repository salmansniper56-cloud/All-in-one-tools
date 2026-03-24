import { createContext, useContext, useState } from 'react'

const PricingContext = createContext()

export function usePricing() {
  return useContext(PricingContext)
}

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: {
      maxResumes: 1,
      templates: ['modern', 'classic'],
      aiAssistant: false,
      atsChecker: false,
      pdfDownload: true,
      wordDownload: false,
      coverLetter: false,
      jobTracker: false,
      cloudStorage: false,
      customColors: false
    }
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceYearly: 79.99,
    features: {
      maxResumes: 10,
      templates: ['modern', 'classic', 'creative', 'minimal', 'executive', 'tech'],
      aiAssistant: true,
      atsChecker: true,
      pdfDownload: true,
      wordDownload: true,
      coverLetter: true,
      jobTracker: true,
      cloudStorage: true,
      customColors: true
    }
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    priceYearly: 149.99,
    features: {
      maxResumes: -1, // unlimited
      templates: ['modern', 'classic', 'creative', 'minimal', 'executive', 'tech'],
      aiAssistant: true,
      atsChecker: true,
      pdfDownload: true,
      wordDownload: true,
      coverLetter: true,
      jobTracker: true,
      cloudStorage: true,
      customColors: true,
      prioritySupport: true,
      customBranding: true
    }
  }
}

export const PREMIUM_TEMPLATES = ['creative', 'minimal', 'executive', 'tech']
export const FREE_TEMPLATES = ['modern', 'classic']

export function PricingProvider({ children }) {
  const [userPlan, setUserPlan] = useState('free')

  const canUseFeature = (feature) => {
    return PLANS[userPlan]?.features?.[feature] ?? false
  }

  const canUseTemplate = (templateId) => {
    if (userPlan === 'free') {
      return FREE_TEMPLATES.includes(templateId)
    }
    return true
  }

  const isPremiumTemplate = (templateId) => {
    return PREMIUM_TEMPLATES.includes(templateId)
  }

  const getMaxResumes = () => {
    return PLANS[userPlan]?.features?.maxResumes ?? 1
  }

  const value = {
    userPlan,
    setUserPlan,
    canUseFeature,
    canUseTemplate,
    isPremiumTemplate,
    getMaxResumes,
    PLANS
  }

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  )
}
