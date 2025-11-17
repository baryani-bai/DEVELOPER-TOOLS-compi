'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { convertNumberBase } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function NumberBaseConverter() {
  const [input, setInput] = useState('255')
  const [fromBase, setFromBase] = useState(10)
  const [results, setResults] = useState<Record<string, string>>({})
  const { showToast } = useToast()

  const bases = [
    { label: 'Binary (Base 2)', value: 2, example: '11111111' },
    { label: 'Octal (Base 8)', value: 8, example: '377' },
    { label: 'Decimal (Base 10)', value: 10, example: '255' },
    { label: 'Hexadecimal (Base 16)', value: 16, example: 'FF' },
  ]

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter a number', 'error')
      return
    }

    try {
      const newResults: Record<string, string> = {}

      bases.forEach(base => {
        if (base.value !== fromBase) {
          newResults[base.label] = convertNumberBase(input, fromBase, base.value)
        }
      })

      setResults(newResults)
      showToast('Converted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setResults({})
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Input Base
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bases.map((base) => (
            <Button
              key={base.value}
              variant={fromBase === base.value ? 'primary' : 'secondary'}
              onClick={() => setFromBase(base.value)}
            >
              Base {base.value}
            </Button>
          ))}
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary mb-2">
            Valid characters for Base {fromBase}:
          </p>
          <p className="text-sm font-mono text-accent-primary">
            {fromBase === 2 && '0-1'}
            {fromBase === 8 && '0-7'}
            {fromBase === 10 && '0-9'}
            {fromBase === 16 && '0-9, A-F'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={`Input (Base ${fromBase})`}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={bases.find(b => b.value === fromBase)?.example}
          rows={8}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Conversions</h3>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
          </div>

          {Object.keys(results).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(results).map(([label, value]) => (
                <div key={label} className="bg-bg-tertiary border border-border-primary p-4">
                  <p className="text-sm font-mono text-text-secondary mb-2">{label}</p>
                  <p className="text-lg font-mono text-accent-primary break-all">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Results will appear here after conversion
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Quick Reference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bases.map((base) => (
            <div key={base.value} className="bg-bg-tertiary border border-border-primary p-3">
              <p className="text-sm font-mono text-accent-primary mb-2">{base.label}</p>
              <p className="text-xs font-mono text-text-secondary">Example: {base.example}</p>
            </div>
          ))}
        </div>
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
