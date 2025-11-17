'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatJavaScript, minifyJavaScript } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function JavaScriptFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'format' | 'minify'>('format')
  const [indent, setIndent] = useState(2)
  const { showToast } = useToast()

  const handleProcess = () => {
    if (!input.trim()) {
      showToast('Please enter JavaScript code', 'error')
      return
    }

    try {
      const result = mode === 'format' ? formatJavaScript(input, indent) : minifyJavaScript(input)
      setOutput(result)
      showToast(`JavaScript ${mode === 'format' ? 'formatted' : 'minified'}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Processing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleProcess, description: mode === 'format' ? 'Format' : 'Minify' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear input' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">Options</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Mode</label>
            <div className="flex gap-2">
              <Button
                variant={mode === 'format' ? 'primary' : 'secondary'}
                onClick={() => setMode('format')}
              >
                Format
              </Button>
              <Button
                variant={mode === 'minify' ? 'primary' : 'secondary'}
                onClick={() => setMode('minify')}
              >
                Minify
              </Button>
            </div>
          </div>

          {mode === 'format' && (
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">Indentation</label>
              <div className="flex gap-2">
                {[2, 4].map((size) => (
                  <Button
                    key={size}
                    variant={indent === size ? 'primary' : 'secondary'}
                    onClick={() => setIndent(size)}
                  >
                    {size} Spaces
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="JavaScript Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="function hello() { console.log('Hello World'); }"
          rows={20}
        />

        <CodeDisplay
          title="Output"
          code={output}
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: mode === 'format' ? 'Format' : 'Minify' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
