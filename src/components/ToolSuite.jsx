import { useEffect, useMemo, useState } from 'react'
import { Document, HeadingLevel, ImageRun, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import {
  AudioLines,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileCog,
  FileText,
  Hash,
  Image as ImageIcon,
  Lightbulb,
  Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'

GlobalWorkerOptions.workerSrc = pdfWorkerSrc

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const TOOL_MENU = [
  { id: 'bio', label: 'Bio Generator', icon: Sparkles, accent: 'text-indigo-600' },
  { id: 'youtube-script', label: 'YouTube Script Generator', icon: Sparkles, accent: 'text-blue-600' },
  { id: 'hashtags', label: 'Hashtag Generator', icon: Hash, accent: 'text-pink-600' },
  { id: 'image-compressor', label: 'Image Compressor', icon: ImageIcon, accent: 'text-green-600' },
  { id: 'audio-converter', label: 'Audio Converter', icon: AudioLines, accent: 'text-orange-600' },
  { id: 'file-changer', label: 'File Changer', icon: FileCog, accent: 'text-cyan-700' },
  { id: 'pdf-editor', label: 'PDF Editor (to Word)', icon: FileText, accent: 'text-red-600' }
]

const TOOL_RECOMMENDATIONS = {
  bio: {
    title: 'Best Flow for Social Profile Setup',
    tips: [
      'Start with a short role-focused bio and include 2-3 keywords.',
      'Switch tone based on platform: bold for X, professional for LinkedIn.',
      'After bio, generate hashtags for immediate posting support.'
    ],
    nextTools: ['hashtags', 'youtube-script']
  },
  'youtube-script': {
    title: 'Best Flow for Video Content',
    tips: [
      'Use clear audience and outcome to generate stronger hooks.',
      'Keep duration realistic. 5-8 minutes produces tighter scripts.',
      'Generate hashtags right after scripting for better reach.'
    ],
    nextTools: ['hashtags', 'bio']
  },
  hashtags: {
    title: 'Best Flow for Distribution',
    tips: [
      'Use topic keywords that already appear in your script or caption.',
      'Keep hashtag count focused for higher relevance.',
      'Pair with bio updates for profile consistency.'
    ],
    nextTools: ['bio', 'youtube-script']
  },
  'image-compressor': {
    title: 'Best Flow for Image Optimization',
    tips: [
      'Start around 70-80% quality for a strong size-quality balance.',
      'Set max width based on platform to avoid unnecessary file size.',
      'Download and preview before publishing.'
    ],
    nextTools: ['file-changer', 'bio']
  },
  'audio-converter': {
    title: 'Best Flow for Audio Delivery',
    tips: [
      'Use WAV for editing and OGG/WEBM for web-first output.',
      'If MP3 conversion fails, your browser likely does not support it.',
      'Verify playback after conversion before distribution.'
    ],
    nextTools: ['youtube-script', 'hashtags']
  },
  'file-changer': {
    title: 'Best Flow for Data Conversion',
    tips: [
      'Validate source format first to avoid malformed conversion.',
      'Use JSON output when data needs structured reuse.',
      'Download converted file to preserve formatting.'
    ],
    nextTools: ['image-compressor', 'audio-converter']
  },
  'pdf-editor': {
    title: 'Best Flow for PDF to Word Conversion',
    tips: [
      'Upload text-based PDFs for best conversion quality.',
      'Complex layouts may require small manual cleanup in Word.',
      'Choose DOCX for modern editors, or DOC for compatibility.'
    ],
    nextTools: ['file-changer', 'bio']
  }
}

const humanSize = (bytes) => {
  if (!bytes && bytes !== 0) return 'N/A'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let idx = 0
  while (size >= 1024 && idx < units.length - 1) {
    size /= 1024
    idx += 1
  }
  return `${size.toFixed(idx === 0 ? 0 : 2)} ${units[idx]}`
}

const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

const escapeHtml = (value) => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const extractRowsFromPdfItems = (items) => {
  const filtered = items
    .map((item) => ({
      text: item.str?.trim() || '',
      x: item.transform?.[4] ?? 0,
      y: item.transform?.[5] ?? 0
    }))
    .filter((item) => item.text)
    .sort((a, b) => b.y - a.y || a.x - b.x)

  const rows = []
  const yThreshold = 5

  filtered.forEach((item) => {
    const row = rows.find((candidate) => Math.abs(candidate.y - item.y) <= yThreshold)
    if (row) {
      row.cells.push(item)
    } else {
      rows.push({ y: item.y, cells: [item] })
    }
  })

  return rows.map((row) => ({
    ...row,
    cells: row.cells.sort((a, b) => a.x - b.x)
  }))
}

const detectTableLines = (rows) => {
  const candidateRows = rows
    .filter((row) => row.cells.length >= 3)
    .map((row) => row.cells.map((cell) => cell.text))

  if (candidateRows.length < 2) {
    return []
  }

  const width = candidateRows.reduce((max, row) => Math.max(max, row.length), 0)
  const normalize = (row) => [...row, ...Array(Math.max(0, width - row.length)).fill('')]
  const tableRows = candidateRows.slice(0, Math.min(candidateRows.length, 12)).map(normalize)

  const header = tableRows[0]
  const divider = header.map(() => '---')
  const body = tableRows.slice(1)

  return [
    '[Detected Table]',
    `| ${header.join(' | ')} |`,
    `| ${divider.join(' | ')} |`,
    ...body.map((row) => `| ${row.join(' | ')} |`)
  ]
}

// Extract styled content from PDF items with font info
const extractStyledContentFromPdf = async (pdf) => {
  const styledItems = []
  const pageWidth = 612 // Standard letter width in points
  
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()
    const viewport = page.getViewport({ scale: 1 })
    
    // Group items by line (Y position)
    const lineGroups = new Map()
    const yThreshold = 3
    
    textContent.items.forEach((item) => {
      if (!item.str?.trim()) return
      
      const y = Math.round(item.transform[5] / yThreshold) * yThreshold
      const x = item.transform[4]
      const fontSize = Math.abs(item.transform[0]) || 12
      const fontName = item.fontName || ''
      
      // Detect text styling from font name
      const isBold = fontName.toLowerCase().includes('bold') || fontName.includes('Bd')
      const isItalic = fontName.toLowerCase().includes('italic') || fontName.toLowerCase().includes('oblique')
      
      if (!lineGroups.has(y)) {
        lineGroups.set(y, [])
      }
      
      lineGroups.set(y, [...lineGroups.get(y), {
        text: item.str,
        x,
        y: item.transform[5],
        fontSize,
        fontName,
        bold: isBold,
        italic: isItalic,
        width: item.width || 0
      }])
    })
    
    // Sort lines by Y (top to bottom - higher Y is closer to top in PDF)
    const sortedYs = Array.from(lineGroups.keys()).sort((a, b) => b - a)
    
    // Process each line
    let prevFontSize = 12
    sortedYs.forEach((y) => {
      const lineItems = lineGroups.get(y).sort((a, b) => a.x - b.x)
      if (lineItems.length === 0) return
      
      // Combine text on the same line
      const lineText = lineItems.map(item => item.text).join(' ').trim()
      if (!lineText) return
      
      // Get dominant style for the line
      const avgFontSize = lineItems.reduce((sum, item) => sum + item.fontSize, 0) / lineItems.length
      const hasBold = lineItems.some(item => item.bold)
      const hasItalic = lineItems.some(item => item.italic)
      
      // Detect if this is a heading (larger font, possibly bold, shorter text)
      const isHeading = avgFontSize > prevFontSize + 2 || (avgFontSize >= 14 && hasBold && lineText.length < 100)
      
      // Detect bullet points
      const isBullet = lineText.startsWith('•') || lineText.startsWith('-') || lineText.startsWith('◦') || 
                       lineText.match(/^[\d]+[\.\)]\s/) || lineText.startsWith('*')
      
      // Detect table-like content (multiple items with consistent spacing)
      const isTableRow = lineItems.length >= 3 && lineItems.every((item, idx) => {
        if (idx === 0) return true
        return (item.x - lineItems[idx - 1].x) > 50
      })
      
      // Determine alignment based on x position
      const avgX = lineItems.reduce((sum, item) => sum + item.x, 0) / lineItems.length
      let alignment = 'LEFT'
      if (avgX > pageWidth * 0.4 && avgX < pageWidth * 0.6) {
        alignment = 'CENTER'
      } else if (avgX > pageWidth * 0.7) {
        alignment = 'RIGHT'
      }
      
      if (isTableRow) {
        // Store as potential table row
        styledItems.push({
          type: 'table-row',
          cells: lineItems.map(item => item.text),
          fontSize: avgFontSize,
          pageNum
        })
      } else if (isBullet) {
        styledItems.push({
          type: 'list-item',
          text: lineText.replace(/^[•\-◦\*]\s*/, '').replace(/^[\d]+[\.\)]\s*/, ''),
          fontSize: avgFontSize,
          bold: hasBold,
          italic: hasItalic,
          pageNum
        })
      } else if (isHeading) {
        styledItems.push({
          type: 'heading',
          text: lineText,
          fontSize: avgFontSize,
          bold: hasBold,
          pageNum
        })
      } else {
        styledItems.push({
          type: 'paragraph',
          text: lineText,
          fontSize: avgFontSize,
          bold: hasBold,
          italic: hasItalic,
          alignment,
          pageNum
        })
      }
      
      prevFontSize = avgFontSize
    })
    
    // Add page break indicator (except for last page)
    if (pageNum < pdf.numPages) {
      styledItems.push({ type: 'page-break', pageNum })
    }
  }
  
  // Post-process to combine consecutive table rows into tables
  const processedItems = []
  let currentTableRows = []
  
  styledItems.forEach((item) => {
    if (item.type === 'table-row') {
      currentTableRows.push(item.cells)
    } else {
      if (currentTableRows.length >= 2) {
        // We have a table
        processedItems.push({
          type: 'table',
          rows: currentTableRows
        })
      } else if (currentTableRows.length === 1) {
        // Single row - treat as paragraph
        processedItems.push({
          type: 'paragraph',
          text: currentTableRows[0].join(' | ')
        })
      }
      currentTableRows = []
      
      if (item.type !== 'page-break') {
        processedItems.push(item)
      }
    }
  })
  
  // Don't forget remaining table rows
  if (currentTableRows.length >= 2) {
    processedItems.push({
      type: 'table',
      rows: currentTableRows
    })
  } else if (currentTableRows.length === 1) {
    processedItems.push({
      type: 'paragraph',
      text: currentTableRows[0].join(' | ')
    })
  }
  
  return processedItems
}

