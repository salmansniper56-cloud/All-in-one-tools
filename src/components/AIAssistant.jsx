import { useState } from 'react'
import { X, Sparkles, Copy, Check, Wand2, RefreshCw } from 'lucide-react'

// Pre-built AI suggestions for different sections
const suggestions = {
  summary: {
    professional: [
      "Results-driven professional with {years}+ years of experience in {industry}. Proven track record of {achievement}. Skilled in {skills} with a passion for {passion}.",
      "Dynamic and detail-oriented {title} with expertise in {expertise}. Successfully {accomplishment} resulting in {result}. Committed to delivering exceptional results.",
      "Innovative {title} with a strong background in {background}. Known for {strength} and ability to {ability}. Seeking to leverage skills in a challenging role.",
      "Accomplished professional offering {years} years of experience in {field}. Expert in {expertise} with demonstrated success in {success_area}.",
      "Strategic thinker with hands-on experience in {area}. Track record of {achievement} and driving {metric} improvements."
    ],
    entry_level: [
      "Motivated recent graduate with a degree in {degree}. Eager to apply {skills} in a professional setting. Quick learner with strong {quality}.",
      "Enthusiastic {title} seeking to launch career in {industry}. Strong foundation in {skills} gained through {experience}.",
      "Recent {degree} graduate with internship experience at {company}. Skilled in {skills} and passionate about {passion}."
    ],
    career_change: [
      "Transitioning professional bringing {years} years of transferable skills in {skills}. Ready to apply {experience} to a new career in {new_field}.",
      "Experienced {previous_role} pivoting to {new_role}. Bringing unique perspective and skills in {transferable_skills}."
    ]
  },
  experience: {
    bullets: [
      "Spearheaded {project/initiative} resulting in {quantifiable result}",
      "Increased {metric} by {percentage}% through implementation of {strategy}",
      "Managed team of {number} professionals to deliver {outcome}",
      "Reduced {metric} by {percentage}% by implementing {solution}",
      "Collaborated with cross-functional teams to {achieve outcome}",
      "Developed and executed {strategy} leading to {result}",
      "Streamlined {process} resulting in {time/cost savings}",
      "Led {initiative} that generated ${amount} in revenue/savings",
      "Trained and mentored {number} team members on {skill/process}",
      "Implemented {system/tool} improving efficiency by {percentage}%",
      "Analyzed {data/metrics} to identify opportunities for {improvement}",
      "Delivered {number} projects on time and under budget",
      "Established {process/system} that became company standard",
      "Negotiated contracts worth ${amount} with key stakeholders",
      "Drove {percentage}% growth in {area} through {method}"
    ],
    action_verbs: [
      "Achieved", "Accelerated", "Accomplished", "Administered", "Advanced",
      "Built", "Championed", "Collaborated", "Conceptualized", "Consolidated",
      "Delivered", "Designed", "Developed", "Directed", "Drove",
      "Eliminated", "Engineered", "Established", "Exceeded", "Executed",
      "Facilitated", "Founded", "Generated", "Grew", "Guided",
      "Implemented", "Improved", "Increased", "Initiated", "Innovated",
      "Launched", "Led", "Managed", "Maximized", "Mentored",
      "Negotiated", "Optimized", "Orchestrated", "Organized", "Overhauled",
      "Pioneered", "Planned", "Produced", "Promoted", "Proposed",
      "Reduced", "Restructured", "Revamped", "Secured", "Spearheaded",
      "Streamlined", "Strengthened", "Supervised", "Transformed", "Unified"
    ]
  },
  skills: {
    technical: [
      "JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git",
      "TypeScript", "Java", "C++", "MongoDB", "PostgreSQL", "Kubernetes", "CI/CD",
      "REST APIs", "GraphQL", "Machine Learning", "Data Analysis", "Cloud Computing"
    ],
    soft: [
      "Leadership", "Communication", "Problem Solving", "Team Collaboration",
      "Project Management", "Time Management", "Critical Thinking", "Adaptability",
      "Decision Making", "Conflict Resolution", "Mentoring", "Strategic Planning"
    ],
    tools: [
      "Microsoft Office", "Google Workspace", "Jira", "Slack", "Trello",
      "Figma", "Adobe Creative Suite", "Salesforce", "HubSpot", "Tableau",
      "Power BI", "SAP", "Asana", "Notion", "Confluence"
    ]
  }
}

