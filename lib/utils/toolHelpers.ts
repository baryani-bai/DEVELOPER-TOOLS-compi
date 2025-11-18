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

// Text sorting
export function sortText(text: string, options: {
  method: 'alphabetical' | 'numerical' | 'length'
  direction: 'asc' | 'desc'
  caseSensitive: boolean
}): string {
  const lines = text.split('\n')

  let sorted = [...lines]

  switch (options.method) {
    case 'alphabetical':
      sorted.sort((a, b) => {
        const strA = options.caseSensitive ? a : a.toLowerCase()
        const strB = options.caseSensitive ? b : b.toLowerCase()
        return strA.localeCompare(strB)
      })
      break
    case 'numerical':
      sorted.sort((a, b) => {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        return numA - numB
      })
      break
    case 'length':
      sorted.sort((a, b) => a.length - b.length)
      break
  }

  if (options.direction === 'desc') {
    sorted.reverse()
  }

  return sorted.join('\n')
}

// Remove duplicate lines
export function removeDuplicateLines(text: string, caseSensitive: boolean = true): string {
  const lines = text.split('\n')
  const seen = new Set<string>()
  const unique: string[] = []

  lines.forEach(line => {
    const key = caseSensitive ? line : line.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(line)
    }
  })

  return unique.join('\n')
}

// Generate random string
export function generateRandomString(
  length: number,
  options: {
    type: 'alphanumeric' | 'alphabetic' | 'numeric' | 'hex' | 'custom'
    customChars?: string
  }
): string {
  let chars = ''

  switch (options.type) {
    case 'alphanumeric':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      break
    case 'alphabetic':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      break
    case 'numeric':
      chars = '0123456789'
      break
    case 'hex':
      chars = '0123456789ABCDEF'
      break
    case 'custom':
      chars = options.customChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      break
  }

  let result = ''
  const crypto = window.crypto || (window as any).msCrypto
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }

  return result
}

// Backslash escape/unescape
export function addBackslashes(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\v/g, '\\v')
}

export function removeBackslashes(text: string): string {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\f/g, '\f')
    .replace(/\\v/g, '\v')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}

// Common Unicode characters database
export const unicodeCategories = {
  'Common': [
    { char: '©', code: 'U+00A9', name: 'Copyright Sign' },
    { char: '®', code: 'U+00AE', name: 'Registered Sign' },
    { char: '™', code: 'U+2122', name: 'Trade Mark Sign' },
    { char: '€', code: 'U+20AC', name: 'Euro Sign' },
    { char: '£', code: 'U+00A3', name: 'Pound Sign' },
    { char: '¥', code: 'U+00A5', name: 'Yen Sign' },
  ],
  'Arrows': [
    { char: '←', code: 'U+2190', name: 'Leftwards Arrow' },
    { char: '→', code: 'U+2192', name: 'Rightwards Arrow' },
    { char: '↑', code: 'U+2191', name: 'Upwards Arrow' },
    { char: '↓', code: 'U+2193', name: 'Downwards Arrow' },
    { char: '↔', code: 'U+2194', name: 'Left Right Arrow' },
    { char: '⇒', code: 'U+21D2', name: 'Rightwards Double Arrow' },
  ],
  'Math': [
    { char: '±', code: 'U+00B1', name: 'Plus-Minus Sign' },
    { char: '×', code: 'U+00D7', name: 'Multiplication Sign' },
    { char: '÷', code: 'U+00F7', name: 'Division Sign' },
    { char: '≠', code: 'U+2260', name: 'Not Equal To' },
    { char: '≈', code: 'U+2248', name: 'Almost Equal To' },
    { char: '∞', code: 'U+221E', name: 'Infinity' },
  ],
  'Shapes': [
    { char: '■', code: 'U+25A0', name: 'Black Square' },
    { char: '□', code: 'U+25A1', name: 'White Square' },
    { char: '●', code: 'U+25CF', name: 'Black Circle' },
    { char: '○', code: 'U+25CB', name: 'White Circle' },
    { char: '★', code: 'U+2605', name: 'Black Star' },
    { char: '☆', code: 'U+2606', name: 'White Star' },
  ],
  'Punctuation': [
    { char: '…', code: 'U+2026', name: 'Horizontal Ellipsis' },
    { char: '•', code: 'U+2022', name: 'Bullet' },
    { char: '‰', code: 'U+2030', name: 'Per Mille Sign' },
    { char: '′', code: 'U+2032', name: 'Prime' },
    { char: '″', code: 'U+2033', name: 'Double Prime' },
    { char: '‹', code: 'U+2039', name: 'Single Left-Pointing Angle Quotation' },
  ]
}

