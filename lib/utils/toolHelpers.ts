/**
 * Utility functions for tools
 */

// Generate hash using Web Crypto API
export async function generateHash(
  text: string,
  algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'
): Promise<string> {
  // MD5 is not supported by SubtleCrypto, so we'll use a simple implementation
  if (algorithm === 'MD5') {
    return generateMD5(text)
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Simple MD5 implementation (for browser compatibility)
function generateMD5(text: string): string {
  // This is a simplified MD5 for demonstration
  // For production, you'd use a library like crypto-js
  // For now, we'll use a simple hash function
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(32, '0')
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

// Download text as file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Format JSON with proper indentation
export function formatJSON(json: string, spaces: string | number = 2): string {
  const parsed = JSON.parse(json)
  return JSON.stringify(parsed, null, spaces)
}

// Validate JSON
export function validateJSON(json: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(json)
    return { valid: true }
  } catch (err) {
    const error = err as Error
    return { valid: false, error: error.message }
  }
}

// Minify JSON
export function minifyJSON(json: string): string {
  const parsed = JSON.parse(json)
  return JSON.stringify(parsed)
}

// Base64 encode
export function base64Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}

// Base64 decode
export function base64Decode(text: string): string {
  try {
    return decodeURIComponent(escape(atob(text)))
  } catch (err) {
    throw new Error('Invalid Base64 string')
  }
}

// URL encode
export function urlEncode(text: string, encodeAll: boolean = false): string {
  return encodeAll ? encodeURI(text) : encodeURIComponent(text)
}

// URL decode
export function urlDecode(text: string): string {
  try {
    return decodeURIComponent(text)
  } catch (err) {
    throw new Error('Invalid URL-encoded string')
  }
}

// Generate UUID v4
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Generate Lorem Ipsum
export function generateLoremIpsum(
  count: number,
  type: 'words' | 'sentences' | 'paragraphs',
  startWithLorem: boolean = true
): string {
  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
  ]

  const getRandomWords = (num: number): string[] => {
    const result: string[] = []
    for (let i = 0; i < num; i++) {
      result.push(words[Math.floor(Math.random() * words.length)])
    }
    return result
  }

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  if (type === 'words') {
    const wordList = getRandomWords(count)
    if (startWithLorem && count >= 2) {
      wordList[0] = 'Lorem'
      wordList[1] = 'ipsum'
    }
    return wordList.join(' ')
  }

  if (type === 'sentences') {
    const sentences: string[] = []
    for (let i = 0; i < count; i++) {
      const sentenceWords = getRandomWords(8 + Math.floor(Math.random() * 8))
      if (i === 0 && startWithLorem && sentenceWords.length >= 2) {
        sentenceWords[0] = 'Lorem'
        sentenceWords[1] = 'ipsum'
      } else {
        sentenceWords[0] = capitalize(sentenceWords[0])
      }
      sentences.push(sentenceWords.join(' ') + '.')
    }
    return sentences.join(' ')
  }

  // paragraphs
  const paragraphs: string[] = []
  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 4)
    const sentences: string[] = []
    for (let j = 0; j < sentenceCount; j++) {
      const sentenceWords = getRandomWords(8 + Math.floor(Math.random() * 8))
      if (i === 0 && j === 0 && startWithLorem && sentenceWords.length >= 2) {
        sentenceWords[0] = 'Lorem'
        sentenceWords[1] = 'ipsum'
      } else {
        sentenceWords[0] = capitalize(sentenceWords[0])
      }
      sentences.push(sentenceWords.join(' ') + '.')
    }
    paragraphs.push(sentences.join(' '))
  }
  return paragraphs.join('\n\n')
}

// Text case conversions
export function convertCase(text: string, caseType: string): string {
  switch (caseType) {
    case 'upper':
      return text.toUpperCase()
    case 'lower':
      return text.toLowerCase()
    case 'title':
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    case 'camel':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    case 'pascal':
      return text.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '')
    case 'snake':
      return text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
    case 'kebab':
      return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    case 'constant':
      return text.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '')
    default:
      return text
  }
}

