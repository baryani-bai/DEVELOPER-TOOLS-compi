'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { encodeHTMLEntities, decodeHTMLEntities } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type ConversionMode = 'encode' | 'decode'

export default function HTMLEntityConverter() {
  const [mode, setMode] = useState<ConversionMode>('encode')
  const [input, setInput] = useState('<div class="container">Hello & "World"</div>')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter text to convert', 'error')
      return
    }

    try {
      const result = mode === 'encode' ? encodeHTMLEntities(input) : decodeHTMLEntities(input)
      setOutput(result)
      showToast(`HTML entities ${mode}d!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: mode === 'encode' ? 'Encode' : 'Decode' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Conversion Mode
        </h3>

        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === 'encode' ? 'primary' : 'secondary'}
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button
            variant={mode === 'decode' ? 'primary' : 'secondary'}
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
        </div>

        <div className="bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary mb-3">
            {mode === 'encode' ? 'Common Encodings:' : 'Common Entities:'}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span className="text-text-secondary">&lt;</span>
              <span className="text-accent-primary mx-2">→</span>
              <span className="text-text-primary">&amp;lt;</span>
            </div>
            <div>
              <span className="text-text-secondary">&gt;</span>
              <span className="text-accent-primary mx-2">→</span>
              <span className="text-text-primary">&amp;gt;</span>
            </div>
            <div>
              <span className="text-text-secondary">&amp;</span>
              <span className="text-accent-primary mx-2">→</span>
              <span className="text-text-primary">&amp;amp;</span>
            </div>
            <div>
              <span className="text-text-secondary">"</span>
              <span className="text-accent-primary mx-2">→</span>
              <span className="text-text-primary">&amp;quot;</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={mode === 'encode' ? '<div>Hello & "World"</div>' : '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'}
          rows={20}
        />

        <CodeDisplay
          title={mode === 'encode' ? 'HTML Entities' : 'Plain Text'}
          code={output}
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: mode === 'encode' ? 'Encode' : 'Decode' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