export function searchUnicodeCharacters(query: string): Array<{ char: string; code: string; name: string }> {
  const results: Array<{ char: string; code: string; name: string }> = []
  const lowerQuery = query.toLowerCase()

  Object.values(unicodeCategories).forEach(category => {
    category.forEach(item => {
      if (item.name.toLowerCase().includes(lowerQuery) ||
          item.code.toLowerCase().includes(lowerQuery) ||
          item.char === query) {
        results.push(item)
      }
    })
  })

  return results
}

// Generate URL-friendly slug from text
export function generateSlug(text: string, options: {
  separator: string
  lowercase: boolean
  removeSpecialChars: boolean
}): string {
  let slug = text.trim()

  // Convert to lowercase if requested
  if (options.lowercase) {
    slug = slug.toLowerCase()
  }

  // Remove accents and diacritics
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Remove special characters if requested
  if (options.removeSpecialChars) {
    slug = slug.replace(/[^\w\s-]/g, '')
  }

  // Replace spaces with separator
  slug = slug.replace(/\s+/g, options.separator)

  // Remove multiple consecutive separators
  const separatorRegex = new RegExp(`\\${options.separator}+`, 'g')
  slug = slug.replace(separatorRegex, options.separator)

  // Remove leading/trailing separators
  const trimRegex = new RegExp(`^\\${options.separator}+|\\${options.separator}+$`, 'g')
  slug = slug.replace(trimRegex, '')

  return slug
}

// Reverse text with different modes
export function reverseText(text: string, mode: 'characters' | 'words' | 'lines'): string {
  switch (mode) {
    case 'characters':
      return text.split('').reverse().join('')
    case 'words':
      return text.split(' ').reverse().join(' ')
    case 'lines':
      return text.split('\n').reverse().join('\n')
    default:
      return text
  }
}

// Remove various types of whitespace
export function removeWhitespace(text: string, options: {
  removeLeading: boolean
  removeTrailing: boolean
  removeMultiple: boolean
  removeAllSpaces: boolean
  removeLineBreaks: boolean
}): string {
  let result = text

  if (options.removeAllSpaces) {
    return result.replace(/\s+/g, '')
  }

  if (options.removeLineBreaks) {
    result = result.replace(/\n+/g, ' ')
  }

  if (options.removeMultiple) {
    result = result.replace(/ +/g, ' ')
  }

  if (options.removeLeading || options.removeTrailing) {
    const lines = result.split('\n')
    result = lines.map(line => {
      if (options.removeLeading && options.removeTrailing) {
        return line.trim()
      } else if (options.removeLeading) {
        return line.replace(/^\s+/, '')
      } else if (options.removeTrailing) {
        return line.replace(/\s+$/, '')
      }
      return line
    }).join('\n')
  }

  return result
}

// Convert text to binary and vice versa
export function textToBinary(text: string): string {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0')
  }).join(' ')
}

export function binaryToText(binary: string): string {
  const bytes = binary.replace(/\s/g, '').match(/.{1,8}/g) || []
  return bytes.map(byte => {
    return String.fromCharCode(parseInt(byte, 2))
  }).join('')
}

// Morse code mapping
export const morseCodeMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '\'': '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
}

export const morseToTextMap: Record<string, string> = Object.entries(morseCodeMap).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as Record<string, string>)

export function textToMorse(text: string): string {
  return text.toUpperCase().split('').map(char => {
    return morseCodeMap[char] || char
  }).join(' ')
}

export function morseToText(morse: string): string {
  return morse.split(' ').map(code => {
    return morseToTextMap[code] || code
  }).join('')
}

