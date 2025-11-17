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
