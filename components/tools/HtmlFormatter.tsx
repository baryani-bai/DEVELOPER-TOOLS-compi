'use client'

import { useState, useMemo } from 'react'
import DOMPurify from 'dompurify'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatHTML, minifyHTML } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function HtmlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string>()
  const [indent, setIndent] = useState(2)
  const [showPreview, setShowPreview] = useState(false)
  const { showToast } = useToast()

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please enter some HTML to format')
      setOutput('')
      return
    }

    try {
      const formatted = formatHTML(input, indent)
      setOutput(formatted)
      setError(undefined)
      showToast('HTML formatted successfully!', 'success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format HTML')
      showToast('Failed to format HTML', 'error')
    }
  }

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some HTML to minify')
      setOutput('')
      return
    }

    try {
      const minified = minifyHTML(input)
      setOutput(minified)
      setError(undefined)
      showToast('HTML minified successfully!', 'success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to minify HTML')
      showToast('Failed to minify HTML', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(undefined)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleFormat, description: 'Format HTML' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  // Sanitize HTML output to prevent XSS attacks
  const sanitizedOutput = useMemo(() => {
    if (!output || !showPreview) return output

    // Only sanitize on client-side where DOMPurify is available
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(output, {
        ALLOWED_TAGS: [
          'html', 'head', 'body', 'title', 'meta', 'link', 'style',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'hr', 'a', 'div', 'span', 'section', 'article', 'aside', 'nav', 'header', 'footer',
          'ul', 'ol', 'li', 'dl', 'dt', 'dd',
          'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
          'img', 'figure', 'figcaption',
          'strong', 'em', 'b', 'i', 'u', 's', 'mark', 'small', 'sub', 'sup',
          'code', 'pre', 'kbd', 'samp', 'var',
          'blockquote', 'q', 'cite', 'abbr', 'time',
          'form', 'input', 'button', 'select', 'option', 'textarea', 'label', 'fieldset', 'legend',
          'iframe', 'video', 'audio', 'source', 'track', 'canvas', 'svg', 'path', 'circle', 'rect',
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'id', 'class', 'style', 'name', 'value', 'type',
          'width', 'height', 'target', 'rel', 'data-*', 'aria-*',
          'placeholder', 'required', 'disabled', 'readonly', 'checked', 'selected',
          'rowspan', 'colspan', 'scope', 'align', 'valign',
          'viewBox', 'd', 'fill', 'stroke', 'stroke-width', 'cx', 'cy', 'r', 'x', 'y',
        ],
        ALLOW_DATA_ATTR: true,
        ALLOW_ARIA_ATTR: true,
        // Remove potentially dangerous attributes
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
        // Keep relative URLs safe
        ALLOW_UNKNOWN_PROTOCOLS: false,
      })
    }

    return output
  }, [output, showPreview])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          View Options
        </h3>
        <div className="flex gap-2">
          <Button
            variant={!showPreview ? 'primary' : 'secondary'}
            onClick={() => setShowPreview(false)}
          >
            📝 HTML Code
          </Button>
          <Button
            variant={showPreview ? 'primary' : 'secondary'}
            onClick={() => setShowPreview(true)}
          >
            👁️ Live Preview
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input HTML"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="<div>Enter HTML here...</div>"
          rows={20}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">
                Indentation
              </label>
              <div className="flex gap-2">
                <Button variant={indent === 2 ? 'primary' : 'secondary'} onClick={() => setIndent(2)}>
                  2 Spaces
                </Button>
                <Button variant={indent === 4 ? 'primary' : 'secondary'} onClick={() => setIndent(4)}>
                  4 Spaces
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleFormat}>
                Format
              </Button>
              <Button variant="secondary" onClick={handleMinify}>
                Minify
              </Button>
            </div>
          </div>
        </ToolPanel>

        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            {showPreview ? 'Live Preview' : 'Output'}
          </h3>
          {output ? (
            showPreview ? (
              <div className="bg-white border border-border-primary p-4 min-h-[400px] max-h-[600px] overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: sanitizedOutput }} />
              </div>
            ) : (
              <CodeDisplay
                title=""
                code={output}
                error={error}
                language="html"
                filename="formatted.html"
              />
            )
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[400px] flex items-center justify-center text-text-secondary font-mono text-sm">
              {error || 'Formatted HTML will appear here'}
            </div>
          )}
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Format HTML' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
