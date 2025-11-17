'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { reverseText } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type ReverseMode = 'characters' | 'words' | 'lines'

export default function TextReverser() {
  const [input, setInput] = useState('Hello World!\nThis is a test.\nReverse me!')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<ReverseMode>('characters')
  const { showToast } = useToast()

  const modes = [
    { value: 'characters' as const, label: 'Characters', icon: '🔤', example: 'Hello → olleH' },
    { value: 'words' as const, label: 'Words', icon: '📝', example: 'Hello World → World Hello' },
    { value: 'lines' as const, label: 'Lines', icon: '📄', example: 'Line1↵Line2 → Line2↵Line1' },
  ]

  const handleReverse = () => {
    if (!input.trim()) {
      showToast('Please enter text to reverse', 'error')
      return
    }

    try {
      const reversed = reverseText(input, mode)
      setOutput(reversed)
      showToast(`Text reversed by ${mode}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Reversing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleReverse, description: 'Reverse text' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Reverse Mode
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {modes.map((m) => (
              <Button
                key={m.value}
                variant={mode === m.value ? 'primary' : 'secondary'}
                onClick={() => setMode(m.value)}
              >
                {m.icon} {m.label}
              </Button>
            ))}
          </div>

          <div className="bg-bg-tertiary border border-border-primary p-4">
            <h4 className="text-sm font-mono text-text-secondary mb-2">Current Mode</h4>
            <p className="text-xs font-mono text-accent-primary">
              {modes.find(m => m.value === mode)?.example}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text to reverse..."
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Reversed Text</h3>
            <Button variant="primary" onClick={handleReverse}>
              Reverse
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Output" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Reversed text will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Reverse Modes Explained
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔤 Characters</p>
            <p className="text-xs font-mono text-text-secondary mb-2">
              Reverses the entire string character by character
            </p>
            <p className="text-xs font-mono text-text-tertiary">
              "Hello" → "olleH"
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📝 Words</p>
            <p className="text-xs font-mono text-text-secondary mb-2">
              Reverses the order of words (space-separated)
            </p>
            <p className="text-xs font-mono text-text-tertiary">
              "Hello World" → "World Hello"
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📄 Lines</p>
            <p className="text-xs font-mono text-text-secondary mb-2">
              Reverses the order of lines
            </p>
            <p className="text-xs font-mono text-text-tertiary">
              "Line1↵Line2" → "Line2↵Line1"
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Reverse text' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