export default function AIAssistant({ onClose, context, resumeData, onApply }) {
  const [activeTab, setActiveTab] = useState('summary')
  const [selectedType, setSelectedType] = useState('professional')
  const [generatedText, setGeneratedText] = useState('')
  const [copied, setCopied] = useState(false)
  const [jobDescription, setJobDescription] = useState('')

  const generateSummary = () => {
    const templates = suggestions.summary[selectedType]
    const template = templates[Math.floor(Math.random() * templates.length)]
    
    // Fill in some placeholders with resume data or generic text
    let text = template
      .replace('{years}', '5')
      .replace('{industry}', resumeData.personalInfo.jobTitle || 'your industry')
      .replace('{title}', resumeData.personalInfo.jobTitle || 'Professional')
      .replace('{achievement}', 'exceeding targets')
      .replace('{skills}', resumeData.skills.slice(0, 3).map(s => s.name).join(', ') || 'relevant skills')
      .replace('{passion}', 'delivering excellence')
      .replace('{expertise}', 'key areas')
      .replace('{accomplishment}', 'led major projects')
      .replace('{result}', 'significant improvements')
      .replace('{background}', 'the field')
      .replace('{strength}', 'innovative solutions')
      .replace('{ability}', 'drive results')
      .replace('{field}', resumeData.personalInfo.jobTitle || 'the industry')
      .replace('{success_area}', 'achieving goals')
      .replace('{area}', 'multiple domains')
      .replace('{metric}', 'performance')
      .replace('{degree}', 'your field')
      .replace('{quality}', 'analytical skills')
      .replace('{experience}', 'academic projects')
      .replace('{company}', 'leading companies')
      .replace('{previous_role}', 'previous role')
      .replace('{new_role}', 'new role')
      .replace('{new_field}', 'new field')
      .replace('{transferable_skills}', 'communication and leadership')
    
    setGeneratedText(text)
  }

  const generateBullet = () => {
    const bullets = suggestions.experience.bullets
    const bullet = bullets[Math.floor(Math.random() * bullets.length)]
    setGeneratedText(bullet)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const analyzeJobDescription = () => {
    if (!jobDescription) return
    
    // Extract keywords from job description
    const keywords = jobDescription
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4)
      .filter((word, index, self) => self.indexOf(word) === index)
      .slice(0, 15)
    
    const analysis = `Based on the job description, consider including these keywords in your resume:\n\n${keywords.join(', ')}\n\nTip: Match your experience descriptions to the requirements mentioned in the job posting.`
    setGeneratedText(analysis)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-bold">AI Writing Assistant</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {['summary', 'experience', 'skills', 'job-match'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition ${
                activeTab === tab 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Summary Type</label>
                <div className="flex gap-2">
                  {['professional', 'entry_level', 'career_change'].map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedType === type
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateSummary}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                <Wand2 className="w-5 h-5" />
                Generate Summary
              </button>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Get powerful bullet points to describe your experience. Use action verbs and quantify your achievements.
              </p>
              
              <button
                onClick={generateBullet}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                <Wand2 className="w-5 h-5" />
                Generate Bullet Point
              </button>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Action Verbs</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.experience.action_verbs.slice(0, 20).map(verb => (
                    <span 
                      key={verb}
                      onClick={() => setGeneratedText(verb + ' ')}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm cursor-pointer hover:bg-purple-200"
                    >
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.skills.technical.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm cursor-pointer hover:bg-blue-200"
                      onClick={() => setGeneratedText(prev => prev ? prev + ', ' + skill : skill)}
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.skills.soft.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm cursor-pointer hover:bg-green-200"
                      onClick={() => setGeneratedText(prev => prev ? prev + ', ' + skill : skill)}
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Tools & Software</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.skills.tools.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm cursor-pointer hover:bg-orange-200"
                      onClick={() => setGeneratedText(prev => prev ? prev + ', ' + skill : skill)}
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'job-match' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Paste a job description to get keyword suggestions and tailor your resume.
              </p>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-40 px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              <button
                onClick={analyzeJobDescription}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                <Sparkles className="w-5 h-5" />
                Analyze & Extract Keywords
              </button>
            </div>
          )}

          {/* Generated Text Output */}
          {generatedText && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Generated Text</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => activeTab === 'summary' ? generateSummary() : generateBullet()}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-gray-800 whitespace-pre-line">{generatedText}</p>
              
              {activeTab === 'summary' && (
                <button
                  onClick={() => onApply(generatedText, 'personalInfo', 'summary')}
                  className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                >
                  Apply to Resume
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
