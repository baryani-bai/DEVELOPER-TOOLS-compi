'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateRandomString } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type StringType = 'alphanumeric' | 'alphabetic' | 'numeric' | 'hex' | 'custom'

export default function RandomStringGenerator() {
  const [output, setOutput] = useState('')
  const [length, setLength] = useState(32)
  const [type, setType] = useState<StringType>('alphanumeric')
  const [customChars, setCustomChars] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
  const { showToast } = useToast()

  const types = [
    { value: 'alphanumeric' as const, label: 'Alphanumeric', chars: 'A-Z, a-z, 0-9' },
    { value: 'alphabetic' as const, label: 'Alphabetic', chars: 'A-Z, a-z' },
    { value: 'numeric' as const, label: 'Numeric', chars: '0-9' },
    { value: 'hex' as const, label: 'Hexadecimal', chars: '0-9, A-F' },
    { value: 'custom' as const, label: 'Custom', chars: 'Your characters' },
  ]

  const handleGenerate = () => {
    if (length < 1 || length > 10000) {
      showToast('Length must be between 1 and 10,000', 'error')
      return
    }

    if (type === 'custom' && !customChars.trim()) {
      showToast('Please enter custom characters', 'error')
      return
    }

    try {
      const result = generateRandomString(length, { type, customChars })
      setOutput(result)
      showToast('Random string generated!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleClear = () => {
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Generator Options
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Length: {length} characters
            </label>
            <input
              type="range"
              min="1"
              max="256"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-bg-tertiary border border-border-primary appearance-none cursor-pointer accent-accent-primary"
            />
            <div className="flex justify-between text-xs font-mono text-text-tertiary mt-1">
              <span>1</span>
              <span>256</span>
            </div>
            <div className="mt-2">
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min="1"
                max="10000"
                className="w-32 bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Character Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {types.map((t) => (
                <Button
                  key={t.value}
                  variant={type === t.value ? 'primary' : 'secondary'}
                  onClick={() => setType(t.value)}
                  className="text-xs"
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          {type === 'custom' && (
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">
                Custom Characters
              </label>
              <input
                type="text"
                value={customChars}
                onChange={(e) => setCustomChars(e.target.value)}
                placeholder="Enter characters to use..."
                className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-3 focus:outline-none focus:border-accent-primary"
              />
            </div>
          )}

          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-text-secondary mb-2">
              Current Type: <span className="text-accent-primary">{types.find(t => t.value === type)?.label}</span>
            </p>
            <p className="text-xs font-mono text-text-tertiary">
              Characters: {types.find(t => t.value === type)?.chars}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-mono text-lg font-semibold text-text-primary">Generated String</h3>
          <Button variant="primary" onClick={handleGenerate}>
            Generate
          </Button>
        </div>

        {output ? (
          <div>
            <CodeDisplay title="Generated String" code={output} language="text" />
            <div className="mt-3 text-xs font-mono text-text-secondary">
              Length: {output.length} characters
            </div>
          </div>
        ) : (
          <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
            Click "Generate" to create a random string
          </div>
        )}
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔑 API Keys</p>
            <p className="text-xs font-mono text-text-secondary">
              Generate secure API keys and tokens
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🧪 Test Data</p>
            <p className="text-xs font-mono text-text-secondary">
              Create random test strings for development
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🎲 Random IDs</p>
            <p className="text-xs font-mono text-text-secondary">
              Generate unique identifiers
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔐 Cryptographic</p>
            <p className="text-xs font-mono text-text-secondary">
              Uses Web Crypto API for secure randomness
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
