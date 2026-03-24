import { Check, Palette, Star } from 'lucide-react'
import { useState } from 'react'
import { getSampleTemplate } from './sampleTemplates'

// Pre-made templates with sample data
const templates = [
  { 
    id: 'modern', 
    name: 'Anna Rodriguez', 
    jobTitle: 'Housekeeper',
    color: 'orange', 
    category: 'ats', 
    description: 'Senior Housekeeper - Hyatt Regency Seattle, WA',
    recommended: true,
    previewImage: '/templates/anna-rodriguez.png'
  },
  { 
    id: 'classic', 
    name: 'Mike Beckinsale', 
    jobTitle: 'Finance Officer',
    color: 'sky', 
    category: 'professional', 
    description: 'Finance Manager - Sterling Systems, Philadelphia',
    recommended: true,
    previewImage: '/templates/mike-beckinsale.png'
  },
  { 
    id: 'creative', 
    name: 'Alex Simone', 
    jobTitle: 'Accountant',
    color: 'cyan', 
    category: 'design', 
    description: 'Senior Accountant - Morrison & Associates LLC',
    previewImage: '/templates/alex-simone.png'
  },
  { 
    id: 'minimal', 
    name: 'Jack Clark', 
    jobTitle: 'Office Administrator',
    color: 'gray', 
    category: 'ats', 
    description: 'Office Administrator - Hunter Realty, San Diego',
    previewImage: '/templates/jack-clark.png'
  },
  { 
    id: 'executive', 
    name: 'Sarah Mitchell', 
    jobTitle: 'Marketing Director',
    color: 'navy', 
    category: 'professional', 
    description: 'Marketing Director - Global Tech Solutions',
    recommended: true,
    previewImage: '/templates/sarah-mitchell.png'
  },
  { 
    id: 'tech', 
    name: 'David Chen', 
    jobTitle: 'Software Engineer',
    color: 'cyan', 
    category: 'ats', 
    description: 'Senior Developer - Amazon Web Services',
    previewImage: '/templates/david-chen.png'
  },
  { 
    id: 'elegant', 
    name: 'Emma Thompson', 
    jobTitle: 'HR Manager',
    color: 'pink', 
    category: 'design', 
    description: 'Human Resources Manager - Deloitte Consulting',
    recommended: true,
    previewImage: '/templates/emma-thompson.png'
  },
  { 
    id: 'professional', 
    name: 'James Wilson', 
    jobTitle: 'Sales Manager',
    color: 'blue', 
    category: 'professional', 
    description: 'Regional Sales Manager - Salesforce Inc.',
    previewImage: '/templates/james-wilson.png'
  },
  { 
    id: 'compact', 
    name: 'Lisa Anderson', 
    jobTitle: 'Project Manager',
    color: 'green', 
    category: 'ats', 
    description: 'Senior Project Manager - Microsoft Corp.',
    previewImage: '/templates/lisa-anderson.png'
  },
  { 
    id: 'bold', 
    name: 'Robert Taylor', 
    jobTitle: 'Creative Director',
    color: 'red', 
    category: 'design', 
    description: 'Creative Director - Nike Design Studio',
    previewImage: '/templates/robert-taylor.png'
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'ats', label: 'ATS Friendly' },
  { id: 'design', label: 'Creative' },
]

const colorMap = {
  orange: 'bg-orange-500',
  sky: 'bg-sky-500',
  cyan: 'bg-cyan-600',
  gray: 'bg-gray-500',
  navy: 'bg-indigo-900',
  pink: 'bg-pink-600',
  blue: 'bg-blue-600',
  green: 'bg-emerald-600',
  red: 'bg-red-600',
}

