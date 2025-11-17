'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatCSS, minifyCSS } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function CssFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string>()
  const [indent, setIndent] = useState(2)
  const { showToast } = useToast()

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please enter some CSS to format')
      setOutput('')
      return
    }

    try {
      const formatted = formatCSS(input, indent)
      setOutput(formatted)
      setError(undefined)
      showToast('CSS formatted successfully!', 'success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format CSS')
      showToast('Failed to format CSS', 'error')
    }
  }

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some CSS to minify')
      setOutput('')
      return
    }

    try {
      const minified = minifyCSS(input)
      setOutput(minified)
      setError(undefined)
      showToast('CSS minified successfully!', 'success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to minify CSS')
      showToast('Failed to minify CSS', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(undefined)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleFormat, description: 'Format CSS' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input CSS"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder=".class { color: #00ff41; }"
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
          language="css"
          filename="formatted.css"
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Format CSS' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
