'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { escapeText, unescapeText } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type EscapeType = 'javascript' | 'json' | 'xml' | 'url'
type Mode = 'escape' | 'unescape'

export default function TextEscaper() {
  const [mode, setMode] = useState<Mode>('escape')
  const [escapeType, setEscapeType] = useState<EscapeType>('javascript')
  const [input, setInput] = useState('Hello "World"\nNew line\tTab')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const escapeTypes = [
    { value: 'javascript' as const, label: 'JavaScript', example: 'Hello \\"World\\"\\nNew line\\tTab' },
    { value: 'json' as const, label: 'JSON', example: 'Hello \\"World\\"\\nNew line\\tTab' },
    { value: 'xml' as const, label: 'XML', example: 'Hello &quot;World&quot;' },
    { value: 'url' as const, label: 'URL', example: 'Hello%20%22World%22' },
  ]

  const handleProcess = () => {
    if (!input.trim()) {
      showToast('Please enter text to process', 'error')
      return
    }

    try {
      const result = mode === 'escape' ? escapeText(input, escapeType) : unescapeText(input, escapeType)
      setOutput(result)
      showToast(`Text ${mode}d!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Processing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleProcess, description: mode === 'escape' ? 'Escape' : 'Unescape' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Options
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Mode</label>
            <div className="flex gap-2">
              <Button
                variant={mode === 'escape' ? 'primary' : 'secondary'}
                onClick={() => setMode('escape')}
              >
                Escape
              </Button>
              <Button
                variant={mode === 'unescape' ? 'primary' : 'secondary'}
                onClick={() => setMode('unescape')}
              >
                Unescape
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Escape Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {escapeTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={escapeType === type.value ? 'primary' : 'secondary'}
                  onClick={() => setEscapeType(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary mb-2">Example ({escapeTypes.find(t => t.value === escapeType)?.label}):</p>
          <p className="text-xs font-mono text-accent-primary break-all">
            {escapeTypes.find(t => t.value === escapeType)?.example}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'escape' ? 'Plain Text' : 'Escaped Text'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text to escape/unescape"
          rows={20}
        />

        <CodeDisplay
          title={mode === 'escape' ? 'Escaped Text' : 'Plain Text'}
          code={output}
        />
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Common Escape Sequences
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">New Line:</span>
            <p className="text-accent-primary mt-1">\n</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Tab:</span>
            <p className="text-accent-primary mt-1">\t</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Backslash:</span>
            <p className="text-accent-primary mt-1">\\</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Quote:</span>
            <p className="text-accent-primary mt-1">\"</p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: mode === 'escape' ? 'Escape' : 'Unescape' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