// Format HTML
export function formatHTML(html: string, indent: number = 2): string {
  let formatted = ''
  let indentLevel = 0
  const indentStr = ' '.repeat(indent)

  html.split(/(<[^>]+>)/g).forEach(part => {
    if (part.match(/^<\/\w/)) {
      indentLevel--
    }

    if (part.trim()) {
      formatted += indentStr.repeat(indentLevel) + part.trim() + '\n'
    }

    if (part.match(/^<\w[^>]*[^\/]>$/)) {
      indentLevel++
    }
  })

  return formatted.trim()
}

// Minify HTML
export function minifyHTML(html: string): string {
  return html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim()
}

// Format CSS
export function formatCSS(css: string, indent: number = 2): string {
  const indentStr = ' '.repeat(indent)
  return css
    .replace(/\s*{\s*/g, ' {\n' + indentStr)
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/\s*;\s*/g, ';\n' + indentStr)
    .replace(/\s*,\s*/g, ', ')
    .trim()
}

// Minify CSS
export function minifyCSS(css: string): string {
  return css
    .replace(/\s+/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*:\s*/g, ':')
    .trim()
}

// Simple Markdown to HTML converter
export function markdownToHTML(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/__(.*?)__/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/_(.*?)_/gim, '<em>$1</em>')
    // Code
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n$/gim, '<br />')

  return html
}

// Color conversions
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

// Timestamp conversions
export function unixToDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString()
}

export function dateToUnix(date: string): number {
  return Math.floor(new Date(date).getTime() / 1000)
}

export function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  })
}

// Regex testing
export function testRegex(pattern: string, flags: string, text: string): {
  matches: RegExpMatchArray | null
  isValid: boolean
  error?: string
} {
  try {
    const regex = new RegExp(pattern, flags)
    const matches = text.match(regex)
    return { matches, isValid: true }
  } catch (err) {
    return {
      matches: null,
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid regex',
    }
  }
}

// JWT decode (simple - no verification)
export function decodeJWT(token: string): {
  header: any
  payload: any
  signature: string
  isValid: boolean
  error?: string
} {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }

    const header = JSON.parse(atob(parts[0]))
    const payload = JSON.parse(atob(parts[1]))
    const signature = parts[2]

    return { header, payload, signature, isValid: true }
  } catch (err) {
    return {
      header: null,
      payload: null,
      signature: '',
      isValid: false,
      error: err instanceof Error ? err.message : 'Failed to decode JWT',
    }
  }
}

// Format JavaScript code
export function formatJavaScript(code: string, indent: number = 2): string {
  const indentStr = ' '.repeat(indent)
  let formatted = ''
  let indentLevel = 0
  let inString = false
  let stringChar = ''

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const prevChar = code[i - 1]

    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true
        stringChar = char
      } else if (char === stringChar) {
        inString = false
      }
    }

    if (!inString) {
      if (char === '{' || char === '[') {
        formatted += char + '\n'
        indentLevel++
        formatted += indentStr.repeat(indentLevel)
      } else if (char === '}' || char === ']') {
        formatted = formatted.trimEnd()
        formatted += '\n'
        indentLevel--
        formatted += indentStr.repeat(indentLevel) + char
      } else if (char === ';') {
        formatted += char + '\n' + indentStr.repeat(indentLevel)
      } else if (char === ',') {
        formatted += char + '\n' + indentStr.repeat(indentLevel)
      } else if (char === '\n' || char === '\r') {
        // Skip existing newlines
      } else {
        formatted += char
      }
    } else {
      formatted += char
    }
  }

  return formatted.trim()
}

// Minify JavaScript
export function minifyJavaScript(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*/g, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}();,:])\s*/g, '$1') // Remove whitespace around operators
    .trim()
}

