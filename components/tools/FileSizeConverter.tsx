'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { convertFileSize, formatFileSize } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function FileSizeConverter() {
  const [value, setValue] = useState(1024)
  const [fromUnit, setFromUnit] = useState('MB')
  const [results, setResults] = useState<Record<string, number>>({})
  const { showToast } = useToast()

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  const handleConvert = () => {
    if (!value || value < 0) {
      showToast('Please enter a valid positive number', 'error')
      return
    }

    try {
      const converted: Record<string, number> = {}
      units.forEach(unit => {
        converted[unit] = convertFileSize(value, fromUnit, unit)
      })
      setResults(converted)
      showToast('Conversion successful!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Input
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              min="0"
              step="0.01"
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-3 focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-3 focus:outline-none focus:border-accent-primary"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="primary" onClick={handleConvert} className="w-full">
            Convert
          </Button>
        </div>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Conversion Results
          </h3>

          <div className="space-y-3">
            {units.map(unit => (
              <div
                key={unit}
                className={`bg-bg-tertiary border p-4 flex justify-between items-center ${
                  unit === fromUnit ? 'border-accent-primary' : 'border-border-primary'
                }`}
              >
                <span className="text-sm font-mono text-text-secondary">{unit}</span>
                <span className="text-lg font-mono font-bold text-accent-primary">
                  {results[unit].toFixed(6)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Unit Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">1 KB (Kilobyte)</p>
            <p className="text-text-secondary text-xs">= 1,024 Bytes</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">1 MB (Megabyte)</p>
            <p className="text-text-secondary text-xs">= 1,024 KB = 1,048,576 Bytes</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">1 GB (Gigabyte)</p>
            <p className="text-text-secondary text-xs">= 1,024 MB = 1,073,741,824 Bytes</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">1 TB (Terabyte)</p>
            <p className="text-text-secondary text-xs">= 1,024 GB = 1,099,511,627,776 Bytes</p>
          </div>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-xs font-mono text-text-secondary">
            💡 Note: This converter uses binary (base 1024) units, which is the standard for file sizes in operating systems.
          </p>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert' },
        ]}
      />
    </div>
  )
}
