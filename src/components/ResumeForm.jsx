import { useState } from 'react'
import { User, Briefcase, GraduationCap, Wrench, Plus, Trash2, ChevronDown, ChevronUp, Globe, Award, FolderGit2, Users, Sparkles, Lightbulb, Camera } from 'lucide-react'

export default function ResumeForm({ data, onChange, onShowAI, documentType = 'resume' }) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    languages: false,
    certifications: false,
    awards: false,
    references: false
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange('personalInfo', { ...data.personalInfo, photo: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      {/* Personal Information */}
      <FormSection
        icon={<User className="w-5 h-5" />}
        title="Personal Information"
        isOpen={openSections.personal}
        onToggle={() => toggleSection('personal')}
      >
        {/* Photo Upload */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative">
            {data.personalInfo.photo ? (
              <img 
                src={data.personalInfo.photo} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
              <Plus className="w-4 h-4 text-white" />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-700">Profile Photo</p>
            <p>Optional. Some employers prefer no photo.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={data.personalInfo.fullName}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, fullName: e.target.value })}
            placeholder="John Doe"
          />
          <Input
            label="Job Title"
            value={data.personalInfo.jobTitle}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, jobTitle: e.target.value })}
            placeholder="Software Engineer"
          />
          <Input
            label="Email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, email: e.target.value })}
            placeholder="john@example.com"
          />
          <Input
            label="Phone"
            value={data.personalInfo.phone}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, phone: e.target.value })}
            placeholder="+1 234 567 8900"
          />
          <Input
            label="Location"
            value={data.personalInfo.location}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, location: e.target.value })}
            placeholder="New York, NY"
          />
          <Input
            label="LinkedIn"
            value={data.personalInfo.linkedin}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
          <Input
            label="Website/Portfolio"
            value={data.personalInfo.website || ''}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, website: e.target.value })}
            placeholder="yourwebsite.com"
          />
          <Input
            label="GitHub"
            value={data.personalInfo.github || ''}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, github: e.target.value })}
            placeholder="github.com/username"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {documentType === 'cv' ? 'Profile / Research Summary' : 'Professional Summary'}
            </label>
            <button
              onClick={() => onShowAI && onShowAI('personalInfo', 'summary')}
              className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              <Sparkles className="w-3 h-3" />
              AI Help
            </button>
          </div>
          <textarea
            value={data.personalInfo.summary}
            onChange={(e) => onChange('personalInfo', { ...data.personalInfo, summary: e.target.value })}
            placeholder={documentType === 'cv'
              ? 'Brief profile, academic focus, research interests, and strengths...'
              : 'Brief summary of your professional background and key strengths...'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
          <SuggestionChips 
            suggestions={[
              "Results-driven professional",
              "with X+ years of experience",
              "Proven track record",
              "Skilled in...",
              "Passionate about..."
            ]}
            onSelect={(text) => {
              const current = data.personalInfo.summary || ''
              onChange('personalInfo', { 
                ...data.personalInfo, 
                summary: current + (current ? ' ' : '') + text 
              })
            }}
          />
        </div>
      </FormSection>

      {/* Experience */}
      <FormSection
        icon={<Briefcase className="w-5 h-5" />}
        title={documentType === 'cv' ? 'Academic & Professional Experience' : 'Work Experience'}
        isOpen={openSections.experience}
        onToggle={() => toggleSection('experience')}
        tip="List your most recent positions first. Use action verbs and quantify achievements."
      >
        <ExperienceList
          items={data.experience}
          onChange={(items) => onChange('experience', items)}
        />
      </FormSection>

      {/* Education */}
      <FormSection
        icon={<GraduationCap className="w-5 h-5" />}
        title="Education"
        isOpen={openSections.education}
        onToggle={() => toggleSection('education')}
      >
        <EducationList
          items={data.education}
          onChange={(items) => onChange('education', items)}
        />
      </FormSection>

      {/* Skills */}
      <FormSection
        icon={<Wrench className="w-5 h-5" />}
        title="Skills"
        isOpen={openSections.skills}
        onToggle={() => toggleSection('skills')}
      >
        <SkillsList
          items={data.skills}
          onChange={(items) => onChange('skills', items)}
        />
      </FormSection>

      {/* Languages */}
      <FormSection
        icon={<Globe className="w-5 h-5" />}
        title="Languages"
        isOpen={openSections.languages}
        onToggle={() => toggleSection('languages')}
      >
        <LanguagesList
          items={data.languages}
          onChange={(items) => onChange('languages', items)}
        />
      </FormSection>

      {/* Certifications */}
      <FormSection
        icon={<Award className="w-5 h-5" />}
        title="Certifications"
        isOpen={openSections.certifications}
        onToggle={() => toggleSection('certifications')}
      >
        <CertificationsList
          items={data.certifications}
          onChange={(items) => onChange('certifications', items)}
        />
      </FormSection>

      {/* Projects */}
      <FormSection
        icon={<FolderGit2 className="w-5 h-5" />}
        title="Projects"
        isOpen={openSections.projects}
        onToggle={() => toggleSection('projects')}
        tip="Showcase personal or professional projects that demonstrate your skills."
      >
        <ProjectsList
          items={data.projects || []}
          onChange={(items) => onChange('projects', items)}
        />
      </FormSection>

      {/* Awards */}
      <FormSection
        icon={<Award className="w-5 h-5" />}
        title="Awards & Achievements"
        isOpen={openSections.awards}
        onToggle={() => toggleSection('awards')}
      >
        <AwardsList
          items={data.awards || []}
          onChange={(items) => onChange('awards', items)}
        />
      </FormSection>

      {/* References */}
      <FormSection
        icon={<Users className="w-5 h-5" />}
        title="References"
        isOpen={openSections.references}
        onToggle={() => toggleSection('references')}
      >
        <ReferencesList
          items={data.references || []}
          onChange={(items) => onChange('references', items)}
        />
      </FormSection>
    </div>
  )
}