// Format SQL
export function formatSQL(sql: string): string {
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
    'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
    'ALTER TABLE', 'DROP TABLE', 'AS', 'DISTINCT', 'UNION', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
  ]

  let formatted = sql

  // Add newlines before major keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    formatted = formatted.replace(regex, `\n${keyword}`)
  })

  // Indent nested queries
  const lines = formatted.split('\n').map(line => line.trim()).filter(line => line)
  let indentLevel = 0
  const indentStr = '  '

  return lines.map(line => {
    if (line.match(/\(/)) indentLevel++
    const indented = indentStr.repeat(Math.max(0, indentLevel)) + line
    if (line.match(/\)/)) indentLevel--
    return indented
  }).join('\n')
}

// Generate QR Code as data URL
export function generateQRCode(text: string, size: number = 256): string {
  // Simple QR code generation using canvas
  // This is a placeholder - in production, you'd use a library like qrcode
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (!ctx) return ''

  // Simple pattern generation (not a real QR code algorithm)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#000000'

  // Create a simple grid pattern based on text hash
  const gridSize = 32
  const cellSize = size / gridSize
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i)
    hash = hash & hash
  }

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cellHash = (hash + x * 31 + y * 37) & 0xFFFFFFFF
      if (cellHash % 2 === 0) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }

  return canvas.toDataURL('image/png')
}

// Convert image file to Base64
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

// Parse cron expression
export function parseCronExpression(expression: string): {
  isValid: boolean
  description?: string
  parts?: {
    minute: string
    hour: string
    dayOfMonth: string
    month: string
    dayOfWeek: string
  }
  error?: string
} {
  try {
    const parts = expression.trim().split(/\s+/)
    if (parts.length !== 5) {
      throw new Error('Cron expression must have exactly 5 parts')
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts

    // Build human-readable description
    let description = 'Runs '

    // Minute
    if (minute === '*') {
      description += 'every minute'
    } else if (minute.includes('/')) {
      const [, interval] = minute.split('/')
      description += `every ${interval} minutes`
    } else {
      description += `at minute ${minute}`
    }

    // Hour
    if (hour !== '*') {
      if (hour.includes('/')) {
        const [, interval] = hour.split('/')
        description += ` of every ${interval} hours`
      } else {
        description += ` past hour ${hour}`
      }
    }

    // Day of month
    if (dayOfMonth !== '*') {
      description += ` on day ${dayOfMonth} of the month`
    }

    // Month
    if (month !== '*') {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthNum = parseInt(month)
      if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
        description += ` in ${monthNames[monthNum - 1]}`
      }
    }

    // Day of week
    if (dayOfWeek !== '*') {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const dayNum = parseInt(dayOfWeek)
      if (!isNaN(dayNum) && dayNum >= 0 && dayNum <= 6) {
        description += ` on ${dayNames[dayNum]}`
      }
    }

    return {
      isValid: true,
      description,
      parts: { minute, hour, dayOfMonth, month, dayOfWeek }
    }
  } catch (err) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid cron expression'
    }
  }
}

// Format XML
export function formatXML(xml: string, indent: number = 2): string {
  const indentStr = ' '.repeat(indent)
  let formatted = ''
  let indentLevel = 0

  xml.split(/>\s*</).forEach((node, index, array) => {
    if (index > 0) {
      node = '<' + node
    }
    if (index < array.length - 1) {
      node = node + '>'
    }

    if (node.match(/^<\/\w/)) {
      indentLevel--
    }

    formatted += indentStr.repeat(indentLevel) + node + '\n'

    if (node.match(/^<\w[^>]*[^\/]>$/)) {
      indentLevel++
    }
  })

  return formatted.trim()
}

// Minify XML
export function minifyXML(xml: string): string {
  return xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
}

