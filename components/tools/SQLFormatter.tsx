'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatSQL } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function SQLFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleFormat = () => {
    if (!input.trim()) {
      showToast('Please enter SQL code', 'error')
      return
    }

    try {
      const formatted = formatSQL(input)
      setOutput(formatted)
      showToast('SQL formatted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Formatting failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleFormat, description: 'Format SQL' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear input' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          SQL Formatter
        </h3>
        <p className="text-sm text-text-secondary">
          Beautify and format your SQL queries with proper indentation and line breaks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="SQL Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="SELECT users.name, orders.total FROM users JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY orders.total DESC"
          rows={20}
        />

        <CodeDisplay
          title="Formatted SQL"
          code={output}
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Format SQL' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
