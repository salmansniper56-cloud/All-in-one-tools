import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ToolsPage from './pages/ToolsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import SettingsPage from './pages/SettingsPage'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import TemplateSelector from './components/TemplateSelector'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import CoverLetterBuilder from './components/CoverLetterBuilder'
import AIAssistant from './components/AIAssistant'
import ATSChecker from './components/ATSChecker'
import SettingsPanel from './components/SettingsPanel'
import { getSampleTemplate } from './components/sampleTemplates'

const initialResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    github: '',
    twitter: '',
    summary: '',
    photo: null
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  awards: [],
  references: [],
  customSections: []
}

const defaultSettings = {
  template: 'modern',
  primaryColor: '#2563eb',
  fontFamily: 'Inter',
  fontSize: 'medium',
  spacing: 'normal',
  showPhoto: false
}

// Resume Builder Component (used for both new and edit)
function ResumeBuilder() {
  const location = useLocation()
  const userPlan = 'premium'

  const queryView = new URLSearchParams(location.search).get('view')
  const initialView = queryView === 'cv' ? 'cv' : (queryView === 'cover-letter' ? 'cover-letter' : 'resume')
  const [currentView, setCurrentView] = useState(initialView)
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [settings, setSettings] = useState(defaultSettings)
  const [showAI, setShowAI] = useState(false)
  const [showATS, setShowATS] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    // Apply app-level defaults before loading a specific draft.
    try {
      const prefs = JSON.parse(localStorage.getItem('allinone_app_settings') || '{}')
      if (!queryView && ['resume', 'cv', 'cover-letter'].includes(prefs.defaultBuilderView)) {
        setCurrentView(prefs.defaultBuilderView)
      }
      setSettings((prev) => ({
        ...prev,
        template: prefs.defaultTemplate || prev.template,
        showPhoto: typeof prefs.showProfilePhotoByDefault === 'boolean' ? prefs.showProfilePhotoByDefault : prev.showPhoto
      }))
    } catch (e) {}

    const saved = localStorage.getItem('resumeforge_current')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.resume && data.resume.personalInfo && data.resume.personalInfo.fullName) {
          // Only load saved data if it has actual user content
          setResumeData(data.resume)
        } else {
          // Load sample data for default template
          const sampleData = getSampleTemplate('modern')
          setResumeData({
            personalInfo: sampleData.personalInfo || initialResumeData.personalInfo,
            experience: sampleData.experience || [],
            education: sampleData.education || [],
            skills: sampleData.skills || [],
            languages: sampleData.languages || [],
            certifications: sampleData.certifications || [],
            projects: sampleData.projects || [],
            awards: sampleData.awards || [],
            references: sampleData.references || [],
            customSections: []
          })
        }
        if (data.settings) setSettings(data.settings)
      } catch (e) {
        // Load sample data for default template if parsing fails
        const sampleData = getSampleTemplate('modern')
        setResumeData({
          personalInfo: sampleData.personalInfo || initialResumeData.personalInfo,
          experience: sampleData.experience || [],
          education: sampleData.education || [],
          skills: sampleData.skills || [],
          languages: sampleData.languages || [],
          certifications: sampleData.certifications || [],
          projects: sampleData.projects || [],
          awards: sampleData.awards || [],
          references: sampleData.references || [],
          customSections: []
        })
      }
    } else {
      // No saved data - load sample data for default template
      const sampleData = getSampleTemplate('modern')
      setResumeData({
        personalInfo: sampleData.personalInfo || initialResumeData.personalInfo,
        experience: sampleData.experience || [],
        education: sampleData.education || [],
        skills: sampleData.skills || [],
        languages: sampleData.languages || [],
        certifications: sampleData.certifications || [],
        projects: sampleData.projects || [],
        awards: sampleData.awards || [],
        references: sampleData.references || [],
        customSections: []
      })
    }
  }, [queryView])

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('resumeforge_current', JSON.stringify({
      resume: resumeData,
      settings: settings
    }))
  }, [resumeData, settings])

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  // Load sample data when a template is selected
  const handleLoadSampleData = (sampleData) => {
    if (sampleData) {
      setResumeData({
        personalInfo: sampleData.personalInfo || initialResumeData.personalInfo,
        experience: sampleData.experience || [],
        education: sampleData.education || [],
        skills: sampleData.skills || [],
        languages: sampleData.languages || [],
        certifications: sampleData.certifications || [],
        projects: sampleData.projects || [],
        awards: sampleData.awards || [],
        references: sampleData.references || [],
        customSections: []
      })
    }
  }

  const handleShowAI = () => setShowAI(true)

  const handleShowATS = () => setShowATS(true)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        onBack={() => window.location.href = '/dashboard'}
        resumeData={resumeData}
        settings={settings}
        currentView={currentView}
        onViewChange={setCurrentView}
        onShowAI={handleShowAI}
        onShowATS={handleShowATS}
        onShowSettings={() => setShowSettings(true)}
        userPlan={userPlan}
        onUpgrade={() => {}}
      />
      
      {currentView === 'resume' || currentView === 'cv' ? (
        <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6 max-w-[1800px] mx-auto">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 space-y-4">
            <TemplateSelector 
              selected={settings.template} 
              onSelect={(t) => setSettings(prev => ({ ...prev, template: t }))}
              settings={settings}
              onSettingsChange={setSettings}
              userPlan={userPlan}
              onUpgrade={() => {}}
              onLoadSampleData={handleLoadSampleData}
            />
            <ResumeForm
              data={resumeData} 
              onChange={updateResumeData}
              documentType={currentView === 'cv' ? 'cv' : 'resume'}
              onShowAI={(section, field) => setShowAI({ section, field })}
            />
          </div>
          
          {/* Right Panel - Preview */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <ResumePreview 
              data={resumeData} 
              settings={settings}
              documentType={currentView === 'cv' ? 'cv' : 'resume'}
            />
          </div>
        </div>
      ) : (
        <CoverLetterBuilder 
          resumeData={resumeData}
          settings={settings}
        />
      )}

      {/* AI Assistant Modal */}
      {showAI && (
        <AIAssistant 
          onClose={() => setShowAI(false)}
          context={showAI}
          resumeData={resumeData}
          onApply={(text, section, field) => {
            if (section === 'personalInfo') {
              updateResumeData('personalInfo', { ...resumeData.personalInfo, [field]: text })
            }
            setShowAI(false)
          }}
        />
      )}

      {/* ATS Checker Modal */}
      {showATS && (
        <ATSChecker 
          onClose={() => setShowATS(false)}
          resumeData={resumeData}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel 
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSettingsChange={setSettings}
        />
      )}

    </div>
  )
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return children
}

// Main App with Router
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/tools" element={
            <ProtectedRoute>
              <ToolsPage />
            </ProtectedRoute>
          } />
          <Route path="/tools/:toolId" element={
            <ProtectedRoute>
              <ToolsPage />
            </ProtectedRoute>
          } />
          <Route path="/builder/:id" element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } />
          <Route path="/builder/new" element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