const createDocBlob = (title, text) => {
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111827; }
          h1 { font-size: 16pt; margin-bottom: 6px; }
          p { margin: 0 0 10px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(text)}</p>
      </body>
    </html>
  `

  return new Blob([html], { type: 'application/msword' })
}

const createDocxBlob = async (title, text, styledItems = null) => {
  // If we have styled items from PDF extraction, use them for better formatting
  if (styledItems && styledItems.length > 0) {
    const children = []
    
    styledItems.forEach((item) => {
      if (item.type === 'heading') {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: item.text,
                bold: true,
                size: item.fontSize ? Math.round(item.fontSize * 2) : 28,
                color: item.color || '000000'
              })
            ],
            spacing: { before: 200, after: 100 }
          })
        )
      } else if (item.type === 'paragraph') {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: item.text,
                size: item.fontSize ? Math.round(item.fontSize * 2) : 22,
                color: item.color || '000000',
                bold: item.bold || false,
                italics: item.italic || false
              })
            ],
            alignment: item.alignment || AlignmentType.LEFT,
            spacing: { after: 120 }
          })
        )
      } else if (item.type === 'list-item') {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${item.text}`,
                size: item.fontSize ? Math.round(item.fontSize * 2) : 22,
                color: item.color || '000000'
              })
            ],
            indent: { left: 720 },
            spacing: { after: 60 }
          })
        )
      } else if (item.type === 'table' && item.rows) {
        const tableRows = item.rows.map((row) =>
          new TableRow({
            children: row.map((cellText) =>
              new TableCell({
                children: [new Paragraph({ text: cellText || '' })],
                width: { size: 100 / row.length, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                  left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                  right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
                }
              })
            )
          })
        )
        if (tableRows.length > 0) {
          children.push(
            new Table({
              rows: tableRows,
              width: { size: 100, type: WidthType.PERCENTAGE }
            })
          )
          children.push(new Paragraph({ text: '' })) // spacing after table
        }
      } else if (item.type === 'image' && item.data) {
        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: item.data,
                transformation: {
                  width: item.width || 400,
                  height: item.height || 300
                }
              })
            ]
          })
        )
      } else {
        // Default text
        children.push(
          new Paragraph({
            text: item.text || ''
          })
        )
      }
    })

    const doc = new Document({
      sections: [{ children }]
    })
    return Packer.toBlob(doc)
  }

  // Fallback to simple text conversion
  const lines = text.split('\n')
  const children = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1
    })
  ]

  lines.forEach((line) => {
    children.push(
      new Paragraph({
        text: line || ' '
      })
    )
  })

  const doc = new Document({
    sections: [
      {
        children
      }
    ]
  })

  return Packer.toBlob(doc)
}