// JSON to XML conversion
export function jsonToXML(json: string): string {
  const obj = JSON.parse(json)

  function objectToXML(obj: any, rootName: string = 'root'): string {
    let xml = `<${rootName}>`

    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          xml += objectToXML(item, 'item')
        })
      } else {
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            xml += objectToXML(value, key)
          } else {
            xml += `<${key}>${value}</${key}>`
          }
        })
      }
    } else {
      xml += obj
    }

    xml += `</${rootName}>`
    return xml
  }

  return objectToXML(obj)
}

// XML to JSON conversion (basic)
export function xmlToJSON(xml: string): string {
  // This is a simplified version - for production use a proper XML parser
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'text/xml')

  function xmlNodeToJSON(node: any): any {
    if (node.nodeType === 3) { // text node
      return node.nodeValue
    }

    const obj: any = {}

    if (node.attributes) {
      if (node.attributes.length > 0) {
        obj['@attributes'] = {}
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i]
          obj['@attributes'][attr.nodeName] = attr.nodeValue
        }
      }
    }

    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i]
        const nodeName = child.nodeName

        if (child.nodeType === 3 && child.nodeValue?.trim()) {
          return child.nodeValue
        }

        if (typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = xmlNodeToJSON(child)
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]]
          }
          obj[nodeName].push(xmlNodeToJSON(child))
        }
      }
    }

    return obj
  }

  const result = xmlNodeToJSON(xmlDoc.documentElement)
  return JSON.stringify(result, null, 2)
}

// URL Parser
export function parseURL(url: string): {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  params: Record<string, string>
} {
  try {
    const urlObj = new URL(url)
    const params: Record<string, string> = {}

    urlObj.searchParams.forEach((value, key) => {
      params[key] = value
    })

    return {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      params,
    }
  } catch (err) {
    throw new Error('Invalid URL format')
  }
}

// YAML formatting (basic)
export function formatYAML(yaml: string): string {
  // Basic YAML formatting - adds consistent indentation
  const lines = yaml.split('\n')
  let formatted = ''
  let indent = 0

  lines.forEach(line => {
    const trimmed = line.trim()
    if (!trimmed) {
      formatted += '\n'
      return
    }

    // Decrease indent for closing brackets/braces
    if (trimmed.startsWith(']') || trimmed.startsWith('}')) {
      indent = Math.max(0, indent - 2)
    }

    formatted += ' '.repeat(indent) + trimmed + '\n'

    // Increase indent after opening brackets/braces or colons
    if (trimmed.endsWith(':') || trimmed.endsWith('[') || trimmed.endsWith('{')) {
      indent += 2
    }
  })

  return formatted.trim()
}

// HSL to RGB conversion (complement to existing rgbToHsl)
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

// JSON Diff - Compare two JSON objects
export function compareJSON(json1: string, json2: string): {
  differences: Array<{ path: string; old: any; new: any; type: 'added' | 'removed' | 'changed' }>
  identical: boolean
} {
  const obj1 = JSON.parse(json1)
  const obj2 = JSON.parse(json2)

  const differences: Array<{ path: string; old: any; new: any; type: 'added' | 'removed' | 'changed' }> = []

  function compare(o1: any, o2: any, path: string = '') {
    const keys1 = o1 ? Object.keys(o1) : []
    const keys2 = o2 ? Object.keys(o2) : []
    const allKeys = new Set([...keys1, ...keys2])

    allKeys.forEach(key => {
      const newPath = path ? `${path}.${key}` : key
      const val1 = o1?.[key]
      const val2 = o2?.[key]

      if (!(key in (o1 || {}))) {
        differences.push({ path: newPath, old: undefined, new: val2, type: 'added' })
      } else if (!(key in (o2 || {}))) {
        differences.push({ path: newPath, old: val1, new: undefined, type: 'removed' })
      } else if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
        compare(val1, val2, newPath)
      } else if (val1 !== val2) {
        differences.push({ path: newPath, old: val1, new: val2, type: 'changed' })
      }
    })
  }

  compare(obj1, obj2)

  return {
    differences,
    identical: differences.length === 0
  }
}

