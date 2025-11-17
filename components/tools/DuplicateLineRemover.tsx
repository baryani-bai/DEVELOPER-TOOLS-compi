'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { removeDuplicateLines } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function DuplicateLineRemover() {
  const [input, setInput] = useState('Apple\nBanana\napple\nCherry\nBanana\nDurian\nApple\nCherry')
  const [output, setOutput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 })
  const { showToast } = useToast()

  const handleRemoveDuplicates = () => {
    if (!input.trim()) {
      showToast('Please enter text to process', 'error')
      return
    }

    try {
      const result = removeDuplicateLines(input, caseSensitive)
      const originalLines = input.split('\n').length
      const uniqueLines = result.split('\n').length
      const removedLines = originalLines - uniqueLines

      setOutput(result)
      setStats({
        original: originalLines,
        unique: uniqueLines,
        removed: removedLines,
      })
      showToast(`Removed ${removedLines} duplicate line${removedLines === 1 ? '' : 's'}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Processing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setStats({ original: 0, unique: 0, removed: 0 })
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleRemoveDuplicates, description: 'Remove duplicates' },
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
            <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              Case Sensitive (treat "Apple" and "apple" as different)
            </label>
          </div>

          {output && (
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <h4 className="text-sm font-mono text-text-secondary mb-3">Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-mono text-text-tertiary mb-1">Original Lines</p>
                  <p className="text-2xl font-mono font-bold text-text-primary">{stats.original}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-text-tertiary mb-1">Unique Lines</p>
                  <p className="text-2xl font-mono font-bold text-accent-primary">{stats.unique}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-text-tertiary mb-1">Duplicates Removed</p>
                  <p className="text-2xl font-mono font-bold text-red-500">{stats.removed}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter lines of text (duplicates will be removed)..."
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Unique Lines</h3>
            <Button variant="primary" onClick={handleRemoveDuplicates}>
              Remove Duplicates
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Unique Lines" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Unique lines will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          How It Works
        </h3>
        <div className="space-y-3 text-sm font-mono text-text-secondary">
          <p>
            ✓ <span className="text-accent-primary">Preserves Order:</span> First occurrence of each line is kept
          </p>
          <p>
            ✓ <span className="text-accent-primary">Case Sensitivity:</span> Toggle to control how duplicates are detected
          </p>
          <p>
            ✓ <span className="text-accent-primary">Line-by-Line:</span> Each line is treated as a separate item
          </p>
          <p>
            ✓ <span className="text-accent-primary">Statistics:</span> See how many duplicates were removed
          </p>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Remove duplicates' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