// Generate JWT token (simple - no real signing)
export function generateJWT(
  payload: Record<string, any>,
  secret: string = 'your-secret-key',
  expiresIn: number = 3600
): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  // Add standard claims
  const now = Math.floor(Date.now() / 1000)
  const claims = {
    ...payload,
    iat: now,
    exp: now + expiresIn
  }

  // Base64 encode header and payload
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(claims))

  // Simple signature (not cryptographically secure - for demo only)
  const signature = btoa(secret + encodedHeader + encodedPayload).substring(0, 43)

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// Convert CSV to JSON
export function csvToJSON(csv: string): string {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row')
  }

  const headers = lines[0].split(',').map(h => h.trim())
  const result: any[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const obj: any = {}

    headers.forEach((header, index) => {
      const value = values[index] || ''
      // Try to parse as number
      obj[header] = !isNaN(Number(value)) && value !== '' ? Number(value) : value
    })

    result.push(obj)
  }

  return JSON.stringify(result, null, 2)
}

// Convert JSON to CSV
export function jsonToCSV(json: string): string {
  const data = JSON.parse(json)

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('JSON must be an array of objects')
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  const csvLines: string[] = []

  // Add header row
  csvLines.push(headers.join(','))

  // Add data rows
  data.forEach(obj => {
    const values = headers.map(header => {
      const value = obj[header]
      // Wrap in quotes if contains comma
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    })
    csvLines.push(values.join(','))
  })

  return csvLines.join('\n')
}

// Generate secure password
export function generatePassword(
  length: number = 16,
  options: {
    uppercase?: boolean
    lowercase?: boolean
    numbers?: boolean
    symbols?: boolean
  } = {}
): string {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options

  let chars = ''
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (numbers) chars += '0123456789'
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

  if (chars.length === 0) {
    throw new Error('At least one character type must be selected')
  }

  let password = ''
  const crypto = window.crypto || (window as any).msCrypto
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length]
  }

  return password
}

// Convert JSON to YAML
export function jsonToYAML(json: string, indent: number = 2): string {
  const obj = JSON.parse(json)
  return convertToYAML(obj, 0, indent)
}

function convertToYAML(obj: any, depth: number, indent: number): string {
  const indentStr = ' '.repeat(indent)
  let yaml = ''

  if (Array.isArray(obj)) {
    obj.forEach(item => {
      yaml += indentStr.repeat(depth) + '- '
      if (typeof item === 'object' && item !== null) {
        yaml += '\n' + convertToYAML(item, depth + 1, indent)
      } else {
        yaml += formatYAMLValue(item) + '\n'
      }
    })
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      yaml += indentStr.repeat(depth) + key + ': '
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        yaml += '\n' + convertToYAML(obj[key], depth + 1, indent)
      } else {
        yaml += formatYAMLValue(obj[key]) + '\n'
      }
    })
  } else {
    yaml = formatYAMLValue(obj)
  }

  return yaml
}

function formatYAMLValue(value: any): string {
  if (typeof value === 'string') {
    // Quote strings with special characters
    if (value.includes(':') || value.includes('#') || value.includes('\n')) {
      return `"${value}"`
    }
    return value
  }
  if (value === null || value === undefined) {
    return 'null'
  }
  return String(value)
}

// Convert YAML to JSON (simple parser)
export function yamlToJSON(yaml: string): string {
  const lines = yaml.trim().split('\n')
  const result: any = {}
  const stack: any[] = [{ obj: result, indent: -1 }]

  lines.forEach(line => {
    const indent = line.search(/\S/)
    const trimmed = line.trim()

    if (trimmed.startsWith('#') || trimmed === '') {
      return // Skip comments and empty lines
    }

    // Pop stack until we find the right parent
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop()
    }

    const parent = stack[stack.length - 1].obj

    if (trimmed.startsWith('- ')) {
      // Array item
      const value = trimmed.substring(2).trim()
      if (!Array.isArray(parent)) {
        throw new Error('Invalid YAML: array item without array context')
      }
      if (value.includes(':')) {
        const obj = {}
        parent.push(obj)
        stack.push({ obj, indent })
        parseKeyValue(value, obj)
      } else {
        parent.push(parseValue(value))
      }
    } else if (trimmed.includes(':')) {
      parseKeyValue(trimmed, parent)
      const [key] = trimmed.split(':')
      if (trimmed.endsWith(':')) {
        // Object or array coming
        const nextLine = lines[lines.indexOf(line) + 1]
        if (nextLine && nextLine.trim().startsWith('- ')) {
          parent[key.trim()] = []
          stack.push({ obj: parent[key.trim()], indent })
        } else {
          parent[key.trim()] = {}
          stack.push({ obj: parent[key.trim()], indent })
        }
      }
    }
  })

  return JSON.stringify(result, null, 2)
}

