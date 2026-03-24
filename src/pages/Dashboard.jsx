import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { resumeService, coverLetterService } from '../services/firebaseService'
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  Share2,
  Copy,
  MoreVertical,
  Search,
  Grid,
  List,
  Clock,
  Settings,
  LogOut,
  User,
  ChevronDown,
  X,
  Mail,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [resumes, setResumes] = useState([])
  const [coverLetters, setCoverLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resumes')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = async () => {
    if (!user) return
    setLoading(true)

    try {
      let resumeData = []
      let coverData = []

      try {
        resumeData = await resumeService.getAll(user.uid)
      } catch (error) {
        console.log('Could not load resumes:', error.message)
      }

      try {
        coverData = await coverLetterService.getAll(user.uid)
      } catch (error) {
        console.log('Could not load cover letters:', error.message)
      }

      setResumes(resumeData)
      setCoverLetters(coverData)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  const createNewResume = () => navigate('/builder/new')
  const createNewCV = () => navigate('/builder/new?view=cv')
  const editResume = (id) => navigate(`/builder/${id}`)

  const deleteResume = async (id) => {
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      await resumeService.delete(id, user.uid)
      setResumes((prev) => prev.filter((resume) => resume.id !== id))
      toast.success('Resume deleted')
    } catch (error) {
      toast.error('Failed to delete resume')
    }
  }

  const duplicateResume = async (resume) => {
    try {
      const newName = `${resume.name} (Copy)`
      const newId = await resumeService.create(user.uid, resume.data, newName)
      setResumes((prev) => [{ ...resume, id: newId, name: newName }, ...prev])
      toast.success('Resume duplicated')
    } catch (error) {
      toast.error('Failed to duplicate resume')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const stats = useMemo(
    () => [
      {
        label: 'Resumes',
        value: resumes.length,
        icon: FileText,
        badgeClass: 'bg-blue-100 text-blue-700',
      },
      {
        label: 'Cover Letters',
        value: coverLetters.length,
        icon: Mail,
        badgeClass: 'bg-indigo-100 text-indigo-700',
      },
      {
        label: 'Templates',
        value: 6,
        icon: Sparkles,
        badgeClass: 'bg-emerald-100 text-emerald-700',
      },
      {
        label: 'Views',
        value: resumes.reduce((sum, resume) => sum + (resume.views || 0), 0),
        icon: Eye,
        badgeClass: 'bg-amber-100 text-amber-700',
      },
    ],
    [resumes, coverLetters]
  )

  const filteredResumes = resumes.filter((resume) =>
    (resume.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCoverLetters = coverLetters.filter((letter) =>
    (letter.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen luxury-surface">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Workspace</p>
                <p className="text-lg font-semibold title-font tracking-tight text-slate-900">All in One Tools</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={createNewResume}
                className="bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-800 transition flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Resume</span>
              </button>
              <button
                onClick={createNewCV}
                className="bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-black transition flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New CV</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-medium text-slate-800">{user?.displayName || 'User'}</p>
                      <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-flex mt-2 px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Single User Mode
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/settings')}
                      className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <article key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-semibold text-slate-900 title-font tracking-tight">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.badgeClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'resumes', label: 'Resumes', icon: FileText },
                { id: 'coverLetters', label: 'Cover Letters', icon: Mail },
                { id: 'tools', label: 'Tools', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'tools') {
                        navigate('/tools')
                        return
                      }
                      setActiveTab(tab.id)
                    }}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-medium ${
                      active ? 'bg-blue-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search documents"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg w-full sm:w-72 focus:ring-2 focus:ring-blue-500/40 outline-none"
                />
              </div>
              <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-slate-500">Loading your workspace...</p>
          </div>
        ) : activeTab === 'resumes' ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            <button
              onClick={createNewResume}
              className={`border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center ${
                viewMode === 'grid' ? 'h-64' : 'h-20'
              }`}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">Create New Resume</p>
              </div>
            </button>

            {filteredResumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                viewMode={viewMode}
                onEdit={() => editResume(resume.id)}
                onDelete={() => deleteResume(resume.id)}
                onDuplicate={() => duplicateResume(resume)}
              />
            ))}
          </div>
        ) : (
          <CoverLettersSection
            letters={filteredCoverLetters}
            userId={user.uid}
            onCreate={() => setShowCoverLetterModal(true)}
            showModal={showCoverLetterModal}
            onCloseModal={() => setShowCoverLetterModal(false)}
            onRefresh={loadData}
          />
        )}
      </main>
    </div>
  )
}

