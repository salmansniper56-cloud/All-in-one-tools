import { useState } from 'react'
import { Mail, Phone, MapPin, Briefcase, Sparkles, Copy, Download, RefreshCw } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const letterTemplates = [
  {
    id: 'classic-business',
    name: 'Classic Business',
    description: 'Formal corporate letter style'
  },
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description: 'Modern recruiter-friendly format'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Leadership focused premium style'
  },
  {
    id: 'concise',
    name: 'Concise',
    description: 'Short direct style for fast applications'
  }
]

export default function CoverLetterBuilder({ resumeData, settings }) {
  const [letterData, setLetterData] = useState({
    companyName: '',
    hiringManager: '',
    jobTitle: '',
    jobDescription: '',
    whyInterested: '',
    customParagraph: ''
  })
  const [selectedTemplate, setSelectedTemplate] = useState('classic-business')
  const [generatedLetter, setGeneratedLetter] = useState('')

  const generateLetter = () => {
    const { fullName, email, phone, location, jobTitle: currentTitle, summary } = resumeData.personalInfo
    const skills = resumeData.skills.map(s => s.name).slice(0, 5).join(', ')
    const experience = resumeData.experience[0]
    
    const templates = {
      'classic-business': `Dear ${letterData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${letterData.jobTitle || 'position'} at ${letterData.companyName || 'your company'}. With my background as a ${currentTitle || 'professional'} and proven track record of success, I am confident that I would be a valuable addition to your team.

${summary || `Throughout my career, I have developed expertise in ${skills || 'various skills'} that align well with the requirements of this role.`}

${experience ? `In my role at ${experience.company}, I ${experience.description?.split('.')[0] || 'gained valuable experience'}. This experience has prepared me well for the challenges and opportunities that this position presents.` : ''}

${letterData.whyInterested || `I am particularly drawn to ${letterData.companyName || 'your organization'} because of its reputation for excellence and innovation in the industry.`}

${letterData.customParagraph || 'I am excited about the opportunity to bring my unique skills and experience to your team and contribute to your continued success.'}

I would welcome the opportunity to discuss how my qualifications align with your needs. Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${fullName || 'Your Name'}
${email || ''}
${phone || ''}`,

      'modern-clean': `Dear ${letterData.hiringManager || 'Hiring Manager'},

I am thrilled to apply for the ${letterData.jobTitle || 'position'} at ${letterData.companyName || 'your company'}! When I discovered this opportunity, I knew immediately that it was the perfect match for my skills, experience, and career aspirations.

${summary || `As a passionate ${currentTitle || 'professional'} with expertise in ${skills || 'my field'}, I bring enthusiasm and dedication to everything I do.`}

${experience ? `At ${experience.company}, I had the incredible opportunity to ${experience.description?.split('.')[0] || 'make a significant impact'}. These experiences have fueled my passion for excellence and prepared me to make an immediate contribution to your team.` : ''}

${letterData.whyInterested || `What excites me most about ${letterData.companyName || 'your company'} is your commitment to innovation and excellence. I would be honored to be part of such a dynamic organization!`}

${letterData.customParagraph || 'I am eager to bring my energy, creativity, and proven results to your team. I truly believe this is an opportunity where I can make a meaningful impact.'}

I would love the chance to discuss how my enthusiasm and qualifications can benefit your team. Thank you for this exciting opportunity!

Best regards,
${fullName || 'Your Name'}
${email || ''}
${phone || ''}`,

      executive: `Dear ${letterData.hiringManager || 'Hiring Manager'},

    I am applying for the ${letterData.jobTitle || 'position'} at ${letterData.companyName || 'your organization'}.

    As a ${currentTitle || 'results-driven professional'}, I bring strategic execution, stakeholder communication, and measurable outcomes.

    ${summary || `My background includes strong ownership, delivery excellence, and practical leadership across projects.`}

    ${experience ? `At ${experience.company}, I ${experience.description?.split('.')[0] || 'led initiatives that improved team outcomes and business impact'}.` : ''}

    ${letterData.whyInterested || `I am especially interested in ${letterData.companyName || 'your team'} because of its ambition, standards, and long-term impact.`}

    ${letterData.customParagraph || 'I would value the opportunity to discuss how my skills and experience align with your goals.'}

    Sincerely,
    ${fullName || 'Your Name'}
    ${email || ''}
    ${phone || ''}`,

      concise: `Dear ${letterData.hiringManager || 'Hiring Manager'},

I am applying for the ${letterData.jobTitle || 'position'} at ${letterData.companyName || 'your company'}.

Key qualifications:
• ${currentTitle || 'Experienced professional'} with relevant expertise
• Strong skills in ${skills || 'required areas'}
${experience ? `• Proven success at ${experience.company}` : ''}

${letterData.whyInterested || `I am interested in ${letterData.companyName || 'your company'} for its industry leadership and growth opportunities.`}

I am available for an interview at your convenience.

Best regards,
${fullName || 'Your Name'}
${email || ''} | ${phone || ''}`
    }

    setGeneratedLetter(templates[selectedTemplate] || templates['classic-business'])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter)
  }

  const downloadPDF = async () => {
    const element = document.getElementById('cover-letter-preview')
    if (!element) return
    
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('cover-letter.pdf')
  }

  return (
    <div className="max-w-[1800px] mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Template Selection */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Choose Style</h3>
            <div className="grid grid-cols-3 gap-3">
              {letterTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-lg border-2 text-left transition ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-800">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Job Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={letterData.companyName}
                  onChange={(e) => setLetterData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="e.g., Google, Microsoft"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager Name (Optional)</label>
                <input
                  type="text"
                  value={letterData.hiringManager}
                  onChange={(e) => setLetterData(prev => ({ ...prev, hiringManager: e.target.value }))}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={letterData.jobTitle}
                  onChange={(e) => setLetterData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Custom Content */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Personalize</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Why are you interested? (Optional)</label>
                <textarea
                  value={letterData.whyInterested}
                  onChange={(e) => setLetterData(prev => ({ ...prev, whyInterested: e.target.value }))}
                  placeholder="What excites you about this company/role?"
                  className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional paragraph (Optional)</label>
                <textarea
                  value={letterData.customParagraph}
                  onChange={(e) => setLetterData(prev => ({ ...prev, customParagraph: e.target.value }))}
                  placeholder="Add any custom content..."
                  className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateLetter}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
          >
            <Sparkles className="w-5 h-5" />
            Generate Cover Letter
          </button>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
            {/* Preview Header */}
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Cover Letter Preview</span>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-200 rounded transition"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={generateLetter}
                  className="p-2 hover:bg-gray-200 rounded transition"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={downloadPDF}
                  className="p-2 hover:bg-gray-200 rounded transition"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Letter Content */}
            <div 
              id="cover-letter-preview"
              className="p-8 min-h-[600px] bg-white"
              style={{ fontFamily: settings.fontFamily }}
            >
              {generatedLetter ? (
                <div className={`h-full border rounded-lg p-6 ${getLetterTheme(selectedTemplate)}`}>
                  <div className="mb-5 pb-4 border-b">
                    <h3 className="text-xl font-semibold">{resumeData.personalInfo.fullName || 'Your Name'}</h3>
                    <p className="text-sm opacity-80">{resumeData.personalInfo.jobTitle || 'Professional Title'}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {resumeData.personalInfo.email || 'email@example.com'} {resumeData.personalInfo.phone ? `| ${resumeData.personalInfo.phone}` : ''}
                    </p>
                    <p className="text-xs opacity-70">{resumeData.personalInfo.location || 'Your Location'}</p>
                  </div>

                  <div className="text-sm opacity-80 mb-4">
                    <p>{new Date().toLocaleDateString()}</p>
                    <p>{letterData.companyName || 'Target Company'}</p>
                    <p>{letterData.jobTitle || 'Role Applied'}</p>
                  </div>

                  <div className="whitespace-pre-line leading-relaxed text-[15px]">
                    {generatedLetter}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Briefcase className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">Your cover letter will appear here</p>
                  <p className="text-sm">Fill in the details and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getLetterTheme(templateId) {
  const themes = {
    'classic-business': 'bg-white text-gray-800 border-gray-300',
    'modern-clean': 'bg-slate-50 text-slate-800 border-slate-300',
    executive: 'bg-gradient-to-b from-slate-50 to-white text-slate-900 border-slate-400',
    concise: 'bg-white text-gray-800 border-gray-300'
  }

  return themes[templateId] || themes['classic-business']
}