export default function TemplateSelector({ selected, onSelect, settings, onSettingsChange, onLoadSampleData }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const visibleTemplates = activeCategory === 'all'
    ? templates
    : templates.filter((template) => template.category === activeCategory)

  const handleTemplateSelect = (templateId) => {
    onSelect(templateId)
    // Load sample data for the selected template
    if (onLoadSampleData) {
      const sampleData = getSampleTemplate(templateId)
      onLoadSampleData(sampleData)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 title-font tracking-tight">Choose Template</h3>
        <span className="text-xs text-slate-500">{visibleTemplates.length} templates</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-xs rounded-full border transition ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        {visibleTemplates.map(template => {
          return (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`relative p-3 rounded-lg border-2 text-left transition ${
                selected === template.id 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <TemplateMiniPreview
                templateId={template.id}
                style={settings?.primaryColor && selected === template.id ? { '--preview-accent': settings.primaryColor } : undefined}
              />
              <div className="font-semibold text-slate-800 text-sm title-font tracking-tight">
                {template.name}
              </div>
              <div className="text-xs text-slate-500">{template.jobTitle}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{template.description}</div>

              <div className="flex flex-wrap gap-1 mt-2">
                {template.category === 'ats' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">ATS</span>
                )}
                {template.recommended && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 inline-flex items-center gap-1">
                    <Star className="w-2.5 h-2.5" /> Recommended
                  </span>
                )}
              </div>

              {selected === template.id && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Quick Color Picker */}
      {settings && onSettingsChange && (
        <div className="mt-4 pt-4 border-t flex items-center gap-3">
          <Palette className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Accent Color:</span>
          <div className="flex gap-2">
            {['#d97706', '#0ea5e9', '#0891b2', '#4b5563', '#1e3a5f', '#06b6d4', '#dc2626', '#7c3aed'].map(color => (
              <button
                key={color}
                onClick={() => onSettingsChange({ ...settings, primaryColor: color })}
                className={`w-6 h-6 rounded-full transition ${
                  settings.primaryColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => onSettingsChange({ ...settings, primaryColor: e.target.value })}
              className="w-6 h-6 rounded cursor-pointer"
              title="Custom color"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function TemplateMiniPreview({ templateId, style }) {
  const sharedLine = 'h-1.5 rounded bg-slate-200'

  // Modern - Dark sidebar with orange accent
  if (templateId === 'modern') {
    return (
      <div className="mb-2 border rounded-md overflow-hidden h-24 grid grid-cols-3" style={style}>
        <div className="bg-gray-800 p-1.5 space-y-1">
          <div className="h-2 rounded bg-[var(--preview-accent,#d97706)]" />
          <div className="h-1 bg-white/30 rounded w-4/5" />
          <div className="h-1 bg-white/20 rounded w-3/4" />
          <div className="h-1 bg-white/20 rounded w-2/3" />
        </div>
        <div className="col-span-2 bg-white p-2 space-y-1.5">
          <div className="h-1.5 rounded bg-[var(--preview-accent,#d97706)] w-1/2 mb-1" />
          <div className={`${sharedLine} w-full`} />
          <div className={`${sharedLine} w-5/6`} />
          <div className={`${sharedLine} w-4/6`} />
        </div>
      </div>
    )
  }

  // Classic - Clean with photo and timeline
  if (templateId === 'classic') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white overflow-hidden" style={style}>
        <div className="p-2 border-b flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="space-y-1 flex-1">
            <div className="h-1.5 rounded bg-gray-700 w-1/2" />
            <div className="h-1 rounded bg-[var(--preview-accent,#0ea5e9)] w-1/3" />
          </div>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex gap-2">
            <div className="w-6 flex-shrink-0">
              <div className="h-1 bg-gray-200 rounded" />
            </div>
            <div className="flex-1 border-l-2 pl-2 space-y-0.5" style={{ borderColor: 'var(--preview-accent, #0ea5e9)' }}>
              <div className={`${sharedLine} w-full`} />
              <div className={`${sharedLine} w-4/5`} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Creative - Left sidebar with sections
  if (templateId === 'creative') {
    return (
      <div className="mb-2 border rounded-md overflow-hidden h-24 grid grid-cols-4" style={style}>
        <div className="bg-gray-100 p-1.5 space-y-1">
          <div className="h-1 rounded bg-gray-400 w-3/4" />
          <div className="h-1 rounded bg-gray-300 w-full" />
          <div className="h-1 rounded bg-gray-300 w-2/3" />
          <div className="mt-1 h-0.5 rounded bg-[var(--preview-accent,#0891b2)] w-full" />
          <div className="h-0.5 rounded bg-[var(--preview-accent,#0891b2)] w-4/5" />
        </div>
        <div className="col-span-3 bg-white p-2 space-y-1.5">
          <div className="h-1 rounded bg-gray-400 w-1/4" />
          <div className="h-2 rounded bg-gray-700 w-1/2" />
          <div className="mt-1">
            <div className="h-1 rounded bg-[var(--preview-accent,#0891b2)] w-1/4 mb-1" />
            <div className={`${sharedLine} w-full`} />
            <div className={`${sharedLine} w-4/5 mt-0.5`} />
          </div>
        </div>
      </div>
    )
  }

  // Minimal - Right sidebar with boxes
  if (templateId === 'minimal') {
    return (
      <div className="mb-2 border rounded-md overflow-hidden h-24 grid grid-cols-3" style={style}>
        <div className="col-span-2 bg-white p-2 space-y-1">
          <div className="h-1 rounded bg-gray-400 w-1/4" />
          <div className="h-1.5 rounded bg-gray-700 w-1/2" />
          <div className="mt-1">
            <div className="h-1 rounded bg-[var(--preview-accent,#4b5563)] w-1/3 mb-1" />
            <div className={`${sharedLine} w-full`} />
            <div className={`${sharedLine} w-4/5 mt-0.5`} />
          </div>
        </div>
        <div className="bg-gray-50 p-1.5 space-y-1">
          <div className="w-5 h-5 rounded-full bg-gray-200 mx-auto" />
          <div className="bg-white rounded border border-gray-200 p-1 space-y-0.5">
            <div className="h-0.5 rounded bg-gray-300 w-3/4" />
            <div className="h-0.5 rounded bg-gray-300 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // Executive - Colored header
  if (templateId === 'executive') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white overflow-hidden" style={style}>
        <div className="p-1.5 text-white" style={{ backgroundColor: 'var(--preview-accent, #1e3a5f)' }}>
          <div className="h-1 bg-white/40 rounded w-1/4" />
          <div className="h-1.5 bg-white/70 rounded w-2/3 mt-0.5" />
        </div>
        <div className="p-2 space-y-1">
          <div className="h-1 rounded w-1/4" style={{ backgroundColor: 'var(--preview-accent, #1e3a5f)' }} />
          <div className={`${sharedLine} w-full`} />
          <div className={`${sharedLine} w-5/6`} />
          <div className="grid grid-cols-3 gap-1 mt-1">
            <div className="h-1 rounded bg-gray-200" />
            <div className="h-1 rounded bg-gray-200" />
            <div className="h-1 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    )
  }

  // Tech - Dark header
  if (templateId === 'tech') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white overflow-hidden" style={style}>
        <div className="p-1.5 bg-gray-900 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-700" />
          <div className="space-y-0.5">
            <div className="h-1 rounded w-12" style={{ backgroundColor: 'var(--preview-accent, #06b6d4)' }} />
            <div className="h-0.5 bg-gray-500 rounded w-8" />
          </div>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex gap-1">
            <div className="px-1 py-0.5 bg-gray-800 rounded text-[4px] text-white">JS</div>
            <div className="px-1 py-0.5 bg-gray-800 rounded text-[4px] text-white">TS</div>
            <div className="px-1 py-0.5 bg-gray-800 rounded text-[4px] text-white">React</div>
          </div>
          <div className={`${sharedLine} w-full`} />
          <div className={`${sharedLine} w-4/5`} />
        </div>
      </div>
    )
  }

  // Elegant - Two column with accent line
  if (templateId === 'elegant') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white overflow-hidden" style={style}>
        <div className="p-2 pb-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="h-1.5 rounded bg-gray-700 w-16" />
              <div className="h-1 rounded bg-[var(--preview-accent,#be185d)] w-12 mt-0.5" />
            </div>
            <div className="text-right space-y-0.5">
              <div className="h-0.5 rounded bg-gray-300 w-10 ml-auto" />
              <div className="h-0.5 rounded bg-gray-300 w-8 ml-auto" />
            </div>
          </div>
          <div className="h-0.5 w-full mt-1.5" style={{ backgroundColor: 'var(--preview-accent, #be185d)' }} />
        </div>
        <div className="grid grid-cols-3 gap-2 px-2 pb-2">
          <div className="col-span-2 space-y-1">
            <div className={`${sharedLine} w-full`} />
            <div className={`${sharedLine} w-4/5`} />
          </div>
          <div className="border-l pl-2 space-y-1">
            <div className="h-1 rounded bg-gray-200 w-full" />
            <div className="h-1 rounded bg-gray-200 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  // Professional - Colored header
  if (templateId === 'professional') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white overflow-hidden" style={style}>
        <div className="p-2" style={{ backgroundColor: 'var(--preview-accent, #1d4ed8)' }}>
          <div className="h-1.5 rounded bg-white/80 w-1/2" />
          <div className="h-1 rounded bg-white/50 w-1/3 mt-0.5" />
        </div>
        <div className="p-2 space-y-1">
          <div className="h-1 rounded w-1/4" style={{ backgroundColor: 'var(--preview-accent, #1d4ed8)' }} />
          <div className={`${sharedLine} w-full`} />
          <div className={`${sharedLine} w-5/6`} />
          <div className="flex gap-1 mt-1">
            <div className="h-1 rounded w-8" style={{ backgroundColor: 'var(--preview-accent, #1d4ed8)' }} />
            <div className="h-1 rounded w-8" style={{ backgroundColor: 'var(--preview-accent, #1d4ed8)' }} />
          </div>
        </div>
      </div>
    )
  }

  // Compact - Dense layout
  if (templateId === 'compact') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white p-2" style={style}>
        <div className="text-center pb-1 mb-1 border-b" style={{ borderColor: 'var(--preview-accent, #059669)' }}>
          <div className="h-1.5 rounded bg-gray-700 w-1/3 mx-auto" />
          <div className="h-1 rounded w-1/4 mx-auto mt-0.5" style={{ backgroundColor: 'var(--preview-accent, #059669)' }} />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 space-y-0.5">
            <div className={`${sharedLine} w-full`} style={{ height: '3px' }} />
            <div className={`${sharedLine} w-4/5`} style={{ height: '3px' }} />
            <div className={`${sharedLine} w-full`} style={{ height: '3px' }} />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 rounded bg-gray-200 w-full" />
            <div className="h-1 rounded bg-gray-200 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  // Bold - Strong visual
  if (templateId === 'bold') {
    return (
      <div className="mb-2 border rounded-md h-24 bg-white overflow-hidden p-2" style={style}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--preview-accent, #dc2626)' }} />
          <div>
            <div className="h-1.5 rounded bg-gray-800 w-14" />
            <div className="h-1 rounded w-10 mt-0.5" style={{ backgroundColor: 'var(--preview-accent, #dc2626)' }} />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5" style={{ backgroundColor: 'var(--preview-accent, #dc2626)' }} />
            <div className={`${sharedLine} flex-1`} />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5" style={{ backgroundColor: 'var(--preview-accent, #dc2626)' }} />
            <div className={`${sharedLine} flex-1 w-4/5`} />
          </div>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="mb-2 border rounded-md h-24 bg-white p-2 space-y-1.5" style={style}>
      <div className="h-2 rounded bg-[var(--preview-accent,#2563eb)] w-full" />
      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
        <div className="col-span-1 space-y-1">
          <div className="h-1.5 rounded bg-slate-100" />
          <div className="h-1.5 rounded bg-slate-100" />
        </div>
        <div className="col-span-2 space-y-1">
          <div className={`${sharedLine} w-full`} />
          <div className={`${sharedLine} w-5/6`} />
        </div>
      </div>
    </div>
  )
}
