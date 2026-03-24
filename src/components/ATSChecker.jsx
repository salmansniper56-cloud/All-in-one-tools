import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, XCircle, TrendingUp, FileText, Target } from 'lucide-react'

export default function ATSChecker({ onClose, resumeData }) {
  const [score, setScore] = useState(0)
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    analyzeResume()
  }, [resumeData])

  const analyzeResume = () => {
    const checks = []
    let totalScore = 0
    const maxScore = 100

    // Personal Info Checks (20 points)
    const personalInfo = resumeData.personalInfo
    if (personalInfo.fullName) {
      checks.push({ label: 'Full name included', status: 'pass', points: 4 })
      totalScore += 4
    } else {
      checks.push({ label: 'Full name missing', status: 'fail', points: 0 })
    }

    if (personalInfo.email && personalInfo.email.includes('@')) {
      checks.push({ label: 'Valid email address', status: 'pass', points: 4 })
      totalScore += 4
    } else {
      checks.push({ label: 'Email address missing or invalid', status: 'fail', points: 0 })
    }

    if (personalInfo.phone && personalInfo.phone.length >= 10) {
      checks.push({ label: 'Phone number included', status: 'pass', points: 4 })
      totalScore += 4
    } else {
      checks.push({ label: 'Phone number missing', status: 'fail', points: 0 })
    }

    if (personalInfo.location) {
      checks.push({ label: 'Location included', status: 'pass', points: 4 })
      totalScore += 4
    } else {
      checks.push({ label: 'Location missing', status: 'warn', points: 0 })
    }

    if (personalInfo.linkedin) {
      checks.push({ label: 'LinkedIn profile included', status: 'pass', points: 4 })
      totalScore += 4
    } else {
      checks.push({ label: 'LinkedIn profile recommended', status: 'warn', points: 0 })
    }

    // Summary Check (15 points)
    if (personalInfo.summary && personalInfo.summary.length >= 100) {
      checks.push({ label: 'Professional summary (100+ chars)', status: 'pass', points: 15 })
      totalScore += 15
    } else if (personalInfo.summary && personalInfo.summary.length > 0) {
      checks.push({ label: 'Summary too short (aim for 100+ chars)', status: 'warn', points: 8 })
      totalScore += 8
    } else {
      checks.push({ label: 'Professional summary missing', status: 'fail', points: 0 })
    }

    // Experience Checks (25 points)
    const experience = resumeData.experience
    if (experience.length >= 2) {
      checks.push({ label: '2+ work experiences listed', status: 'pass', points: 10 })
      totalScore += 10
    } else if (experience.length === 1) {
      checks.push({ label: 'Only 1 work experience (add more if possible)', status: 'warn', points: 5 })
      totalScore += 5
    } else {
      checks.push({ label: 'No work experience listed', status: 'fail', points: 0 })
    }

    const hasDescriptions = experience.every(exp => exp.description && exp.description.length > 50)
    if (experience.length > 0 && hasDescriptions) {
      checks.push({ label: 'Detailed job descriptions', status: 'pass', points: 10 })
      totalScore += 10
    } else if (experience.length > 0) {
      checks.push({ label: 'Add more detail to job descriptions', status: 'warn', points: 5 })
      totalScore += 5
    }

    // Check for metrics/numbers in descriptions
    const hasMetrics = experience.some(exp => /\d+%|\$\d+|\d+ (people|team|projects|years)/i.test(exp.description))
    if (hasMetrics) {
      checks.push({ label: 'Quantified achievements included', status: 'pass', points: 5 })
      totalScore += 5
    } else {
      checks.push({ label: 'Add numbers/metrics to achievements', status: 'warn', points: 0 })
    }

    // Education Check (10 points)
    if (resumeData.education.length > 0) {
      checks.push({ label: 'Education section included', status: 'pass', points: 10 })
      totalScore += 10
    } else {
      checks.push({ label: 'Education section missing', status: 'warn', points: 0 })
    }

    // Skills Check (20 points)
    const skills = resumeData.skills
    if (skills.length >= 8) {
      checks.push({ label: '8+ skills listed', status: 'pass', points: 15 })
      totalScore += 15
    } else if (skills.length >= 4) {
      checks.push({ label: '4-7 skills (consider adding more)', status: 'warn', points: 10 })
      totalScore += 10
    } else if (skills.length > 0) {
      checks.push({ label: 'Add more skills (aim for 8+)', status: 'warn', points: 5 })
      totalScore += 5
    } else {
      checks.push({ label: 'Skills section empty', status: 'fail', points: 0 })
    }

    // Keywords Check
    const resumeText = JSON.stringify(resumeData).toLowerCase()
    const commonKeywords = ['managed', 'led', 'developed', 'created', 'implemented', 'achieved', 'improved', 'team', 'project']
    const foundKeywords = commonKeywords.filter(kw => resumeText.includes(kw))
    if (foundKeywords.length >= 5) {
      checks.push({ label: 'Good use of action keywords', status: 'pass', points: 5 })
      totalScore += 5
    } else {
      checks.push({ label: 'Use more action verbs (led, managed, developed)', status: 'warn', points: 0 })
    }

    // Additional sections bonus
    if (resumeData.certifications?.length > 0) {
      checks.push({ label: 'Certifications included', status: 'pass', points: 0, bonus: true })
    }
    if (resumeData.languages?.length > 0) {
      checks.push({ label: 'Languages included', status: 'pass', points: 0, bonus: true })
    }
    if (resumeData.projects?.length > 0) {
      checks.push({ label: 'Projects included', status: 'pass', points: 0, bonus: true })
    }

    setScore(Math.min(totalScore, maxScore))
    setAnalysis(checks)
  }

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }

  const getScoreCircleColor = () => {
    if (score >= 80) return 'stroke-green-500'
    if (score >= 60) return 'stroke-yellow-500'
    return 'stroke-red-500'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <h2 className="text-lg font-bold">ATS Resume Score</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Circle */}
        <div className="p-6 flex flex-col items-center border-b">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${score * 3.52} 352`}
                strokeLinecap="round"
                className={getScoreCircleColor()}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-sm text-gray-500">/ 100</span>
            </div>
          </div>
          <div className={`mt-4 text-lg font-semibold ${getScoreColor()}`}>
            {getScoreLabel()}
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            This score estimates how well your resume will perform with Applicant Tracking Systems.
          </p>
        </div>

        {/* Analysis Results */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Analysis Results</h3>
          <div className="space-y-2">
            {analysis?.map((check, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  check.status === 'pass' ? 'bg-green-50' :
                  check.status === 'warn' ? 'bg-yellow-50' : 'bg-red-50'
                }`}
              >
                {check.status === 'pass' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : check.status === 'warn' ? (
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className={`flex-1 text-sm ${
                  check.status === 'pass' ? 'text-green-800' :
                  check.status === 'warn' ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {check.label}
                </span>
                {check.points > 0 && (
                  <span className="text-xs text-gray-500">+{check.points} pts</span>
                )}
                {check.bonus && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Bonus</span>
                )}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tips to Improve Your Score
            </h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Use keywords from the job description</li>
              <li>• Quantify achievements with numbers and percentages</li>
              <li>• Keep formatting simple and consistent</li>
              <li>• Include all contact information</li>
              <li>• Use standard section headings</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
