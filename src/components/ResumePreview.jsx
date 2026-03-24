import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from 'lucide-react'

export default function ResumePreview({ data, settings, documentType = 'resume' }) {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
    tech: TechTemplate,
    elegant: ElegantTemplate,
    professional: ProfessionalTemplate,
    compact: CompactTemplate,
    bold: BoldTemplate
  }
  
  const Template = templates[settings?.template] || ModernTemplate
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Live {documentType === 'cv' ? 'CV' : 'Resume'} Preview
        </span>
        <span className="text-xs text-gray-400">A4 Format</span>
      </div>
      <div className="p-4 overflow-auto h-[calc(100%-44px)] bg-gray-200">
        <div 
          id="resume-preview"
          className="bg-white shadow-lg mx-auto resume-preview"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            transform: 'scale(0.6)',
            transformOrigin: 'top center',
            fontFamily: settings?.fontFamily || 'Inter'
          }}
        >
          <Template data={data} settings={settings} documentType={documentType} />
        </div>
      </div>
    </div>
  )
}

// Modern Template - Two-column with colored sidebar (Anna Rodriguez style)
function ModernTemplate({ data, settings, documentType = 'resume' }) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards, references } = data
  const primaryColor = settings?.primaryColor || '#d97706'
  
  return (
    <div className="flex min-h-full font-sans">
      {/* Left Sidebar */}
      <div className="w-1/3 text-white" style={{ backgroundColor: '#1a202c' }}>
        {/* Header with colored accent */}
        <div className="p-6" style={{ backgroundColor: primaryColor }}>
          <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            {personalInfo.fullName || 'Your Name'}
          </h1>
        </div>

        <div className="p-6">
          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-gray-600">
              Contacts
            </h2>
            <div className="space-y-2 text-xs">
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-300">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-300">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-300 break-all">{personalInfo.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-gray-600">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
                    <p className="text-sm font-medium">{edu.degree}</p>
                    {edu.field && <p className="text-xs text-gray-300">{edu.field}</p>}
                    <p className="text-xs text-gray-400">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-gray-600">
                Links
              </h2>
              <div className="space-y-2 text-xs">
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3 h-3" style={{ color: primaryColor }} />
                    <span className="text-gray-300">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-3 h-3" style={{ color: primaryColor }} />
                    <span className="text-gray-300">{personalInfo.github}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" style={{ color: primaryColor }} />
                    <span className="text-gray-300">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor }}>
              Professional Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor }}>
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                  <span className="text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs font-medium" style={{ color: primaryColor }}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor }}>
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between text-xs">
                  <span className="text-gray-700">{cert.name} {cert.issuer && `- ${cert.issuer}`}</span>
                  {cert.date && <span className="text-gray-500">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor }}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs text-gray-700">
                  <strong>{lang.language}</strong> - {lang.proficiency}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Classic Template - Clean with photo header (Mike Beckinsale style)
function ClassicTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications, references } = data
  const primaryColor = settings?.primaryColor || '#0ea5e9'
  
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="p-6 flex items-start gap-6 border-b-2 border-gray-200">
        {/* Photo */}
        <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {settings?.showPhoto && personalInfo.photo ? (
            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : '?'}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-medium mt-0.5" style={{ color: primaryColor }}>
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {personalInfo.location}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="w-24 flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500">{exp.startDate}</p>
                    <p className="text-xs text-gray-500">{exp.endDate || 'Present'}</p>
                  </div>
                  <div className="flex-1 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                    <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-xs text-gray-500">{exp.company}</p>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-4">
                  <div className="w-24 flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500">{edu.endDate}</p>
                  </div>
                  <div className="flex-1 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                    <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                    {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                    <p className="text-xs text-gray-500">{edu.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* References */}
          {references?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                References
              </h2>
              <div className="space-y-2">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-xs font-medium text-gray-800">{ref.name}</p>
                    {ref.position && <p className="text-xs text-gray-500">{ref.position}</p>}
                    {ref.contact && <p className="text-xs text-gray-400">{ref.contact}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Languages
              </h2>
              <table className="w-full text-xs">
                <tbody>
                  {languages.map((lang) => (
                    <tr key={lang.id}>
                      <td className="py-0.5 text-gray-700">{lang.language}</td>
                      <td className="py-0.5 text-gray-500">{lang.proficiency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>

        {/* Links */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <section className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              Links
            </h2>
            <div className="flex flex-wrap gap-4 text-xs">
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1 text-gray-600">
                  <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1 text-gray-600">
                  <Github className="w-3 h-3" /> {personalInfo.github}
                </span>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Creative Template - Professional with left sidebar (Alex Simone style)
function CreativeTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications, references } = data
  const primaryColor = settings?.primaryColor || '#0891b2'
  
  return (
    <div className="flex min-h-full font-sans">
      {/* Left Sidebar - Details */}
      <div className="w-1/4 bg-gray-50 p-5 border-r border-gray-200">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">
          Details
        </h2>
        
        <div className="space-y-3 text-xs">
          {personalInfo.location && (
            <div>
              <p className="text-gray-400 uppercase text-[10px] tracking-wider">Address</p>
              <p className="text-gray-700">{personalInfo.location}</p>
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <p className="text-gray-400 uppercase text-[10px] tracking-wider">Phone</p>
              <p className="text-gray-700">{personalInfo.phone}</p>
            </div>
          )}
          {personalInfo.email && (
            <div>
              <p className="text-gray-400 uppercase text-[10px] tracking-wider">Email</p>
              <p className="text-gray-700 break-all">{personalInfo.email}</p>
            </div>
          )}
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <p className="text-gray-400 text-[10px]">{edu.startDate} - {edu.endDate}</p>
                  <p className="text-gray-800 font-medium">{edu.degree}</p>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  <p className="text-gray-500">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <p className="text-gray-700">{skill.name}</p>
                  <div className="w-full h-1 bg-gray-200 rounded-full mt-0.5">
                    <div 
                      className="h-1 rounded-full" 
                      style={{ 
                        width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '60%' : '40%',
                        backgroundColor: primaryColor 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references?.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">
              References
            </h2>
            <div className="space-y-2 text-xs">
              {references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-gray-800 font-medium">{ref.name}</p>
                  {ref.position && <p className="text-gray-500">{ref.position}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">
              Languages
            </h2>
            <table className="w-full text-xs">
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang.id}>
                    <td className="text-gray-700 py-0.5">{lang.language}</td>
                    <td className="text-gray-500 text-right">{lang.proficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Header */}
        <header className="mb-6 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
          <h1 className="text-2xl font-bold text-gray-800">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> {personalInfo.website}
              </span>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-700">
                  {cert.name} {cert.issuer && `- ${cert.issuer}`}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Minimal Template - Right sidebar with boxed sections (Jack Clark style)
function MinimalTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications, projects } = data
  const primaryColor = settings?.primaryColor || '#4b5563'
  
  return (
    <div className="flex min-h-full font-sans">
      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Header */}
        <header className="mb-5">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.email && <span>• {personalInfo.email}</span>}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 text-xs">
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{edu.degree}</p>
                      {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                      <p className="text-xs text-gray-500">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-1/3 bg-gray-50 p-5">
        {/* Photo/Avatar */}
        <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center overflow-hidden">
          {settings?.showPhoto && personalInfo.photo ? (
            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : '?'}
            </span>
          )}
        </div>

        {/* Contact Box */}
        <div className="bg-white p-3 rounded border border-gray-200 mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Contact</h3>
          <div className="space-y-1.5 text-xs">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600 break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Links Box */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="bg-white p-3 rounded border border-gray-200 mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Links</h3>
            <div className="space-y-1.5 text-xs">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{personalInfo.github}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages Box */}
        {languages?.length > 0 && (
          <div className="bg-white p-3 rounded border border-gray-200 mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Languages</h3>
            <div className="space-y-1 text-xs">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-gray-700">{lang.language}</span>
                  <span className="text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Box */}
        {certifications?.length > 0 && (
          <div className="bg-white p-3 rounded border border-gray-200">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Certifications</h3>
            <div className="space-y-1 text-xs">
              {certifications.map((cert) => (
                <p key={cert.id} className="text-gray-700">{cert.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Executive Template - Traditional professional (similar to classic but more formal)
function ExecutiveTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, certifications, languages } = data
  const primaryColor = settings?.primaryColor || '#1e3a5f'
  
  return (
    <div className="font-serif">
      {/* Header */}
      <header className="p-6 text-white" style={{ backgroundColor: primaryColor }}>
        <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        <h1 className="text-3xl font-bold tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-xs opacity-80">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Skills
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs text-gray-700">• {skill.name}</span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs" style={{ color: primaryColor }}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{edu.degree}</p>
                    {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                    <p className="text-xs text-gray-500">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications Grid */}
        <div className="grid grid-cols-2 gap-6">
          {languages?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-xs">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-xs text-gray-700">{cert.name}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Tech Template - Modern developer style with dark header
function TechTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data
  const primaryColor = settings?.primaryColor || '#06b6d4'
  
  return (
    <div className="font-sans text-sm">
      {/* Header */}
      <header className="p-6 bg-gray-900 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {settings?.showPhoto && personalInfo.photo ? (
              <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold" style={{ color: primaryColor }}>
                {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : '?'}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: primaryColor }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-gray-400 text-sm">{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.github && <span>🐙 {personalInfo.github}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6 p-4 bg-gray-100 rounded border-l-4" style={{ borderColor: primaryColor }}>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>// Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="px-2 py-1 bg-gray-800 text-gray-200 rounded text-xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>// Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="p-3 border border-gray-200 rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">{project.name}</span>
                    {project.link && (
                      <span className="text-xs" style={{ color: primaryColor }}>[{project.link}]</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-gray-500 mt-1">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>// Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">{exp.position}</span>
                    <span className="text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  <p style={{ color: primaryColor }}>{exp.company}</p>
                  {exp.description && <p className="text-gray-600 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-wider mb-3" style={{ color: primaryColor }}>// Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <span className="font-bold">{edu.degree}</span>
                {edu.field && <span> in {edu.field}</span>}
                <span className="text-gray-500"> @ {edu.school} ({edu.endDate})</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

// Elegant Template - Sophisticated two-column with accent line
function ElegantTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications, references } = data
  const primaryColor = settings?.primaryColor || '#be185d'
  
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-lg mt-1" style={{ color: primaryColor }}>
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </div>
          {/* Contact on right */}
          <div className="text-right text-xs text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </div>
        <div className="mt-4 h-0.5 w-full" style={{ backgroundColor: primaryColor }}></div>
      </header>

      <div className="flex px-6 pb-6">
        {/* Main Content - 2/3 */}
        <div className="w-2/3 pr-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Profile
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                        <p className="text-xs text-gray-500">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-400 italic">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{edu.degree}</p>
                      {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                      <p className="text-xs text-gray-500">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-400">{edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - 1/3 */}
        <div className="w-1/3 pl-6 border-l border-gray-200">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-xs">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-xs text-gray-700">{cert.name}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Professional Template - Clean corporate style
function ProfessionalTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications } = data
  const primaryColor = settings?.primaryColor || '#1d4ed8'
  
  return (
    <div className="font-sans">
      {/* Header - Full width colored */}
      <header className="px-6 py-5" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-white/80 text-sm mt-0.5">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/70">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
              Professional Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs" style={{ color: primaryColor }}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-white px-2 py-0.5 rounded" style={{ backgroundColor: primaryColor }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-medium text-gray-800">{edu.degree}</p>
                    {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                    <p className="text-xs text-gray-500">{edu.school} • {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="text-xs px-2 py-0.5 text-white rounded"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Compact Template - Dense information layout
function CompactTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications } = data
  const primaryColor = settings?.primaryColor || '#059669'
  
  return (
    <div className="font-sans p-5">
      {/* Header - Compact */}
      <header className="text-center pb-3 mb-4 border-b-2" style={{ borderColor: primaryColor }}>
        <h1 className="text-xl font-bold text-gray-800">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm" style={{ color: primaryColor }}>
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        <div className="flex justify-center flex-wrap gap-3 mt-2 text-[10px] text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Main Content - 2/3 */}
        <div className="col-span-2 space-y-3">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Summary
              </h2>
              <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Experience
              </h2>
              <div className="space-y-2">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-bold text-gray-800">{exp.position}</span>
                        <span className="text-[10px] text-gray-500"> | {exp.company}</span>
                      </div>
                      <span className="text-[9px] text-gray-400">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[10px] text-gray-600 mt-0.5 leading-tight whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-[10px]">
                  <span className="font-medium text-gray-800">{edu.degree}</span>
                  {edu.field && <span className="text-gray-600"> in {edu.field}</span>}
                  <span className="text-gray-500"> - {edu.school}, {edu.endDate}</span>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-3">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Skills
              </h2>
              <div className="text-[10px] text-gray-700">
                {skills.map((s, i) => (
                  <span key={s.id}>{s.name}{i < skills.length - 1 ? ' • ' : ''}</span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Languages
              </h2>
              <div className="space-y-0.5 text-[10px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Certifications
              </h2>
              <div className="text-[10px] text-gray-700">
                {certifications.map((cert) => (
                  <p key={cert.id}>{cert.name}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Bold Template - Strong visual impact with large headers
function BoldTemplate({ data, settings }) {
  const { personalInfo, experience, education, skills, languages, certifications } = data
  const primaryColor = settings?.primaryColor || '#dc2626'
  
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="p-6 pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar Circle */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-wide">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: primaryColor }}>
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" style={{ color: primaryColor }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" style={{ color: primaryColor }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: primaryColor }} /> {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      <div className="px-6 pb-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5" style={{ backgroundColor: primaryColor }}></span>
              <span style={{ color: primaryColor }}>Experience</span>
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="pl-4 border-l-2" style={{ borderColor: primaryColor }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-xs text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs font-medium" style={{ color: primaryColor }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                <span style={{ color: primaryColor }}>Education</span>
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-gray-800">{edu.degree}</p>
                    {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                    <p className="text-xs text-gray-500">{edu.school} • {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5" style={{ backgroundColor: primaryColor }}></span>
                <span style={{ color: primaryColor }}>Skills</span>
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="text-xs px-2 py-0.5 rounded font-medium text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages */}
        {languages?.length > 0 && (
          <section className="mt-5">
            <h2 className="text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5" style={{ backgroundColor: primaryColor }}></span>
              <span style={{ color: primaryColor }}>Languages</span>
            </h2>
            <div className="flex gap-4">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs text-gray-700">
                  <strong>{lang.language}</strong> ({lang.proficiency})
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
