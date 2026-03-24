import { useState, useEffect } from 'react'
import { X, Check, Crown, Sparkles, Zap, AlertCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { paymentService } from '../services/firebaseService'
import { useAuth } from '../contexts/AuthContext'

export default function PricingModal({ onClose, onSelectPlan }) {
  const { user } = useAuth()
  const [selectedBillingCycle, setSelectedBillingCycle] = useState('monthly')
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [error, setError] = useState(null)

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '1 Resume',
        '2 Basic Templates',
        'PDF Download',
        'Basic Editor',
      ],
      notIncluded: [
        'AI Writing Assistant',
        'ATS Score Checker',
        'Premium Templates',
        'Cover Letter Builder',
        'Job Tracker',
        'Cloud Storage'
      ],
      icon: Zap,
      color: 'gray',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      yearlyPrice: '$79.99/year',
      description: 'Best for job seekers',
      features: [
        '10 Resumes',
        'All 6 Premium Templates',
        'AI Writing Assistant',
        'ATS Score Checker',
        'Cover Letter Builder',
        'Job Application Tracker',
        'Cloud Storage & Sync',
        'Word & PDF Download',
        'Custom Colors & Fonts'
      ],
      notIncluded: [],
      icon: Sparkles,
      color: 'blue',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      yearlyPrice: '$149.99/year',
      description: 'For professionals',
      features: [
        'Unlimited Resumes',
        'Everything in Pro',
        'Priority Support',
        'Custom Branding',
        'Remove Watermark',
        'Early Access Features'
      ],
      notIncluded: [],
      icon: Crown,
      color: 'purple',
      popular: false
    }
  ]

  const handleUpgrade = async (planId) => {
    if (!user) {
      toast.error('Please login to upgrade')
      return
    }

    setLoadingPlan(planId)
    setError(null)

    try {
      // Initiate payment via Cloud Function
      const paymentData = await paymentService.initiatePayment(
        user.uid,
        planId,
        selectedBillingCycle
      )

      if (!window.Razorpay) {
        throw new Error('Razorpay script not loaded')
      }

      // Open Razorpay Checkout
      const razorpayOptions = {
        key: paymentData.keyId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'ResumeForge',
        description: `${paymentData.planName} - ${selectedBillingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
        order_id: paymentData.orderId,
        prefill: {
          email: paymentData.userEmail,
          name: user.displayName || 'User'
        },
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(
              'https://asia-south1-campuskart-1545d.cloudfunctions.net/verifyPayment',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  userId: user.uid
                })
              }
            )

            const verifyData = await verifyResponse.json()

            if (verifyResponse.ok) {
              toast.success('✅ Payment successful! Upgrading your account...')
              onSelectPlan(verifyData.planId)
              setTimeout(() => onClose(), 1500)
            } else {
              throw new Error(verifyData.error || 'Payment verification failed')
            }
          } catch (error) {
            toast.error(`Payment verification failed: ${error.message}`)
            setError(error.message)
          }
        },
        modal: {
          ondismiss: () => {
            setLoadingPlan(null)
            toast.error('Payment cancelled')
          }
        },
        theme: {
          color: '#2563eb'
        }
      }

      const razorpay = new window.Razorpay(razorpayOptions)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(`Error: ${error.message}`)
      setError(error.message)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Choose Your Plan</h2>
            <p className="text-gray-500">Unlock premium features to land your dream job faster</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Trust badges */}
          <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500">
            <span>✓ ATS Optimized</span>
            <span>✓ HR Approved</span>
            <span>✓ Get Hired Faster</span>
          </div>

          {/* Billing cycle toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  selectedBillingCycle === 'monthly'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  selectedBillingCycle === 'yearly'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Annual <span className="text-green-600 text-xs ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Payment Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-6 ${
                  plan.popular
                    ? 'border-blue-500 shadow-xl shadow-blue-100'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${plan.color}-100`}>
                  <plan.icon className={`w-6 h-6 text-${plan.color}-600`} />
                </div>

                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                  {plan.yearlyPrice && (
                    <p className="text-sm text-green-600 mt-1">
                      Save with annual: {plan.yearlyPrice}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (plan.id === 'free') {
                      onSelectPlan('free')
                      onClose()
                    } else {
                      handleUpgrade(plan.id)
                    }
                  }}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-3 rounded-xl font-semibold transition mb-6 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:bg-gray-200'
                  } ${loadingPlan === plan.id ? 'opacity-75' : ''}`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'
                  )}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm opacity-50">
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            🔒 Secure payment via Razorpay • Cancel anytime • 7-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  )
}

// Small upgrade prompt component
export function UpgradePrompt({ feature, onUpgrade }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-center">
      <Crown className="w-8 h-8 text-blue-600 mx-auto mb-2" />
      <h4 className="font-semibold text-gray-800">Upgrade to Pro</h4>
      <p className="text-sm text-gray-600 mb-3">
        Unlock {feature} and more premium features
      </p>
      <button
        onClick={onUpgrade}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        Upgrade Now
      </button>
    </div>
  )
}

// Locked template overlay
export function LockedOverlay({ onUpgrade }) {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
      <Crown className="w-8 h-8 text-yellow-500 mb-2" />
      <p className="font-medium text-gray-800">Pro Template</p>
      <button
        onClick={onUpgrade}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        Upgrade to unlock
      </button>
    </div>
  )
}
