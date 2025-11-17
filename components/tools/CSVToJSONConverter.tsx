'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { csvToJSON, jsonToCSV } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type ConversionMode = 'csv-to-json' | 'json-to-csv'

export default function CSVToJSONConverter() {
  const [mode, setMode] = useState<ConversionMode>('csv-to-json')
  const [input, setInput] = useState('name,age,city\nJohn,30,New York\nJane,25,Los Angeles')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter data to convert', 'error')
      return
    }

    try {
      const result = mode === 'csv-to-json' ? csvToJSON(input) : jsonToCSV(input)
      setOutput(result)
      showToast(`Converted to ${mode === 'csv-to-json' ? 'JSON' : 'CSV'}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleSwitchMode = () => {
    const newMode: ConversionMode = mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json'
    setMode(newMode)
    // Swap input and output
    if (output) {
      setInput(output)
      setOutput('')
    }
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
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
            variant={mode === 'csv-to-json' ? 'primary' : 'secondary'}
            onClick={() => setMode('csv-to-json')}
          >
            CSV → JSON
          </Button>
          <Button
            variant={mode === 'json-to-csv' ? 'primary' : 'secondary'}
            onClick={() => setMode('json-to-csv')}
          >
            JSON → CSV
          </Button>
          <Button
            variant="secondary"
            onClick={handleSwitchMode}
          >
            ⇄ Switch & Swap
          </Button>
        </div>

        <div className="bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary">
            {mode === 'csv-to-json' ? (
              <>
                <span className="text-accent-primary">CSV Format:</span> First row is headers, comma-separated values
              </>
            ) : (
              <>
                <span className="text-accent-primary">JSON Format:</span> Must be an array of objects
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={
            mode === 'csv-to-json'
              ? 'name,age,city\nJohn,30,New York'
              : '[{"name":"John","age":30,"city":"New York"}]'
          }
          rows={20}
        />

        <CodeDisplay
          title={mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
          code={output}
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
