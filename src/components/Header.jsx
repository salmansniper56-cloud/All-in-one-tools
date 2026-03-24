import { useState } from 'react'
import { FileText, Download, ArrowLeft, Sparkles, CheckCircle, Settings, FileText as FileCover } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Header({ 
  onBack, 
  resumeData, 
  settings,
  currentView,
  onViewChange,
  onShowAI,
  onShowATS,
  onShowSettings
}) {
  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview')
    if (!element) return
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`)
  }

  const downloadWord = () => {
    const content = document.getElementById('resume-preview')?.innerHTML || ''
    const blob = new Blob([`
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
        <head><meta charset="utf-8"><title>Resume</title></head>
        <body>${content}</body>
      </html>
    `], { type: 'application/msword' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${resumeData.personalInfo.fullName || 'resume'}.doc`
    link.click()
  }

  const downloadTxt = () => {
    const { personalInfo, experience, education, skills } = resumeData
    let text = `${personalInfo.fullName}\n${personalInfo.jobTitle}\n\n`
    text += `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLocation: ${personalInfo.location}\n\n`
    text += `SUMMARY\n${personalInfo.summary}\n\n`
    text += `EXPERIENCE\n`
    experience.forEach(exp => {
      text += `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n${exp.description}\n\n`
    })
    text += `EDUCATION\n`
    education.forEach(edu => {
      text += `${edu.degree} in ${edu.field} - ${edu.school} (${edu.endDate})\n`
    })
    text += `\nSKILLS\n${skills.map(s => s.name).join(', ')}`
    
    const blob = new Blob([text], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${resumeData.personalInfo.fullName || 'resume'}.txt`
    link.click()
  }

  return (
    <header className="bg-white/95 backdrop-blur shadow-sm border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-slate-900 title-font tracking-tight">All in One Tools</span>
          </div>
          
          {/* View Tabs */}
          <div className="hidden md:flex items-center gap-1 ml-6 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onViewChange('resume')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                currentView === 'resume' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              Resume
            </button>
            <button
              onClick={() => onViewChange('cv')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                currentView === 'cv' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              CV
            </button>
            <button
              onClick={() => onViewChange('cover-letter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                currentView === 'cover-letter' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <FileCover className="w-4 h-4" />
              Cover Letter
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* AI Assistant */}
          <button
            onClick={onShowAI}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium transition"
          >
            <Sparkles className="w-4 h-4" />
            AI Assistant
          </button>

          {/* ATS Checker */}
          <button
            onClick={onShowATS}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition"
          >
            <CheckCircle className="w-4 h-4" />
            ATS Score
          </button>

          {/* Settings */}
          <button
            onClick={onShowSettings}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* Download Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 hidden group-hover:block z-50">
              <button onClick={downloadPDF} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                <span className="text-red-500 font-bold text-xs">PDF</span> Download PDF
              </button>
              <button onClick={downloadWord} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                <span className="text-blue-500 font-bold text-xs">DOC</span> Download Word
              </button>
              <button onClick={downloadTxt} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                <span className="text-gray-500 font-bold text-xs">TXT</span> Download Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
