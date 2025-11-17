'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatXML, minifyXML } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function XMLFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'format' | 'minify'>('format')
  const [indent, setIndent] = useState(2)
  const { showToast } = useToast()

  const handleProcess = () => {
    if (!input.trim()) {
      showToast('Please enter XML code', 'error')
      return
    }

    try {
      const result = mode === 'format' ? formatXML(input, indent) : minifyXML(input)
      setOutput(result)
      showToast(`XML ${mode === 'format' ? 'formatted' : 'minified'}!`, 'success')
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
      <div className="bg-bg-secondary border border-border-primary p-5">
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
          title="XML Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="<root><item>Value</item></root>"
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