function SuggestionChips({ suggestions, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((text, i) => (
        <button
          key={i}
          onClick={() => onSelect(text)}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded transition"
        >
          + {text}
        </button>
      ))}
    </div>
  )
}

function FormSection({ icon, title, isOpen, onToggle, children, tip }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-600">{icon}</div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          {tip && (
            <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {tip}
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}

function Input({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

function ExperienceList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              label="Company"
              value={item.company}
              onChange={(e) => updateItem(item.id, 'company', e.target.value)}
              placeholder="Company Name"
            />
            <Input
              label="Position"
              value={item.position}
              onChange={(e) => updateItem(item.id, 'position', e.target.value)}
              placeholder="Job Title"
            />
            <Input
              label="Start Date"
              value={item.startDate}
              onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
              placeholder="Jan 2020"
            />
            <Input
              label="End Date"
              value={item.endDate}
              onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
              placeholder="Present"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  )
}

function EducationList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="School/University"
              value={item.school}
              onChange={(e) => updateItem(item.id, 'school', e.target.value)}
              placeholder="University Name"
            />
            <Input
              label="Degree"
              value={item.degree}
              onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
              placeholder="Bachelor's, Master's, etc."
            />
            <Input
              label="Field of Study"
              value={item.field}
              onChange={(e) => updateItem(item.id, 'field', e.target.value)}
              placeholder="Computer Science"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Start"
                value={item.startDate}
                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                placeholder="2018"
              />
              <Input
                label="End"
                value={item.endDate}
                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                placeholder="2022"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  )
}

function SkillsList({ items, onChange }) {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange([...items, { id: Date.now(), name: newSkill.trim() }])
      setNewSkill('')
    }
  }

  const removeSkill = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill.id}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {skill.name}
            <button
              onClick={() => removeSkill(skill.id)}
              className="hover:text-blue-900"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

function LanguagesList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, { id: Date.now(), language: '', proficiency: 'Intermediate' }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              label="Language"
              value={item.language}
              onChange={(e) => updateItem(item.id, 'language', e.target.value)}
              placeholder="English"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
            <select
              value={item.proficiency}
              onChange={(e) => updateItem(item.id, 'proficiency', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Native</option>
              <option>Fluent</option>
              <option>Advanced</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Language
      </button>
    </div>
  )
}

function CertificationsList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, { id: Date.now(), name: '', issuer: '', date: '' }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Certification Name"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              placeholder="AWS Solutions Architect"
            />
            <Input
              label="Issuing Organization"
              value={item.issuer}
              onChange={(e) => updateItem(item.id, 'issuer', e.target.value)}
              placeholder="Amazon Web Services"
            />
            <Input
              label="Date"
              value={item.date}
              onChange={(e) => updateItem(item.id, 'date', e.target.value)}
              placeholder="2023"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </button>
    </div>
  )
}

function ProjectsList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              label="Project Name"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              placeholder="E-commerce Platform"
            />
            <Input
              label="Link (Optional)"
              value={item.link}
              onChange={(e) => updateItem(item.id, 'link', e.target.value)}
              placeholder="github.com/project"
            />
          </div>
          <div className="mb-3">
            <Input
              label="Technologies Used"
              value={item.technologies}
              onChange={(e) => updateItem(item.id, 'technologies', e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              placeholder="Describe the project, your role, and achievements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  )
}

function AwardsList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, {
      id: Date.now(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Award Title"
              value={item.title}
              onChange={(e) => updateItem(item.id, 'title', e.target.value)}
              placeholder="Employee of the Year"
            />
            <Input
              label="Issuing Organization"
              value={item.issuer}
              onChange={(e) => updateItem(item.id, 'issuer', e.target.value)}
              placeholder="Company Name"
            />
            <Input
              label="Date"
              value={item.date}
              onChange={(e) => updateItem(item.id, 'date', e.target.value)}
              placeholder="2023"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Award
      </button>
    </div>
  )
}

function ReferencesList({ items, onChange }) {
  const addItem = () => {
    onChange([...items, {
      id: Date.now(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: ''
    }])
  }

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-2">
        💡 Tip: You can also write "References available upon request" on your resume instead.
      </p>
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Full Name"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              placeholder="John Smith"
            />
            <Input
              label="Job Title"
              value={item.title}
              onChange={(e) => updateItem(item.id, 'title', e.target.value)}
              placeholder="Senior Manager"
            />
            <Input
              label="Company"
              value={item.company}
              onChange={(e) => updateItem(item.id, 'company', e.target.value)}
              placeholder="Company Name"
            />
            <Input
              label="Email"
              value={item.email}
              onChange={(e) => updateItem(item.id, 'email', e.target.value)}
              placeholder="john@company.com"
            />
            <Input
              label="Phone"
              value={item.phone}
              onChange={(e) => updateItem(item.id, 'phone', e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Reference
      </button>
    </div>
  )
}