// Template string formatting
export function formatTemplate(template: string, variables: Record<string, string>): string {
  let result = template

  // Support {{variable}} syntax
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g')
    result = result.replace(regex, value)
  })

  // Support ${variable} syntax
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\{\\s*${key}\\s*\\}`, 'g')
    result = result.replace(regex, value)
  })

  return result
}

// File size conversion
export function convertFileSize(value: number, fromUnit: string, toUnit: string): number {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const fromIndex = units.indexOf(fromUnit.toUpperCase())
  const toIndex = units.indexOf(toUnit.toUpperCase())

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Invalid unit')
  }

  // Convert to bytes first
  const bytes = value * Math.pow(1024, fromIndex)

  // Convert to target unit
  return bytes / Math.pow(1024, toIndex)
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

// Unix permissions calculator
export function chmodToRWX(chmod: string): { user: string; group: string; other: string } {
  if (chmod.length !== 3 || !/^\d{3}$/.test(chmod)) {
    throw new Error('Invalid chmod format. Use 3 digits (e.g., 755)')
  }

  const toRWX = (num: number): string => {
    const r = num & 4 ? 'r' : '-'
    const w = num & 2 ? 'w' : '-'
    const x = num & 1 ? 'x' : '-'
    return r + w + x
  }

  return {
    user: toRWX(parseInt(chmod[0])),
    group: toRWX(parseInt(chmod[1])),
    other: toRWX(parseInt(chmod[2]))
  }
}

export function rwxToChmod(rwx: string): string {
  if (rwx.length !== 9) {
    throw new Error('Invalid rwx format. Use 9 characters (e.g., rwxr-xr-x)')
  }

  const toNum = (str: string): number => {
    let num = 0
    if (str[0] === 'r') num += 4
    if (str[1] === 'w') num += 2
    if (str[2] === 'x') num += 1
    return num
  }

  const user = toNum(rwx.substring(0, 3))
  const group = toNum(rwx.substring(3, 6))
  const other = toNum(rwx.substring(6, 9))

  return `${user}${group}${other}`
}

// Email and URL validation
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    return { valid: false, error: 'Email is required' }
  }

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // Additional checks
  const parts = email.split('@')
  if (parts[0].length > 64) {
    return { valid: false, error: 'Local part too long (max 64 characters)' }
  }

  if (parts[1].length > 255) {
    return { valid: false, error: 'Domain too long (max 255 characters)' }
  }

  return { valid: true }
}

export function validateURL(url: string): { valid: boolean; error?: string } {
  if (!url.trim()) {
    return { valid: false, error: 'URL is required' }
  }

  try {
    const urlObj = new URL(url)

    // Check for valid protocol
    if (!['http:', 'https:', 'ftp:', 'ftps:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'Invalid protocol. Use http, https, ftp, or ftps' }
    }

    // Check for hostname
    if (!urlObj.hostname) {
      return { valid: false, error: 'Missing hostname' }
    }

    return { valid: true }
  } catch (err) {
    return { valid: false, error: 'Invalid URL format' }
  }
}

// User Agent Parser
export function parseUserAgent(ua: string): {
  browser: { name: string; version: string }
  os: { name: string; version: string }
  device: string
  raw: string
} {
  const result = {
    browser: { name: 'Unknown', version: '' },
    os: { name: 'Unknown', version: '' },
    device: 'Desktop',
    raw: ua
  }

  // Browser detection
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    result.browser.name = 'Chrome'
    const match = ua.match(/Chrome\/(\d+\.\d+)/)
    result.browser.version = match ? match[1] : ''
  } else if (ua.includes('Firefox')) {
    result.browser.name = 'Firefox'
    const match = ua.match(/Firefox\/(\d+\.\d+)/)
    result.browser.version = match ? match[1] : ''
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    result.browser.name = 'Safari'
    const match = ua.match(/Version\/(\d+\.\d+)/)
    result.browser.version = match ? match[1] : ''
  } else if (ua.includes('Edg')) {
    result.browser.name = 'Edge'
    const match = ua.match(/Edg\/(\d+\.\d+)/)
    result.browser.version = match ? match[1] : ''
  } else if (ua.includes('MSIE') || ua.includes('Trident')) {
    result.browser.name = 'Internet Explorer'
    const match = ua.match(/(?:MSIE |rv:)(\d+\.\d+)/)
    result.browser.version = match ? match[1] : ''
  }

  // OS detection
  if (ua.includes('Windows NT')) {
    result.os.name = 'Windows'
    const match = ua.match(/Windows NT (\d+\.\d+)/)
    if (match) {
      const version = match[1]
      if (version === '10.0') result.os.version = '10/11'
      else if (version === '6.3') result.os.version = '8.1'
      else if (version === '6.2') result.os.version = '8'
      else if (version === '6.1') result.os.version = '7'
      else result.os.version = version
    }
  } else if (ua.includes('Mac OS X')) {
    result.os.name = 'macOS'
    const match = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/)
    result.os.version = match ? match[1].replace(/_/g, '.') : ''
  } else if (ua.includes('Linux')) {
    result.os.name = 'Linux'
  } else if (ua.includes('Android')) {
    result.os.name = 'Android'
    const match = ua.match(/Android (\d+\.\d+)/)
    result.os.version = match ? match[1] : ''
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    result.os.name = 'iOS'
    const match = ua.match(/OS (\d+_\d+)/)
    result.os.version = match ? match[1].replace(/_/g, '.') : ''
  }

  // Device detection
  if (ua.includes('Mobile') || ua.includes('Android')) {
    result.device = 'Mobile'
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    result.device = 'Tablet'
  }

  return result
}

// Git Ignore Generator - Templates for different languages/frameworks
export const gitIgnoreTemplates: Record<string, string> = {
  'node': `# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.npm
