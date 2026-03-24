import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, Eye, EyeOff, Loader2, FileText, CheckCircle, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetMode, setResetMode] = useState(false)

  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (resetMode) {
        await resetPassword(email)
        toast.success('Password reset email sent')
        setResetMode(false)
      } else {
        await login(email, password)
        toast.success('Welcome back')
        navigate('/dashboard')
      }
    } catch (error) {
      const errorMessages = {
        'auth/email-already-in-use': 'Email already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Try again later',
      }
      toast.error(errorMessages[error.code] || 'Something went wrong')
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      toast.success('Welcome')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed')
    }
    setLoading(false)
  }

  const features = [
    'Premium resume and CV templates',
    'ATS-friendly formatting',
    'AI writing assistant',
    'Cover letter workspace',
    'All creator tools in one dashboard',
  ]

  return (
    <div className="min-h-screen luxury-surface grid lg:grid-cols-2">
      <section className="hidden lg:flex p-10 xl:p-14">
        <div className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-10 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-2xl font-semibold title-font tracking-tight">All in One Tools</p>
            </div>

            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-5">
              <Sparkles className="w-4 h-4" />
              Single-user workspace
            </p>

            <h1 className="text-4xl xl:text-5xl font-semibold title-font tracking-tight leading-tight">
              Build Better Resumes with a Cleaner Workflow
            </h1>
            <p className="mt-4 text-slate-200 text-lg max-w-md">
              Log in to your personal dashboard and continue building resumes, CVs, and cover letters.
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-100">
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <FileText className="w-8 h-8 text-blue-700" />
            <span className="text-xl font-semibold title-font tracking-tight text-slate-900">All in One Tools</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 shadow-xl shadow-slate-200/60">
            <h2 className="text-3xl font-semibold title-font tracking-tight text-slate-900 mb-1">
              {resetMode ? 'Reset Password' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500 mb-6">
              {resetMode ? 'Enter your email to receive reset instructions.' : 'Sign in to continue to your workspace.'}
            </p>

            {!resetMode && (
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition font-medium mb-5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            )}

            {!resetMode && (
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-sm text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {!resetMode && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {!resetMode && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setResetMode(true)}
                    className="text-sm text-blue-700 hover:text-blue-800"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition font-medium flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {resetMode ? 'Send Reset Email' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {resetMode ? (
                <button onClick={() => setResetMode(false)} className="text-blue-700 hover:text-blue-800 font-medium">
                  Back to login
                </button>
              ) : (
                <span>Single-user access enabled</span>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-5">
            By continuing, you agree to Terms and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  )
}