const toDataRows = (value) => {
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return lines.map((line) => line.split(',').map((item) => item.trim()))
}

const rowsToCsv = (rows) => {
  return rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n')
}

const encodeWav = (audioBuffer) => {
  const channels = audioBuffer.numberOfChannels
  const sampleRate = audioBuffer.sampleRate
  const frameCount = audioBuffer.length
  const bytesPerSample = 2
  const blockAlign = channels * bytesPerSample
  const buffer = new ArrayBuffer(44 + frameCount * blockAlign)
  const view = new DataView(buffer)

  const writeString = (offset, text) => {
    for (let i = 0; i < text.length; i += 1) {
      view.setUint8(offset + i, text.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + frameCount * blockAlign, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, channels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bytesPerSample * 8, true)
  writeString(36, 'data')
  view.setUint32(40, frameCount * blockAlign, true)

  const channelData = []
  for (let channel = 0; channel < channels; channel += 1) {
    channelData.push(audioBuffer.getChannelData(channel))
  }

  let offset = 44
  for (let i = 0; i < frameCount; i += 1) {
    for (let channel = 0; channel < channels; channel += 1) {
      const sample = clamp(channelData[channel][i], -1, 1)
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      offset += 2
    }
  }

  return new Blob([buffer], { type: 'audio/wav' })
}

async function convertAudio(file, targetFormat) {
  const raw = await file.arrayBuffer()
  const context = new AudioContext()
  const audioBuffer = await context.decodeAudioData(raw.slice(0))
  await context.close()

  if (targetFormat === 'wav') {
    return encodeWav(audioBuffer)
  }

  if (!window.MediaRecorder) {
    throw new Error('MediaRecorder is not available in this browser')
  }

  const mimeMap = {
    ogg: 'audio/ogg;codecs=opus',
    mp3: 'audio/mpeg',
    webm: 'audio/webm;codecs=opus'
  }

  const mimeType = mimeMap[targetFormat]
  if (!mimeType || !MediaRecorder.isTypeSupported(mimeType)) {
    throw new Error(`This browser does not support ${targetFormat.toUpperCase()} output`)
  }

  return new Promise(async (resolve, reject) => {
    const realtime = new AudioContext()
    const source = realtime.createBufferSource()
    source.buffer = audioBuffer

    const destination = realtime.createMediaStreamDestination()
    source.connect(destination)

    const chunks = []
    const recorder = new MediaRecorder(destination.stream, { mimeType })

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data)
    }

    recorder.onerror = () => {
      reject(new Error('Audio conversion failed while recording stream'))
    }

    recorder.onstop = async () => {
      await realtime.close()
      resolve(new Blob(chunks, { type: mimeType }))
    }

    recorder.start()
    source.start(0)
    source.onended = () => recorder.stop()
  })
}

