'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateUUID } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [uppercase, setUppercase] = useState(false)
  const [removeDashes, setRemoveDashes] = useState(false)
  const { showToast } = useToast()

  const handleGenerate = () => {
    const newUuids: string[] = []
    for (let i = 0; i < count; i++) {
      let uuid = generateUUID()
      if (uppercase) {
        uuid = uuid.toUpperCase()
      }
      if (removeDashes) {
        uuid = uuid.replace(/-/g, '')
      }
      newUuids.push(uuid)
    }
    setUuids(newUuids)
    showToast(
      `Generated ${count} UUID${count > 1 ? 's' : ''} successfully!`,
      'success'
    )
  }

  const handleClear = () => {
    setUuids([])
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      handler: handleGenerate,
      description: 'Generate UUIDs',
    },
    {
      key: 'k',
      ctrlKey: true,
      handler: handleClear,
      description: 'Clear output',
    },
  ])

  const output = uuids.join('\n')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Options Panel */}
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Generator Options
        </h3>

        <div className="space-y-6">
          {/* Count */}
          <div>
            <label
              htmlFor="uuid-count"
              className="block text-sm font-mono text-text-secondary mb-2"
            >
              Number of UUIDs
            </label>
            <input
              id="uuid-count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))
              }
              className="w-full bg-bg-primary border border-border-primary text-text-primary font-mono px-4 py-2 focus:outline-none focus:border-accent-primary"
            />
            <p className="text-xs text-text-tertiary mt-1">Max: 100 UUIDs</p>
          </div>

          {/* Uppercase Option */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 bg-bg-secondary border border-border-primary accent-accent-primary"
              />
              <span className="text-sm font-mono text-text-secondary">
                Uppercase
              </span>
            </label>
            <p className="text-xs text-text-tertiary mt-1 ml-6">
              Generate UUIDs in uppercase
            </p>
          </div>

          {/* Remove Dashes Option */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeDashes}
                onChange={(e) => setRemoveDashes(e.target.checked)}
                className="w-4 h-4 bg-bg-secondary border border-border-primary accent-accent-primary"
              />
              <span className="text-sm font-mono text-text-secondary">
                Remove dashes
              </span>
            </label>
            <p className="text-xs text-text-tertiary mt-1 ml-6">
              Remove hyphens from UUIDs
            </p>
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            <Button variant="primary" onClick={handleGenerate} className="w-full">
              Generate UUID{count > 1 ? 's' : ''}
            </Button>
          </div>

          {/* Clear Button */}
          {uuids.length > 0 && (
            <div>
              <Button variant="secondary" onClick={handleClear} className="w-full">
                Clear
              </Button>
            </div>
          )}

          {/* Info */}
          <div className="pt-4 border-t border-border-primary">
            <p className="text-xs text-text-tertiary">
              Generated UUIDs are version 4 (random) as per RFC 4122
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <CodeDisplay
        title={`Generated UUIDs (${uuids.length})`}
        code={output}
        language="text"
        filename="uuids.txt"
      />
      </div>

      {/* Keyboard Shortcuts */}
      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate UUIDs' },
          { keys: 'Ctrl+K', action: 'Clear output' },
        ]}
      />
    </div>
  )
}