function CoverLettersSection({ letters, userId, onCreate, showModal, onCloseModal, onRefresh }) {
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    jobTitle: '',
    body: '',
  })

  const resetForm = () => {
    setEditing(null)
    setForm({ name: '', companyName: '', jobTitle: '', body: '' })
  }

  const startEdit = (letter) => {
    setEditing(letter)
    setForm({
      name: letter.name || '',
      companyName: letter.data?.companyName || '',
      jobTitle: letter.data?.jobTitle || '',
      body: letter.data?.body || '',
    })
  }

  const saveLetter = async () => {
    if (!form.name || !form.body) {
      toast.error('Please add a title and content')
      return
    }

    const payload = {
      companyName: form.companyName,
      jobTitle: form.jobTitle,
      body: form.body,
    }

    try {
      if (editing) {
        await coverLetterService.update(editing.id, { name: form.name, data: payload })
        toast.success('Cover letter updated')
      } else {
        await coverLetterService.create(userId, payload, form.name)
        toast.success('Cover letter saved')
      }

      onCloseModal()
      resetForm()
      onRefresh()
    } catch (error) {
      toast.error('Failed to save cover letter')
    }
  }

  const deleteLetter = async (id) => {
    try {
      await coverLetterService.delete(id)
      toast.success('Cover letter deleted')
      onRefresh()
    } catch (error) {
      toast.error('Failed to delete cover letter')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold title-font tracking-tight text-slate-900">Cover Letters</h2>
        <button
          onClick={() => {
            resetForm()
            onCreate()
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Cover Letter
        </button>
      </div>

      {letters.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No cover letters yet</p>
          <p className="text-sm text-slate-400">Create one for your personal workspace</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {letters.map((letter) => (
            <article key={letter.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-semibold text-slate-800">{letter.name || 'Untitled Cover Letter'}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {letter.data?.jobTitle || 'General role'} at {letter.data?.companyName || 'Target company'}
              </p>
              <p className="text-sm text-slate-600 mt-3 line-clamp-4 whitespace-pre-line">{letter.data?.body || ''}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    startEdit(letter)
                    onCreate()
                  }}
                  className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteLetter(letter.id)}
                  className="px-3 py-1.5 text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/55 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold title-font tracking-tight text-slate-900">
                {editing ? 'Edit Cover Letter' : 'Create Cover Letter'}
              </h3>
              <button
                onClick={() => {
                  onCloseModal()
                  resetForm()
                }}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="Cover letter title"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Company name"
                />
                <input
                  type="text"
                  value={form.jobTitle}
                  onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Job title"
                />
              </div>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg h-56 resize-none"
                placeholder="Write your cover letter content"
              />
              <button
                onClick={saveLetter}
                className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
              >
                {editing ? 'Update Cover Letter' : 'Save Cover Letter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ResumeCard({ resume, viewMode, onEdit, onDelete, onDuplicate }) {
  const [showMenu, setShowMenu] = useState(false)

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between hover:shadow-md transition">
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 bg-slate-100 rounded flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h3 className="font-medium text-slate-800">{resume.name || 'Untitled'}</h3>
            <p className="text-sm text-slate-500">
              Updated {resume.updatedAt?.toDate?.()?.toLocaleDateString() || 'recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="p-2 hover:bg-slate-100 rounded-lg" title="Edit">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDuplicate} className="p-2 hover:bg-slate-100 rounded-lg" title="Duplicate">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-2 hover:bg-rose-100 rounded-lg text-rose-500" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition group">
      <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-16 h-16 text-slate-300" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button onClick={onEdit} className="p-2 bg-white rounded-lg shadow hover:bg-slate-100">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDuplicate} className="p-2 bg-white rounded-lg shadow hover:bg-slate-100">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-slate-800">{resume.name || 'Untitled'}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {resume.updatedAt?.toDate?.()?.toLocaleDateString() || 'recently'}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {resume.views || 0}
              </span>
            </div>
          </div>

          <div className="relative">
            <button onClick={() => setShowMenu((prev) => !prev)} className="p-1 hover:bg-slate-100 rounded">
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                <button onClick={onEdit} className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => {}} className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button onClick={onDelete} className="w-full px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {resume.isPublic && (
          <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
            Public Link Active
          </span>
        )}
      </div>
    </article>
  )
}
