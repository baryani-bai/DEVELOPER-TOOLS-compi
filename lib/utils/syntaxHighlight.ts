/**
 * Simple syntax highlighting for JSON
 * Returns HTML string with syntax highlighting classes
 */
export function highlightJSON(json: string): string {
  // Escape HTML entities
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  // Highlight JSON syntax
  const highlighted = escapeHtml(json).replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'syntax-number'
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'syntax-key'
        } else {
          cls = 'syntax-string'
        }
      } else if (/true|false/.test(match)) {
        cls = 'syntax-boolean'
      } else if (/null/.test(match)) {
        cls = 'syntax-null'
      }
      return `<span class="${cls}">${match}</span>`
    }
  )

  return highlighted
}

/**
 * Simple syntax highlighting for other languages
 */
export function highlightCode(code: string, language: string): string {
  if (language === 'json') {
    try {
      // Try to format and highlight JSON
      const parsed = JSON.parse(code)
      const formatted = JSON.stringify(parsed, null, 2)
      return highlightJSON(formatted)
    } catch {
      // If not valid JSON, just highlight as-is
      return highlightJSON(code)
    }
  }

  // For non-JSON, just escape HTML
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