.yarn
dist/
build/
.env
.env.local
.env.*.local`,
  'python': `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
.venv
pip-log.txt
pip-delete-this-directory.txt
*.egg-info/
dist/
build/
.pytest_cache/`,
  'java': `# Java
*.class
*.jar
*.war
*.ear
target/
.gradle/
build/
.idea/
*.iml
*.ipr
*.iws`,
  'react': `# React
node_modules/
build/
dist/
.env
.env.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
coverage/`,
  'nextjs': `# Next.js
.next/
out/
node_modules/
.env*.local
.vercel
*.tsbuildinfo
next-env.d.ts`,
  'macos': `# macOS
.DS_Store
.AppleDouble
.LSOverride
._*
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns`,
  'windows': `# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msix
*.msm
*.msp
*.lnk`,
  'vscode': `# VS Code
.vscode/
.history/
*.code-workspace`,
}

export function generateGitIgnore(templates: string[]): string {
  return templates
    .map(template => gitIgnoreTemplates[template] || '')
    .filter(Boolean)
    .join('\n\n')
}

// Note: minifyCSS and minifyJavaScript functions already exist at lines 265 and 467

// Text Statistics Calculator
export function calculateTextStats(text: string): {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  readingTime: number
  speakingTime: number
  averageWordLength: number
  longestWord: string
} {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length

  // Words
  const words = text.trim().split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length

  // Sentences (approximate)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length

  // Paragraphs
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length

  // Reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200)

  // Speaking time (average 130 words per minute)
  const speakingTime = Math.ceil(wordCount / 130)

  // Average word length
  const totalChars = words.reduce((sum, word) => sum + word.length, 0)
  const averageWordLength = wordCount > 0 ? Math.round((totalChars / wordCount) * 10) / 10 : 0

  // Longest word
  const longestWord = words.reduce((longest, word) =>
    word.length > longest.length ? word : longest, '')

  return {
    characters,
    charactersNoSpaces,
    words: wordCount,
    sentences,
    paragraphs,
    readingTime,
    speakingTime,
    averageWordLength,
    longestWord,
  }
}

// ROT13 and Caesar Cipher
export function rot13(text: string): string {
  return caesarCipher(text, 13)
}

export function caesarCipher(text: string, shift: number): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start)
  })
}

// Roman Numeral Converter
export function decimalToRoman(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error('Number must be between 1 and 3999')
  }

  const romanNumerals: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ]

  let result = ''
  let remaining = num

  for (const [value, numeral] of romanNumerals) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }

  return result
}

export function romanToDecimal(roman: string): number {
  const romanNumerals: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  }

  let result = 0
  const upperRoman = roman.toUpperCase()

  for (let i = 0; i < upperRoman.length; i++) {
    const current = romanNumerals[upperRoman[i]]
    const next = romanNumerals[upperRoman[i + 1]]

    if (!current) {
      throw new Error(`Invalid Roman numeral character: ${upperRoman[i]}`)
    }

    if (next && current < next) {
      result -= current
    } else {
      result += current
    }
  }

  return result
}

// CSS Unit Converter
export function convertCSSUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  baseFontSize: number = 16
): number {
  // Convert everything to pixels first
  let pixels: number

  switch (fromUnit) {
    case 'px':
      pixels = value
      break
    case 'rem':
      pixels = value * baseFontSize
      break
    case 'em':
      pixels = value * baseFontSize
      break
    case 'pt':
      pixels = value * (4/3) // 1pt = 4/3 px
      break
    case 'cm':
      pixels = value * 37.8 // 1cm = 37.8px
      break
    case 'mm':
      pixels = value * 3.78 // 1mm = 3.78px
      break
    case 'in':
      pixels = value * 96 // 1in = 96px
      break
    default:
      throw new Error('Unsupported source unit')
  }

  // Convert from pixels to target unit
  switch (toUnit) {
    case 'px':
      return pixels
    case 'rem':
      return pixels / baseFontSize
    case 'em':
      return pixels / baseFontSize
    case 'pt':
      return pixels / (4/3)
    case 'cm':
      return pixels / 37.8
    case 'mm':
      return pixels / 3.78
    case 'in':
      return pixels / 96
    default:
      throw new Error('Unsupported target unit')
  }
}

// IP Address Tools
export function ipv4ToDecimal(ip: string): number {
  const octets = ip.split('.').map(Number)
  if (octets.length !== 4 || octets.some(n => n < 0 || n > 255 || isNaN(n))) {
    throw new Error('Invalid IPv4 address')
  }
  return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]
}

export function decimalToIpv4(decimal: number): string {
  if (decimal < 0 || decimal > 4294967295) {
    throw new Error('Decimal must be between 0 and 4294967295')
  }
  return [
    (decimal >>> 24) & 255,
    (decimal >>> 16) & 255,
    (decimal >>> 8) & 255,
    decimal & 255
  ].join('.')
}

export function ipv4ToBinary(ip: string): string {
  const octets = ip.split('.').map(Number)
  if (octets.length !== 4 || octets.some(n => n < 0 || n > 255 || isNaN(n))) {
    throw new Error('Invalid IPv4 address')
  }
  return octets.map(n => n.toString(2).padStart(8, '0')).join('.')
}

export function ipv4ToHex(ip: string): string {
  const decimal = ipv4ToDecimal(ip)
  return '0x' + decimal.toString(16).toUpperCase().padStart(8, '0')
}

// Color Name Database (CSS named colors)
export const cssColorNames: Record<string, string> = {
  aliceblue: '#F0F8FF',
  antiquewhite: '#FAEBD7',
  aqua: '#00FFFF',
  aquamarine: '#7FFFD4',
  azure: '#F0FFFF',
  beige: '#F5F5DC',
  bisque: '#FFE4C4',
  black: '#000000',
  blanchedalmond: '#FFEBCD',
  blue: '#0000FF',
  blueviolet: '#8A2BE2',
  brown: '#A52A2A',
  burlywood: '#DEB887',
  cadetblue: '#5F9EA0',
  chartreuse: '#7FFF00',
  chocolate: '#D2691E',
  coral: '#FF7F50',
  cornflowerblue: '#6495ED',
  cornsilk: '#FFF8DC',
  crimson: '#DC143C',
  cyan: '#00FFFF',
  darkblue: '#00008B',
  darkcyan: '#008B8B',
  darkgoldenrod: '#B8860B',
  darkgray: '#A9A9A9',
  darkgreen: '#006400',
  darkkhaki: '#BDB76B',
  darkmagenta: '#8B008B',
  darkolivegreen: '#556B2F',
  darkorange: '#FF8C00',
  darkorchid: '#9932CC',
  darkred: '#8B0000',
  darksalmon: '#E9967A',
  darkseagreen: '#8FBC8F',
  darkslateblue: '#483D8B',
  darkslategray: '#2F4F4F',
  darkturquoise: '#00CED1',
  darkviolet: '#9400D3',
  deeppink: '#FF1493',
  deepskyblue: '#00BFFF',
  dimgray: '#696969',
  dodgerblue: '#1E90FF',
  firebrick: '#B22222',
  floralwhite: '#FFFAF0',
  forestgreen: '#228B22',
  fuchsia: '#FF00FF',
  gainsboro: '#DCDCDC',
  ghostwhite: '#F8F8FF',
  gold: '#FFD700',
  goldenrod: '#DAA520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#ADFF2F',
  honeydew: '#F0FFF0',
  hotpink: '#FF69B4',
  indianred: '#CD5C5C',
  indigo: '#4B0082',
  ivory: '#FFFFF0',
  khaki: '#F0E68C',
  lavender: '#E6E6FA',
  lavenderblush: '#FFF0F5',
  lawngreen: '#7CFC00',
  lemonchiffon: '#FFFACD',
  lightblue: '#ADD8E6',
  lightcoral: '#F08080',
  lightcyan: '#E0FFFF',
  lightgoldenrodyellow: '#FAFAD2',
  lightgray: '#D3D3D3',
  lightgreen: '#90EE90',
  lightpink: '#FFB6C1',
  lightsalmon: '#FFA07A',
  lightseagreen: '#20B2AA',
  lightskyblue: '#87CEFA',
  lightslategray: '#778899',
  lightsteelblue: '#B0C4DE',
  lightyellow: '#FFFFE0',
  lime: '#00FF00',
  limegreen: '#32CD32',
  linen: '#FAF0E6',
  magenta: '#FF00FF',
  maroon: '#800000',
  mediumaquamarine: '#66CDAA',
  mediumblue: '#0000CD',
  mediumorchid: '#BA55D3',
  mediumpurple: '#9370DB',
  mediumseagreen: '#3CB371',
  mediumslateblue: '#7B68EE',
  mediumspringgreen: '#00FA9A',
  mediumturquoise: '#48D1CC',
  mediumvioletred: '#C71585',
  midnightblue: '#191970',
  mintcream: '#F5FFFA',
  mistyrose: '#FFE4E1',
  moccasin: '#FFE4B5',
  navajowhite: '#FFDEAD',
  navy: '#000080',
  oldlace: '#FDF5E6',
  olive: '#808000',
  olivedrab: '#6B8E23',
  orange: '#FFA500',
  orangered: '#FF4500',
  orchid: '#DA70D6',
  palegoldenrod: '#EEE8AA',
  palegreen: '#98FB98',
  paleturquoise: '#AFEEEE',
  palevioletred: '#DB7093',
  papayawhip: '#FFEFD5',
  peachpuff: '#FFDAB9',
  peru: '#CD853F',
  pink: '#FFC0CB',
  plum: '#DDA0DD',
  powderblue: '#B0E0E6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#FF0000',
  rosybrown: '#BC8F8F',
  royalblue: '#4169E1',
  saddlebrown: '#8B4513',
  salmon: '#FA8072',
  sandybrown: '#F4A460',
  seagreen: '#2E8B57',
  seashell: '#FFF5EE',
  sienna: '#A0522D',
  silver: '#C0C0C0',
  skyblue: '#87CEEB',
  slateblue: '#6A5ACD',
  slategray: '#708090',
  snow: '#FFFAFA',
  springgreen: '#00FF7F',
  steelblue: '#4682B4',
  tan: '#D2B48C',
  teal: '#008080',
  thistle: '#D8BFD8',
  tomato: '#FF6347',
  turquoise: '#40E0D0',
  violet: '#EE82EE',
  wheat: '#F5DEB3',
  white: '#FFFFFF',
  whitesmoke: '#F5F5F5',
  yellow: '#FFFF00',
  yellowgreen: '#9ACD32',
}

export function searchColorNames(query: string): Array<{ name: string; hex: string }> {
  const lowerQuery = query.toLowerCase()
  return Object.entries(cssColorNames)
    .filter(([name]) => name.includes(lowerQuery))
    .map(([name, hex]) => ({ name, hex }))
    .slice(0, 20) // Limit to 20 results
}

export function colorNameToHex(name: string): string {
  const hex = cssColorNames[name.toLowerCase()]
  if (!hex) {
    throw new Error('Color name not found')
  }
  return hex
}
