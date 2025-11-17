'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatJSON, validateJSON, minifyJSON } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type IndentOption = 2 | 4 | 'tab'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string>()
  const [indent, setIndent] = useState<IndentOption>(2)
  const { showToast } = useToast()

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format')
      setOutput('')
      return
    }

    const validation = validateJSON(input)
    if (!validation.valid) {
      setError(validation.error)
      setOutput('')
      showToast(validation.error || 'Invalid JSON', 'error')
      return
    }

    try {
      const spaces = indent === 'tab' ? '\t' : indent
      const formatted = formatJSON(input, spaces)
      setOutput(formatted)
      setError(undefined)
      showToast('JSON formatted successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to format JSON'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to minify')
      setOutput('')
      return
    }

    const validation = validateJSON(input)
    if (!validation.valid) {
      setError(validation.error)
      setOutput('')
      showToast(validation.error || 'Invalid JSON', 'error')
      return
    }

    try {
      const minified = minifyJSON(input)
      setOutput(minified)
      setError(undefined)
      showToast('JSON minified successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to minify JSON'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleValidate = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to validate')
      setOutput('')
      return
    }

    const validation = validateJSON(input)
    if (validation.valid) {
      setOutput(input)
      setError(undefined)
      showToast('✓ Valid JSON!', 'success')
    } else {
      setError(validation.error)
      setOutput('')
      showToast(validation.error || 'Invalid JSON', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(undefined)
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      handler: handleFormat,
      description: 'Format JSON',
    },
    {
      key: 'k',
      ctrlKey: true,
      handler: handleClear,
      description: 'Clear input',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <ToolPanel
        title="Input JSON"
        value={input}
        onChange={setInput}
        onClear={handleClear}
        placeholder='{\n  "name": "CodeBox",\n  "type": "Developer Tools"\n}'
        rows={20}
      >
        {/* Options */}
        <div className="space-y-4">
          {/* Indentation Options */}
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Indentation
            </label>
            <div className="flex gap-2">
              <Button
                variant={indent === 2 ? 'primary' : 'secondary'}
                onClick={() => setIndent(2)}
              >
                2 Spaces
              </Button>
              <Button
                variant={indent === 4 ? 'primary' : 'secondary'}
                onClick={() => setIndent(4)}
              >
                4 Spaces
              </Button>
              <Button
                variant={indent === 'tab' ? 'primary' : 'secondary'}
                onClick={() => setIndent('tab')}
              >
                Tab
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button variant="primary" onClick={handleFormat}>
              Format
            </Button>
            <Button variant="secondary" onClick={handleMinify}>
              Minify
            </Button>
            <Button variant="secondary" onClick={handleValidate}>
              Validate
            </Button>
          </div>
        </div>
      </ToolPanel>

      {/* Output Panel */}
      <CodeDisplay
        title="Output"
        code={output}
        error={error}
        language="json"
        filename="formatted.json"
      />
      </div>

      {/* Keyboard Shortcuts */}
      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Format JSON' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
