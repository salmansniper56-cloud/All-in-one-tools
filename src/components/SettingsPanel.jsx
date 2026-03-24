import { useState } from 'react'
import { X, Palette, Type, Layout, Maximize } from 'lucide-react'

const colorPresets = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Green', value: '#059669' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Gray', value: '#4b5563' },
  { name: 'Black', value: '#1f2937' },
]

const fontOptions = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
]

const fontSizes = [
  { name: 'Small', value: 'small' },
  { name: 'Medium', value: 'medium' },
  { name: 'Large', value: 'large' },
]

const spacingOptions = [
  { name: 'Compact', value: 'compact' },
  { name: 'Normal', value: 'normal' },
  { name: 'Relaxed', value: 'relaxed' },
]

export default function SettingsPanel({ onClose, settings, onSettingsChange }) {
  const [activeTab, setActiveTab] = useState('colors')

  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Resume Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { id: 'colors', icon: Palette, label: 'Colors' },
            { id: 'fonts', icon: Type, label: 'Fonts' },
            { id: 'layout', icon: Layout, label: 'Layout' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition ${
                activeTab === tab.id 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Primary Color</label>
                <div className="grid grid-cols-5 gap-3">
                  {colorPresets.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateSetting('primaryColor', color.value)}
                      className={`w-full aspect-square rounded-lg relative ${
                        settings.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {settings.primaryColor === color.value && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting('primaryColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    placeholder="#2563eb"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fonts' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => updateSetting('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {fontOptions.map(font => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
                <div className="flex gap-2">
                  {fontSizes.map(size => (
                    <button
                      key={size.value}
                      onClick={() => updateSetting('fontSize', size.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                        settings.fontSize === size.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Preview */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Preview</p>
                <p 
                  className="text-gray-800"
                  style={{ 
                    fontFamily: settings.fontFamily,
                    fontSize: settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px'
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Spacing</label>
                <div className="flex gap-2">
                  {spacingOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('spacing', option.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                        settings.spacing === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showPhoto}
                    onChange={(e) => updateSetting('showPhoto', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Show photo (if uploaded)</span>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Most ATS systems cannot read photos. Consider removing your photo for job applications in the US.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={() => onSettingsChange({
              template: 'modern',
              primaryColor: '#2563eb',
              fontFamily: 'Inter',
              fontSize: 'medium',
              spacing: 'normal',
              showPhoto: false
            })}
            className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Reset to Default
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
