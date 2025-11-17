'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { sortText } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type SortMethod = 'alphabetical' | 'numerical' | 'length'
type Direction = 'asc' | 'desc'

export default function TextSorter() {
  const [input, setInput] = useState('Banana\nApple\nCherry\n123\n45\n678\nShort\nMedium line\nVery long line here')
  const [output, setOutput] = useState('')
  const [method, setMethod] = useState<SortMethod>('alphabetical')
  const [direction, setDirection] = useState<Direction>('asc')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const { showToast } = useToast()

  const handleSort = () => {
    if (!input.trim()) {
      showToast('Please enter text to sort', 'error')
      return
    }

    try {
      const sorted = sortText(input, { method, direction, caseSensitive })
      setOutput(sorted)
      showToast('Text sorted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Sorting failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleSort, description: 'Sort text' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const methods = [
    { value: 'alphabetical' as const, label: 'Alphabetical', icon: '🔤' },
    { value: 'numerical' as const, label: 'Numerical', icon: '🔢' },
    { value: 'length' as const, label: 'By Length', icon: '📏' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Sort Options
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Sort Method</label>
            <div className="grid grid-cols-3 gap-2">
              {methods.map((m) => (
                <Button
                  key={m.value}
                  variant={method === m.value ? 'primary' : 'secondary'}
                  onClick={() => setMethod(m.value)}
                >
                  {m.icon} {m.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Direction</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={direction === 'asc' ? 'primary' : 'secondary'}
                onClick={() => setDirection('asc')}
              >
                ⬆️ Ascending
              </Button>
              <Button
                variant={direction === 'desc' ? 'primary' : 'secondary'}
                onClick={() => setDirection('desc')}
              >
                ⬇️ Descending
              </Button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              Case Sensitive (for alphabetical sort)
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter lines of text to sort..."
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Sorted Output</h3>
            <Button variant="primary" onClick={handleSort}>
              Sort Lines
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Sorted Output" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Sorted text will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Sort Methods Explained
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔤 Alphabetical</p>
            <p className="text-xs font-mono text-text-secondary">
              Sorts lines in alphabetical order (A-Z or Z-A)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔢 Numerical</p>
            <p className="text-xs font-mono text-text-secondary">
              Sorts lines as numbers (smallest to largest or vice versa)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📏 By Length</p>
            <p className="text-xs font-mono text-text-secondary">
              Sorts lines by character length (shortest to longest or vice versa)
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Sort text' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
