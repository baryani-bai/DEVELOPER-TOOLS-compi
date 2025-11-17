'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { addBackslashes, removeBackslashes } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type Mode = 'add' | 'remove'

export default function BackslashEscaper() {
  const [mode, setMode] = useState<Mode>('add')
  const [input, setInput] = useState('Hello "World"\nNew line\tTab')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleProcess = () => {
    if (!input.trim()) {
      showToast('Please enter text to process', 'error')
      return
    }

    try {
      const result = mode === 'add' ? addBackslashes(input) : removeBackslashes(input)
      setOutput(result)
      showToast(`Backslashes ${mode === 'add' ? 'added' : 'removed'} successfully!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Processing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleProcess, description: mode === 'add' ? 'Add backslashes' : 'Remove backslashes' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Mode
        </h3>

        <div className="flex gap-2">
          <Button
            variant={mode === 'add' ? 'primary' : 'secondary'}
            onClick={() => setMode('add')}
          >
            ➕ Add Backslashes
          </Button>
          <Button
            variant={mode === 'remove' ? 'primary' : 'secondary'}
            onClick={() => setMode('remove')}
          >
            ➖ Remove Backslashes
          </Button>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary mb-2">
            {mode === 'add' ? 'Escapes special characters by adding backslashes' : 'Removes escape backslashes from text'}
          </p>
          <p className="text-xs font-mono text-text-tertiary">
            {mode === 'add'
              ? 'Example: "Hello" → \\"Hello\\"'
              : 'Example: \\"Hello\\" → "Hello"'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'add' ? 'Plain Text' : 'Escaped Text'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text to process..."
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {mode === 'add' ? 'Escaped Text' : 'Plain Text'}
            </h3>
            <Button variant="primary" onClick={handleProcess}>
              {mode === 'add' ? 'Add Backslashes' : 'Remove Backslashes'}
            </Button>
          </div>

          {output ? (
            <CodeDisplay title={mode === 'add' ? 'Escaped Text' : 'Plain Text'} code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Processed text will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Characters That Get Escaped
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Double Quote:</span>
            <p className="text-accent-primary mt-1">" → \\"</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Single Quote:</span>
            <p className="text-accent-primary mt-1">' → \\'</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">New Line:</span>
            <p className="text-accent-primary mt-1">↵ → \\n</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Tab:</span>
            <p className="text-accent-primary mt-1">⇥ → \\t</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Carriage Return:</span>
            <p className="text-accent-primary mt-1">CR → \\r</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-text-secondary">Backslash:</span>
            <p className="text-accent-primary mt-1">\\ → \\\\</p>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📝 String Literals</p>
            <p className="text-xs font-mono text-text-secondary">
              Prepare text for use in code string literals
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🗄️ Database Queries</p>
            <p className="text-xs font-mono text-text-secondary">
              Escape text for SQL queries and database operations
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📄 CSV Files</p>
            <p className="text-xs font-mono text-text-secondary">
              Prepare text containing quotes for CSV format
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔄 Data Processing</p>
            <p className="text-xs font-mono text-text-secondary">
              Convert between escaped and unescaped formats
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: mode === 'add' ? 'Add backslashes' : 'Remove backslashes' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
