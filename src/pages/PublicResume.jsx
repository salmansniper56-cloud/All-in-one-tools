import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { resumeService } from '../services/firebaseService'
import ResumePreview from '../components/ResumePreview'
import { QRCodeSVG } from 'qrcode.react'
import { FileText, Download, Share2, AlertCircle } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function PublicResume() {
  const { id } = useParams()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    loadResume()
  }, [id])

  const loadResume = async () => {
    try {
      const data = await resumeService.getPublic(id)
      if (data) {
        setResume(data)
      } else {
        setError('Resume not found or is private')
      }
    } catch (err) {
      setError('Failed to load resume')
    }
    setLoading(false)
  }

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview')
    if (!element) return

    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('resume.pdf')
  }

  const shareResume = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: 'Resume', url })
    } else {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
          <p className="text-gray-600">{error}</p>
          <a href="/" className="inline-block mt-4 text-blue-600 hover:underline">
            Go to homepage
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-800">Resume</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQR(!showQR)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              QR Code
            </button>
            <button
              onClick={shareResume}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-xl p-8 text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Scan to view resume</h3>
            <QRCodeSVG value={window.location.href} size={200} />
            <p className="mt-4 text-sm text-gray-500">{window.location.href}</p>
          </div>
        </div>
      )}

      {/* Resume */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div id="resume-preview">
            <ResumePreview 
              data={resume.data} 
              settings={resume.settings || {}} 
            />
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          Views: {resume.views || 0} • Created with All in One Tools
        </div>
      </main>
    </div>
  )
}
