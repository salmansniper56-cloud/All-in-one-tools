import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Wand2, Wrench, Sparkles } from 'lucide-react'
import ToolSuite from '../components/ToolSuite'

const TOOL_IDS = ['bio', 'youtube-script', 'hashtags', 'image-compressor', 'audio-converter', 'file-changer', 'pdf-editor']

export default function ToolsPage() {
  const navigate = useNavigate()
  const { toolId } = useParams()

  useEffect(() => {
    if (!toolId) return
    if (!TOOL_IDS.includes(toolId)) {
      navigate('/tools', { replace: true })
    }
  }, [toolId, navigate])

  return (
    <div className="min-h-screen luxury-surface">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Creator Suite</p>
              <h1 className="text-xl font-semibold title-font tracking-tight text-slate-900">All in One Tools</h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-black transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mt-0.5">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 title-font tracking-tight">Recommended Starters</h2>
              <p className="text-sm text-slate-600 mt-1">
                Start with Bio Generator, then move to Hashtag Generator and YouTube Script Generator to create complete content flows.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => navigate('/tools/bio')}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-blue-50 text-blue-700 border-blue-200"
                >
                  Bio Generator
                </button>
                <button
                  onClick={() => navigate('/tools/hashtags')}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-rose-50 text-rose-700 border-rose-200"
                >
                  Hashtag Generator
                </button>
                <button
                  onClick={() => navigate('/tools/youtube-script')}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-indigo-50 text-indigo-700 border-indigo-200"
                >
                  YouTube Script
                </button>
                <button
                  onClick={() => navigate('/tools/pdf-editor')}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-red-50 text-red-700 border-red-200"
                >
                  PDF to Word
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Tip: open each tool from the sidebar to discover context-aware suggestions.
          </div>
        </section>

        <ToolSuite
          selectedToolId={toolId || 'bio'}
          onSelectTool={(nextToolId) => navigate(`/tools/${nextToolId}`)}
        />
      </main>
    </div>
  )
}
