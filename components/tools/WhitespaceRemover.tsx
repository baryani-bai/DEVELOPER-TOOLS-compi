'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { removeWhitespace } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function WhitespaceRemover() {
  const [input, setInput] = useState('  Hello   World!  \n  This  has    extra   spaces  \n\n  And blank lines  ')
  const [output, setOutput] = useState('')
  const [removeLeading, setRemoveLeading] = useState(true)
  const [removeTrailing, setRemoveTrailing] = useState(true)
  const [removeMultiple, setRemoveMultiple] = useState(true)
  const [removeAllSpaces, setRemoveAllSpaces] = useState(false)
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false)
  const { showToast } = useToast()

  const handleRemove = () => {
    if (!input) {
      showToast('Please enter text to process', 'error')
      return
    }

    try {
      const cleaned = removeWhitespace(input, {
        removeLeading,
        removeTrailing,
        removeMultiple,
        removeAllSpaces,
        removeLineBreaks,
      })
      setOutput(cleaned)
      showToast('Whitespace removed successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Processing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleRemove, description: 'Remove whitespace' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Removal Options
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={removeLeading}
              onChange={(e) => setRemoveLeading(e.target.checked)}
              className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
            />
            Remove leading spaces (start of lines)
          </label>

          <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={removeTrailing}
              onChange={(e) => setRemoveTrailing(e.target.checked)}
              className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
            />
            Remove trailing spaces (end of lines)
          </label>

          <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={removeMultiple}
              onChange={(e) => setRemoveMultiple(e.target.checked)}
              className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
            />
            Remove multiple consecutive spaces (reduce to single)
          </label>

          <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={removeLineBreaks}
              onChange={(e) => setRemoveLineBreaks(e.target.checked)}
              className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
            />
            Remove line breaks (convert to single line)
          </label>

          <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={removeAllSpaces}
              onChange={(e) => setRemoveAllSpaces(e.target.checked)}
              className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
            />
            Remove ALL spaces (including single spaces)
          </label>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-xs font-mono text-text-tertiary">
            💡 Tip: "Remove ALL spaces" overrides other options
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text with extra whitespace..."
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Cleaned Text</h3>
            <Button variant="primary" onClick={handleRemove}>
              Remove Whitespace
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Output" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Cleaned text will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🧹 Code Cleanup</p>
            <p className="text-xs font-mono text-text-secondary">
              Remove trailing whitespace from code files
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📝 Text Formatting</p>
            <p className="text-xs font-mono text-text-secondary">
              Clean up text copied from PDFs or websites
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📄 Data Processing</p>
            <p className="text-xs font-mono text-text-secondary">
              Normalize whitespace in CSV or data files
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">✂️ String Manipulation</p>
            <p className="text-xs font-mono text-text-secondary">
              Prepare strings for comparison or storage
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Remove whitespace' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