export default function ToolSuite({ selectedToolId = 'bio', onSelectTool }) {
  const [copied, setCopied] = useState(false)

  const [bioInput, setBioInput] = useState({
    name: '',
    role: '',
    tone: 'professional',
    platform: 'instagram',
    keywords: ''
  })
  const [bioOutput, setBioOutput] = useState('')

  const [scriptInput, setScriptInput] = useState({
    topic: '',
    audience: '',
    duration: '5',
    goal: '',
    callToAction: ''
  })
  const [scriptOutput, setScriptOutput] = useState('')

  const [hashtagInput, setHashtagInput] = useState({
    topic: '',
    platform: 'instagram',
    count: 20
  })
  const [hashtagOutput, setHashtagOutput] = useState('')

  const [imageFile, setImageFile] = useState(null)
  const [imageQuality, setImageQuality] = useState(0.75)
  const [imageMaxWidth, setImageMaxWidth] = useState(1600)
  const [compressedImage, setCompressedImage] = useState(null)
  const [compressing, setCompressing] = useState(false)

  const [audioFile, setAudioFile] = useState(null)
  const [audioTarget, setAudioTarget] = useState('wav')
  const [convertedAudio, setConvertedAudio] = useState(null)
  const [convertingAudio, setConvertingAudio] = useState(false)

  const [textSource, setTextSource] = useState('')
  const [sourceFormat, setSourceFormat] = useState('csv')
  const [targetFormat, setTargetFormat] = useState('json')
  const [convertedText, setConvertedText] = useState('')

  const [pdfFile, setPdfFile] = useState(null)
  const [pdfExportFormat, setPdfExportFormat] = useState('docx')
  const [pdfConvertMode, setPdfConvertMode] = useState('editable')
  const [pdfUseOcr, setPdfUseOcr] = useState(true)
  const [convertingPdf, setConvertingPdf] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [convertedPdfDoc, setConvertedPdfDoc] = useState(null)

  const keywordList = useMemo(() => {
    return bioInput.keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5)
  }, [bioInput.keywords])

  useEffect(() => {
    const validTool = TOOL_MENU.some((tool) => tool.id === selectedToolId)
    if (!validTool && onSelectTool) {
      onSelectTool('bio')
    }
  }, [selectedToolId, onSelectTool])

  useEffect(() => {
    if (pdfConvertMode === 'preserve-layout' && pdfExportFormat !== 'docx') {
      setPdfExportFormat('docx')
    }
  }, [pdfConvertMode, pdfExportFormat])

  const generateBio = () => {
    const role = bioInput.role || 'creator'
    const name = bioInput.name || 'Your Name'
    const keywords = keywordList.length ? keywordList.join(' | ') : 'growth | creativity | consistency'

    const templates = {
      professional: `${name} | ${role}\nHelping people get better results with practical ideas.\n${keywords}`,
      friendly: `Hey, I am ${name}! ${role} by day, idea machine by night.\nSharing real tips, behind-the-scenes, and lessons learned.\n${keywords}`,
      bold: `${name} - ${role}.\nBuilding loudly. Learning fast. Posting value every week.\n${keywords}`
    }

    const platformTail = {
      instagram: '\nDM for collabs.',
      youtube: '\nNew videos weekly. Subscribe for actionable content.',
      linkedin: '\nOpen to speaking, consulting, and partnerships.',
      x: '\nFollow for sharp threads and experiments.'
    }

    setBioOutput(`${templates[bioInput.tone]}${platformTail[bioInput.platform] || ''}`)
  }

  const generateScript = () => {
    const topic = scriptInput.topic || 'your topic'
    const audience = scriptInput.audience || 'your audience'
    const goal = scriptInput.goal || 'deliver practical value'
    const minutes = Number(scriptInput.duration) || 5
    const segments = Math.max(3, Math.min(8, Math.round(minutes)))

    const lines = [
      `Title: ${topic} in ${minutes} Minutes`,
      '',
      'Hook (0:00-0:20):',
      `Ask a strong question for ${audience} and promise one clear outcome.`,
      '',
      'Intro (0:20-0:50):',
      `Introduce the pain point and why this matters now. Goal: ${goal}.`,
      ''
    ]

    for (let i = 1; i <= segments; i += 1) {
      lines.push(`Main Point ${i}:`)
      lines.push(`Explain one practical idea about ${topic}, then show a mini example.`)
      lines.push('')
    }

    lines.push('Wrap-Up:')
    lines.push('Summarize the key takeaways in 3 bullets and reinforce the result.')
    lines.push('')
    lines.push(`Call to Action: ${scriptInput.callToAction || 'Like, subscribe, and comment your biggest challenge.'}`)

    setScriptOutput(lines.join('\n'))
  }

  const generateHashtags = () => {
    const topic = hashtagInput.topic
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)

    if (!topic.length) {
      toast.error('Enter a topic first')
      return
    }

    const platformTags = {
      instagram: ['instagrowth', 'contentcreator', 'viralreels', 'socialmediatips'],
      youtube: ['youtubetips', 'youtubegrowth', 'videoideas', 'contentstrategy'],
      linkedin: ['careergrowth', 'personalbranding', 'professionaldevelopment', 'leadership'],
      x: ['buildinpublic', 'creatoreconomy', 'marketingtips', 'contentmarketing']
    }

    const base = topic.map((word) => `#${word}`).slice(0, 6)
    const combos = topic.slice(0, 4).map((word, index) => `#${word}${topic[(index + 1) % topic.length] || 'tips'}`)
    const platform = (platformTags[hashtagInput.platform] || []).map((tag) => `#${tag}`)

    const all = [...new Set([...base, ...combos, ...platform])].slice(0, hashtagInput.count)
    setHashtagOutput(all.join(' '))
  }

  const copyText = async (value) => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const compressImage = async () => {
    if (!imageFile) {
      toast.error('Select an image first')
      return
    }

    setCompressing(true)
    try {
      const img = new Image()
      const fileUrl = URL.createObjectURL(imageFile)
      img.src = fileUrl

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const width = Math.min(img.width, imageMaxWidth)
      const height = Math.round((img.height * width) / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', imageQuality)
      })

      URL.revokeObjectURL(fileUrl)

      if (!blob) throw new Error('Compression failed')

      setCompressedImage({
        blob,
        url: URL.createObjectURL(blob),
        name: imageFile.name.replace(/\.[^.]+$/, '') + '-compressed.jpg',
        originalSize: imageFile.size,
        compressedSize: blob.size
      })
      toast.success('Image compressed')
    } catch (error) {
      toast.error(error.message || 'Failed to compress image')
    } finally {
      setCompressing(false)
    }
  }

  const handleAudioConvert = async () => {
    if (!audioFile) {
      toast.error('Select an audio file first')
      return
    }

    setConvertingAudio(true)
    try {
      const blob = await convertAudio(audioFile, audioTarget)
      const base = audioFile.name.replace(/\.[^.]+$/, '')
      setConvertedAudio({
        blob,
        url: URL.createObjectURL(blob),
        name: `${base}.${audioTarget}`,
        sourceSize: audioFile.size,
        outputSize: blob.size
      })
      toast.success('Audio converted')
    } catch (error) {
      toast.error(error.message || 'Audio conversion failed')
    } finally {
      setConvertingAudio(false)
    }
  }

  const convertTextFormats = () => {
    try {
      if (!textSource.trim()) {
        toast.error('Enter file content first')
        return
      }

      let rows = []

      if (sourceFormat === 'csv') {
        rows = toDataRows(textSource)
      } else if (sourceFormat === 'json') {
        const parsed = JSON.parse(textSource)
        if (Array.isArray(parsed)) {
          rows = parsed.map((item) => Object.values(item))
        } else {
          rows = [Object.values(parsed)]
        }
      } else {
        rows = textSource
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => [line])
      }

      let output = ''
      if (targetFormat === 'csv') {
        output = rowsToCsv(rows)
      } else if (targetFormat === 'json') {
        output = JSON.stringify(rows.map((row, index) => ({ row: index + 1, values: row })), null, 2)
      } else {
        output = rows.map((row) => row.join(' | ')).join('\n')
      }

      setConvertedText(output)
    } catch (error) {
      toast.error('Could not convert this content')
    }
  }

  const convertPdfToWord = async () => {
    if (!pdfFile) {
      toast.error('Select a PDF file first')
      return
    }

    setConvertingPdf(true)
    try {
      const raw = await pdfFile.arrayBuffer()
      const loadingTask = getDocument({ data: raw })
      const pdf = await loadingTask.promise

      if (pdfConvertMode === 'preserve-layout') {
        if (pdfExportFormat !== 'docx') {
          throw new Error('Preserve layout mode supports DOCX output only')
        }

        const pageSections = []
        for (let i = 1; i <= pdf.numPages; i += 1) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 2 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = viewport.width
          canvas.height = viewport.height

          await page.render({ canvasContext: context, viewport }).promise
          const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1))
          if (!pngBlob) {
            throw new Error('Failed to render PDF page image')
          }

          const imageBuffer = await pngBlob.arrayBuffer()
          pageSections.push({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBuffer,
                    transformation: {
                      width: 560,
                      height: Math.round((viewport.height / viewport.width) * 560)
                    }
                  })
                ]
              })
            ]
          })
        }

        const fileBase = pdfFile.name.replace(/\.[^.]+$/, '')
        const visualDoc = new Document({ sections: pageSections })
        const blob = await Packer.toBlob(visualDoc)
        setConvertedPdfDoc({
          blob,
          name: `${fileBase}.docx`,
          preview: 'Visual-preserved DOCX generated. Layout and design are kept as page images.',
          pageCount: pdf.numPages,
          tableCount: 0,
          ocrPageCount: 0,
          sourceSize: pdfFile.size,
          outputSize: blob.size,
          mode: 'preserve-layout'
        })
        toast.success('PDF converted with preserved layout')
        return
      }

      // Editable mode - extract styled content
      let styledItems = []
      let tableCount = 0
      let ocrPageCount = 0
      const pages = []

      // Try to extract styled content for better Word formatting
      if (pdfExportFormat === 'docx') {
        try {
          styledItems = await extractStyledContentFromPdf(pdf)
          // Count tables
          tableCount = styledItems.filter(item => item.type === 'table').length
        } catch (e) {
          console.log('Styled extraction failed, falling back to basic:', e)
        }
      }

      const runOcrOnPage = async (page) => {
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: context, viewport }).promise

        const { recognize } = await import('tesseract.js')
        const result = await recognize(canvas, 'eng', {
          logger: (message) => {
            if (message?.status === 'recognizing text') {
              setOcrProgress(Math.round((message.progress || 0) * 100))
            }
          }
        })

        return result?.data?.text?.trim() || ''
      }

      // If styled extraction found content, use it
      if (styledItems.length > 0 && pdfExportFormat === 'docx') {
        const fileBase = pdfFile.name.replace(/\.[^.]+$/, '')
        const blob = await createDocxBlob(fileBase, '', styledItems)
        const fileName = `${fileBase}.docx`
        
        // Generate preview text
        const previewText = styledItems
          .filter(item => item.text)
          .map(item => item.text)
          .join('\n')
          .slice(0, 1200)

        setConvertedPdfDoc({
          blob,
          name: fileName,
          preview: previewText || 'Document converted with preserved formatting.',
          pageCount: pdf.numPages,
          tableCount,
          ocrPageCount: 0,
          sourceSize: pdfFile.size,
          outputSize: blob.size,
          mode: 'editable-styled'
        })
        toast.success('PDF converted to DOCX with formatting preserved')
        return
      }

      // Fallback to basic text extraction
      for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        const rows = extractRowsFromPdfItems(textContent.items || [])
        const textLines = rows.map((row) => row.cells.map((cell) => cell.text).join(' ')).filter(Boolean)
        const tableLines = detectTableLines(rows)
        if (tableLines.length) {
          tableCount += 1
        }

        let pageText = textLines.join('\n').trim()
        if (!pageText && pdfUseOcr) {
          pageText = await runOcrOnPage(page)
          if (pageText) {
            ocrPageCount += 1
          }
        }

        pages.push(
          [
            `Page ${i}`,
            pageText || '[No text extracted]',
            tableLines.length ? `\n${tableLines.join('\n')}` : ''
          ].join('\n')
        )
      }

      setOcrProgress(100)

      const extractedText = pages.join('\n\n').trim()
      if (!extractedText) {
        throw new Error('No readable text found in this PDF')
      }

      const fileBase = pdfFile.name.replace(/\.[^.]+$/, '')
      let blob
      let fileName
      if (pdfExportFormat === 'docx') {
        blob = await createDocxBlob(fileBase, extractedText)
        fileName = `${fileBase}.docx`
      } else {
        blob = createDocBlob(fileBase, extractedText)
        fileName = `${fileBase}.doc`
      }

      setConvertedPdfDoc({
        blob,
        name: fileName,
        preview: extractedText.slice(0, 1200),
        pageCount: pdf.numPages,
        tableCount,
        ocrPageCount,
        sourceSize: pdfFile.size,
        outputSize: blob.size,
        mode: 'editable'
      })
      toast.success(`PDF converted to ${pdfExportFormat.toUpperCase()}`)
    } catch (error) {
      toast.error(error.message || 'Failed to convert PDF')
    } finally {
      setConvertingPdf(false)
      setOcrProgress(0)
    }
  }

  const selectedTool = TOOL_MENU.find((tool) => tool.id === selectedToolId) || TOOL_MENU[0]
  const recommendations = TOOL_RECOMMENDATIONS[selectedTool.id]

  const renderToolContent = () => {
    switch (selectedTool.id) {
      case 'bio':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={Sparkles} accent="text-indigo-600" title="Bio Generator" subtitle="Create platform-ready bios in seconds." />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Name" value={bioInput.name} onChange={(e) => setBioInput({ ...bioInput, name: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Role or niche" value={bioInput.role} onChange={(e) => setBioInput({ ...bioInput, role: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Keywords (comma separated)" value={bioInput.keywords} onChange={(e) => setBioInput({ ...bioInput, keywords: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <select className="border rounded-lg px-3 py-2" value={bioInput.tone} onChange={(e) => setBioInput({ ...bioInput, tone: e.target.value })}>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="bold">Bold</option>
              </select>
              <select className="border rounded-lg px-3 py-2" value={bioInput.platform} onChange={(e) => setBioInput({ ...bioInput, platform: e.target.value })}>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="linkedin">LinkedIn</option>
                <option value="x">X</option>
              </select>
            </div>
            <button onClick={generateBio} className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">Generate Bio</button>
            {bioOutput && <OutputCard copied={copied} onCopy={() => copyText(bioOutput)} value={bioOutput} />}
          </section>
        )

      case 'youtube-script':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={Sparkles} accent="text-blue-600" title="YouTube Script Generator" subtitle="Generate structured scripts with hook, flow, and CTA." />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Video topic" value={scriptInput.topic} onChange={(e) => setScriptInput({ ...scriptInput, topic: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Target audience" value={scriptInput.audience} onChange={(e) => setScriptInput({ ...scriptInput, audience: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full border rounded-lg px-3 py-2" type="number" min="1" max="30" value={scriptInput.duration} onChange={(e) => setScriptInput({ ...scriptInput, duration: e.target.value })} placeholder="Duration (min)" />
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Goal" value={scriptInput.goal} onChange={(e) => setScriptInput({ ...scriptInput, goal: e.target.value })} />
            </div>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Call to action" value={scriptInput.callToAction} onChange={(e) => setScriptInput({ ...scriptInput, callToAction: e.target.value })} />
            <button onClick={generateScript} className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">Generate Script</button>
            {scriptOutput && <OutputCard copied={copied} onCopy={() => copyText(scriptOutput)} value={scriptOutput} />}
          </section>
        )

      case 'hashtags':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={Hash} accent="text-pink-600" title="Hashtag Generator" subtitle="Create smart hashtags by topic and platform." />
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Topic or caption" value={hashtagInput.topic} onChange={(e) => setHashtagInput({ ...hashtagInput, topic: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <select className="border rounded-lg px-3 py-2" value={hashtagInput.platform} onChange={(e) => setHashtagInput({ ...hashtagInput, platform: e.target.value })}>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="linkedin">LinkedIn</option>
                <option value="x">X</option>
              </select>
              <input className="border rounded-lg px-3 py-2" type="number" min="5" max="40" value={hashtagInput.count} onChange={(e) => setHashtagInput({ ...hashtagInput, count: Number(e.target.value) })} />
            </div>
            <button onClick={generateHashtags} className="w-full bg-pink-600 text-white rounded-lg py-2 hover:bg-pink-700">Generate Hashtags</button>
            {hashtagOutput && <OutputCard copied={copied} onCopy={() => copyText(hashtagOutput)} value={hashtagOutput} />}
          </section>
        )

      case 'image-compressor':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={ImageIcon} accent="text-green-600" title="Image Compressor" subtitle="Reduce image size while maintaining visual quality." />
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border rounded-lg px-3 py-2" />
            <label className="text-sm text-gray-700">Quality: {Math.round(imageQuality * 100)}%</label>
            <input type="range" min="0.2" max="1" step="0.05" value={imageQuality} onChange={(e) => setImageQuality(Number(e.target.value))} className="w-full" />
            <label className="text-sm text-gray-700">Max Width (px)</label>
            <input type="number" min="400" max="4000" value={imageMaxWidth} onChange={(e) => setImageMaxWidth(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" />
            <button onClick={compressImage} disabled={compressing} className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 disabled:opacity-60">
              {compressing ? 'Compressing...' : 'Compress Image'}
            </button>
            {compressedImage && (
              <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                <img src={compressedImage.url} alt="Compressed preview" className="w-full max-h-72 object-contain rounded" />
                <p className="text-sm text-gray-700">{humanSize(compressedImage.originalSize)} {'->'} {humanSize(compressedImage.compressedSize)}</p>
                <button onClick={() => downloadBlob(compressedImage.blob, compressedImage.name)} className="w-full bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 inline-flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Compressed
                </button>
              </div>
            )}
          </section>
        )

      case 'audio-converter':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={AudioLines} accent="text-orange-600" title="Audio Converter (MP3 to Others)" subtitle="Convert audio formats directly in browser." />
            <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="w-full border rounded-lg px-3 py-2" />
            <select className="w-full border rounded-lg px-3 py-2" value={audioTarget} onChange={(e) => setAudioTarget(e.target.value)}>
              <option value="wav">WAV</option>
              <option value="ogg">OGG</option>
              <option value="webm">WEBM</option>
              <option value="mp3">MP3</option>
            </select>
            <button onClick={handleAudioConvert} disabled={convertingAudio} className="w-full bg-orange-600 text-white rounded-lg py-2 hover:bg-orange-700 disabled:opacity-60">
              {convertingAudio ? 'Converting...' : 'Convert Audio'}
            </button>
            {convertedAudio && (
              <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                <p className="text-sm text-gray-700">{humanSize(convertedAudio.sourceSize)} {'->'} {humanSize(convertedAudio.outputSize)}</p>
                <audio controls src={convertedAudio.url} className="w-full" />
                <button onClick={() => downloadBlob(convertedAudio.blob, convertedAudio.name)} className="w-full bg-amber-700 text-white rounded-lg py-2 hover:bg-amber-800 inline-flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Converted Audio
                </button>
              </div>
            )}
          </section>
        )

      case 'file-changer':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={FileCog} accent="text-cyan-700" title="File Changer (Others to Others)" subtitle="Convert text data between CSV, JSON, and plain text." />
            <p className="text-sm text-gray-600">Convert text content between CSV, JSON, and plain text formats.</p>
            <textarea
              value={textSource}
              onChange={(e) => setTextSource(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 h-56"
              placeholder="Paste your file content here"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select className="border rounded-lg px-3 py-2" value={sourceFormat} onChange={(e) => setSourceFormat(e.target.value)}>
                <option value="csv">Source: CSV</option>
                <option value="json">Source: JSON</option>
                <option value="txt">Source: Text</option>
              </select>
              <select className="border rounded-lg px-3 py-2" value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)}>
                <option value="csv">Target: CSV</option>
                <option value="json">Target: JSON</option>
                <option value="txt">Target: Text</option>
              </select>
              <button onClick={convertTextFormats} className="bg-cyan-700 text-white rounded-lg py-2 hover:bg-cyan-800">Convert</button>
            </div>
            {convertedText && (
              <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                <textarea readOnly value={convertedText} className="w-full border rounded-lg px-3 py-2 h-44 bg-white" />
                <div className="flex gap-2">
                  <button onClick={() => copyText(convertedText)} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 inline-flex items-center gap-2">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy
                  </button>
                  <button
                    onClick={() => downloadBlob(new Blob([convertedText], { type: 'text/plain' }), `converted.${targetFormat === 'txt' ? 'txt' : targetFormat}`)}
                    className="px-3 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            )}
          </section>
        )

      case 'pdf-editor':
        return (
          <section className="bg-white rounded-xl border p-5 space-y-4">
            <ToolTitle icon={FileText} accent="text-red-600" title="PDF Editor (PDF to Word)" subtitle="Convert PDF to editable DOC or DOCX with optional OCR for scanned files." />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                setPdfFile(e.target.files?.[0] || null)
                setConvertedPdfDoc(null)
              }}
              className="w-full border rounded-lg px-3 py-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select className="border rounded-lg px-3 py-2" value={pdfExportFormat} onChange={(e) => setPdfExportFormat(e.target.value)}>
                <option value="docx">Export: DOCX</option>
                <option value="doc" disabled={pdfConvertMode === 'preserve-layout'}>Export: DOC</option>
              </select>
              <select className="border rounded-lg px-3 py-2" value={pdfConvertMode} onChange={(e) => setPdfConvertMode(e.target.value)}>
                <option value="editable">Mode: Editable (Preserve Formatting)</option>
                <option value="preserve-layout">Mode: Visual (As Image)</option>
              </select>
            </div>
            <label className="inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-gray-700">
                <input type="checkbox" checked={pdfUseOcr} onChange={(e) => setPdfUseOcr(e.target.checked)} />
                OCR for scanned PDFs
              </label>
            {pdfConvertMode === 'preserve-layout' ? (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <strong>Visual Mode:</strong> Creates DOCX with each page as an image. Layout is 100% preserved but text is not editable.
              </p>
            ) : (
              <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <strong>Editable Mode:</strong> Extracts text with formatting (headings, bold, lists, tables). Text is fully editable in Word.
              </p>
            )}
            <button onClick={convertPdfToWord} disabled={convertingPdf} className="w-full bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 disabled:opacity-60">
              {convertingPdf ? 'Converting PDF...' : `Convert PDF to ${pdfExportFormat.toUpperCase()}`}
            </button>
            {convertingPdf && pdfUseOcr && <p className="text-sm text-gray-600">OCR progress: {ocrProgress}%</p>}
            {convertedPdfDoc && (
              <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                <p className="text-sm text-gray-700">
                  Pages: {convertedPdfDoc.pageCount} | {humanSize(convertedPdfDoc.sourceSize)} → {humanSize(convertedPdfDoc.outputSize)}
                </p>
                <p className="text-sm text-gray-700">
                  {convertedPdfDoc.mode === 'preserve-layout' 
                    ? '✓ Layout preserved as images' 
                    : convertedPdfDoc.mode === 'editable-styled'
                    ? `✓ Formatting preserved | Tables: ${convertedPdfDoc.tableCount}`
                    : `Tables: ${convertedPdfDoc.tableCount} | OCR pages: ${convertedPdfDoc.ocrPageCount}`
                  }
                </p>
                {convertedPdfDoc.mode !== 'preserve-layout' && (
                  <textarea readOnly value={convertedPdfDoc.preview} className="w-full border rounded-lg px-3 py-2 h-44 bg-white text-sm" />
                )}
                <button
                  onClick={() => downloadBlob(convertedPdfDoc.blob, convertedPdfDoc.name)}
                  className="w-full bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download {convertedPdfDoc.name.endsWith('.docx') ? 'DOCX' : 'DOC'} File
                </button>
              </div>
            )}
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All in One Tools Workspace</h2>
            <p className="text-gray-600 mt-1">Pick a tool from sidebar and complete focused tasks without switching apps.</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Active Tool: {selectedTool.label}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 bg-white rounded-xl border p-4 h-fit lg:sticky lg:top-24">
          <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Tool Sidebar</h3>
          <div className="space-y-2 hidden lg:block">
            {TOOL_MENU.map((tool) => {
              const Icon = tool.icon
              const active = selectedTool.id === tool.id
              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool?.(tool.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition inline-flex items-center gap-2 ${
                    active
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : tool.accent}`} />
                  {tool.label}
                </button>
              )
            })}
          </div>

          <div className="lg:hidden overflow-x-auto pb-2 -mx-1 px-1">
            <div className="flex gap-2 min-w-max">
              {TOOL_MENU.map((tool) => {
                const Icon = tool.icon
                const active = selectedTool.id === tool.id
                return (
                  <button
                    key={tool.id}
                    onClick={() => onSelectTool?.(tool.id)}
                    className={`px-3 py-2 rounded-lg border transition inline-flex items-center gap-2 whitespace-nowrap ${
                      active
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : tool.accent}`} />
                    {tool.label}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {renderToolContent()}
          {recommendations && (
            <RecommendationsCard
              recommendation={recommendations}
              onSelectTool={(nextId) => onSelectTool?.(nextId)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function ToolTitle({ icon: Icon, accent, title, subtitle }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${accent}`} />
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

function OutputCard({ copied, onCopy, value }) {
  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Output</span>
        <button onClick={onCopy} className="text-gray-600 hover:text-gray-900">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-80 overflow-auto">{value}</pre>
    </div>
  )
}

function RecommendationsCard({ recommendation, onSelectTool }) {
  return (
    <section className="bg-white rounded-xl border p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold text-gray-800">Recommendations</h3>
      </div>
      <p className="text-sm font-medium text-gray-700">{recommendation.title}</p>
      <ul className="space-y-2">
        {recommendation.tips.map((tip) => (
          <li key={tip} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="mt-1 text-blue-500">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2 border-t">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Try Next</p>
        <div className="flex flex-wrap gap-2">
          {recommendation.nextTools.map((toolId) => {
            const tool = TOOL_MENU.find((item) => item.id === toolId)
            if (!tool) return null
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="px-3 py-2 text-sm rounded-lg border bg-gray-50 hover:bg-white inline-flex items-center gap-2"
              >
                {tool.label}
                <ArrowRight className="w-4 h-4" />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
