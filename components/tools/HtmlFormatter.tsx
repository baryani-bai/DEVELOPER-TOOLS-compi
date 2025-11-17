'use client'

import { useState } from 'react'
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

  return (
    <div className="space-y-6">
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

        <CodeDisplay
          title="Output"
          code={output}
          error={error}
          language="html"
          filename="formatted.html"
        />
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
