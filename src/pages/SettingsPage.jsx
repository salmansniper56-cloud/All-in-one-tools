import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, User, SlidersHorizontal, Shield, Database, RefreshCw, Sparkles } from 'lucide-react'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { auth, db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const APP_SETTINGS_KEY = 'allinone_app_settings'

const defaultPrefs = {
  defaultBuilderView: 'resume',
  defaultTemplate: 'modern',
  rememberDashboardView: true,
  showProfilePhotoByDefault: false,
  emailUpdates: true,
  marketingEmails: false,
  publicProfile: false,
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, userProfile, refreshUserProfile } = useAuth()

  const [activeTab, setActiveTab] = useState('account')
  const [savingAccount, setSavingAccount] = useState(false)
  const [savingPrefs, setSavingPrefs] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [prefs, setPrefs] = useState(defaultPrefs)

  useEffect(() => {
    setDisplayName(userProfile?.displayName || user?.displayName || '')
    setPhotoURL(userProfile?.photoURL || user?.photoURL || '')

    let localPrefs = {}
    try {
      localPrefs = JSON.parse(localStorage.getItem(APP_SETTINGS_KEY) || '{}')
    } catch {
      localPrefs = {}
    }

    setPrefs({
      ...defaultPrefs,
      ...(userProfile?.preferences || {}),
      ...localPrefs,
    })
  }, [user, userProfile])

  const tabs = useMemo(
    () => [
      { id: 'account', label: 'Account', icon: User },
      { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
      { id: 'privacy', label: 'Privacy', icon: Shield },
      { id: 'data', label: 'Data', icon: Database },
    ],
    []
  )

  const updatePref = (key, value) => setPrefs((prev) => ({ ...prev, [key]: value }))

  const saveAccount = async () => {
    if (!user) return
    setSavingAccount(true)

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
      })

      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName: displayName.trim(),
          photoURL: photoURL.trim(),
          updatedAt: new Date(),
        },
        { merge: true }
      )

      await refreshUserProfile()
      toast.success('Account settings updated')
    } catch {
      toast.error('Could not save account settings')
    } finally {
      setSavingAccount(false)
    }
  }

  const savePreferences = async () => {
    if (!user) return
    setSavingPrefs(true)

    try {
      localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(prefs))
      await setDoc(
        doc(db, 'users', user.uid),
        {
          preferences: prefs,
          updatedAt: new Date(),
        },
        { merge: true }
      )
      await refreshUserProfile()
      toast.success('Preferences saved')
    } catch {
      toast.error('Could not save preferences')
    } finally {
      setSavingPrefs(false)
    }
  }

  const resetPreferences = () => {
    setPrefs(defaultPrefs)
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(defaultPrefs))
    toast.success('Preferences reset to defaults')
  }

  const clearLocalDrafts = () => {
    localStorage.removeItem('resumeforge_current')
    toast.success('Local drafts cleared')
  }

  return (
    <div className="min-h-screen luxury-surface">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-slate-100">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold title-font tracking-tight text-slate-900">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold title-font tracking-tight text-slate-900">Personal Workspace Preferences</h2>
              <p className="text-sm text-slate-600 mt-1">Control your default builder behavior and account details across all devices.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-3 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const active = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition ${
                      active
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </aside>

          <section className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            {activeTab === 'account' && (
              <>
                <h2 className="text-xl font-semibold title-font tracking-tight text-slate-900">Account Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      value={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo URL</label>
                  <input
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <button
                  onClick={saveAccount}
                  disabled={savingAccount}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {savingAccount ? 'Saving...' : 'Save Account'}
                </button>
              </>
            )}

            {activeTab === 'preferences' && (
              <>
                <h2 className="text-xl font-semibold title-font tracking-tight text-slate-900">App Preferences</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Default Builder View</label>
                    <select
                      value={prefs.defaultBuilderView}
                      onChange={(e) => updatePref('defaultBuilderView', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    >
                      <option value="resume">Resume</option>
                      <option value="cv">CV</option>
                      <option value="cover-letter">Cover Letter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Default Template</label>
                    <select
                      value={prefs.defaultTemplate}
                      onChange={(e) => updatePref('defaultTemplate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    >
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="creative">Creative</option>
                      <option value="minimal">Minimal</option>
                      <option value="executive">Executive</option>
                      <option value="tech">Tech</option>
                    </select>
                  </div>
                </div>

                <Toggle
                  label="Remember dashboard view mode"
                  checked={prefs.rememberDashboardView}
                  onChange={(value) => updatePref('rememberDashboardView', value)}
                />
                <Toggle
                  label="Show profile photo by default"
                  checked={prefs.showProfilePhotoByDefault}
                  onChange={(value) => updatePref('showProfilePhotoByDefault', value)}
                />
                <Toggle
                  label="Email updates"
                  checked={prefs.emailUpdates}
                  onChange={(value) => updatePref('emailUpdates', value)}
                />
                <Toggle
                  label="Marketing emails"
                  checked={prefs.marketingEmails}
                  onChange={(value) => updatePref('marketingEmails', value)}
                />

                <div className="flex gap-2">
                  <button
                    onClick={savePreferences}
                    disabled={savingPrefs}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-60"
                  >
                    <Save className="w-4 h-4" />
                    {savingPrefs ? 'Saving...' : 'Save Preferences'}
                  </button>
                  <button
                    onClick={resetPreferences}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </>
            )}

            {activeTab === 'privacy' && (
              <>
                <h2 className="text-xl font-semibold title-font tracking-tight text-slate-900">Privacy Controls</h2>
                <Toggle
                  label="Public profile visibility"
                  checked={prefs.publicProfile}
                  onChange={(value) => updatePref('publicProfile', value)}
                />
                <p className="text-sm text-slate-500">Save preferences to apply this setting across devices.</p>
              </>
            )}

            {activeTab === 'data' && (
              <>
                <h2 className="text-xl font-semibold title-font tracking-tight text-slate-900">Data Management</h2>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-700 mb-3">Clear temporary local drafts stored in this browser.</p>
                  <button
                    onClick={clearLocalDrafts}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white"
                  >
                    Clear Local Drafts
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition ${checked ? 'bg-blue-700' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </label>
  )
}