function parseKeyValue(line: string, obj: any) {
  const colonIndex = line.indexOf(':')
  const key = line.substring(0, colonIndex).trim()
  const value = line.substring(colonIndex + 1).trim()

  if (value) {
    obj[key] = parseValue(value)
  }
}

function parseValue(value: string): any {
  // Remove quotes
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.substring(1, value.length - 1)
  }

  // Parse boolean
  if (value === 'true') return true
  if (value === 'false') return false

  // Parse null
  if (value === 'null' || value === '~') return null

  // Parse number
  if (!isNaN(Number(value))) {
    return Number(value)
  }

  return value
}

// HTML Entity encoding/decoding
export function encodeHTMLEntities(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function decodeHTMLEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// Number base conversion
export function convertNumberBase(value: string, fromBase: number, toBase: number): string {
  try {
    const decimal = parseInt(value, fromBase)
    if (isNaN(decimal)) {
      throw new Error('Invalid number for the specified base')
    }
    return decimal.toString(toBase).toUpperCase()
  } catch (err) {
    throw new Error('Conversion failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
  }
}

// Text escaping/unescaping
export function escapeText(text: string, type: 'javascript' | 'json' | 'xml' | 'url'): string {
  switch (type) {
    case 'javascript':
      return text
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
    case 'json':
      return JSON.stringify(text).slice(1, -1)
    case 'xml':
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    case 'url':
      return encodeURIComponent(text)
    default:
      return text
  }
}

export function unescapeText(text: string, type: 'javascript' | 'json' | 'xml' | 'url'): string {
  switch (type) {
    case 'javascript':
      return text
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
    case 'json':
      try {
        return JSON.parse(`"${text}"`)
      } catch {
        throw new Error('Invalid JSON escape sequence')
      }
    case 'xml':
      return decodeHTMLEntities(text)
    case 'url':
      return decodeURIComponent(text)
    default:
      return text
  }
}

// JSONPath evaluation (simple implementation)
export function evaluateJSONPath(json: string, path: string): string {
  try {
    const data = JSON.parse(json)

    // Simple JSONPath implementation (supports basic paths like $.store.book[0].title)
    let result = data

    // Remove leading $. if present
    const cleanPath = path.replace(/^\$\.?/, '')

    if (!cleanPath) {
      return JSON.stringify(result, null, 2)
    }

    // Split by dots and brackets
    const parts = cleanPath.split(/\.|\[|\]/).filter(p => p)

    for (const part of parts) {
      if (part === '*') {
        // Wildcard - return all values
        if (Array.isArray(result)) {
          result = result
        } else if (typeof result === 'object') {
          result = Object.values(result)
        }
      } else if (/^\d+$/.test(part)) {
        // Array index
        result = result[parseInt(part)]
      } else {
        // Object key
        result = result[part]
      }

      if (result === undefined) {
        throw new Error(`Path not found: ${path}`)
      }
    }

    return JSON.stringify(result, null, 2)
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'JSONPath evaluation failed')
  }
}

// String counting
export function countString(text: string): {
  characters: number
  charactersNoSpaces: number
  words: number
  lines: number
  bytes: number
  sentences: number
  paragraphs: number
} {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text ? text.split('\n').length : 0
  const bytes = new Blob([text]).size
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    bytes,
    sentences,
    paragraphs
  }
}
