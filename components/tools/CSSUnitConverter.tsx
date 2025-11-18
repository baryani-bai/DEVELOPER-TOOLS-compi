'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { convertCSSUnit } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function CSSUnitConverter() {
  const [inputValue, setInputValue] = useState(16)
  const [fromUnit, setFromUnit] = useState('px')
  const [baseFontSize, setBaseFontSize] = useState(16)
  const [results, setResults] = useState<Record<string, number>>({})
  const { showToast } = useToast()

  const units = ['px', 'rem', 'em', 'pt', 'cm', 'mm', 'in']

  const handleConvert = () => {
    try {
      const converted: Record<string, number> = {}
      units.forEach(unit => {
        if (unit !== fromUnit) {
          converted[unit] = convertCSSUnit(inputValue, fromUnit, unit, baseFontSize)
        }
      })
      setResults(converted)
      showToast('Units converted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  // Auto-convert on value change
  useEffect(() => {
    if (inputValue) {
      handleConvert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, fromUnit, baseFontSize])

  const handleClear = () => {
    setInputValue(16)
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
          Input Value
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Value</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
              placeholder="Enter value..."
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-mono text-text-secondary mb-2">
            Base Font Size (for rem/em): {baseFontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={baseFontSize}
            onChange={(e) => setBaseFontSize(parseInt(e.target.value))}
            className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
          />
          <div className="flex justify-between text-xs font-mono text-text-tertiary mt-1">
            <span>12px</span>
            <span>16px (default)</span>
            <span>24px</span>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Converted Values
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map(unit => (
            <div
              key={unit}
              className={`border p-4 ${
                unit === fromUnit
                  ? 'bg-accent-primary/10 border-accent-primary'
                  : 'bg-bg-tertiary border-border-primary'
              }`}
            >
              <p className="text-xs font-mono text-text-secondary mb-1">{unit.toUpperCase()}</p>
              <p className="text-2xl font-mono text-accent-primary">
                {unit === fromUnit
                  ? inputValue.toFixed(3)
                  : (results[unit] || 0).toFixed(3)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          CSS Unit Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📏 px (Pixels)</p>
            <p className="text-text-secondary">Absolute unit. 1px = 1/96th of 1 inch</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📐 rem (Root Em)</p>
            <p className="text-text-secondary">Relative to root font-size (usually 16px)</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📊 em</p>
            <p className="text-text-secondary">Relative to parent element font-size</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📝 pt (Points)</p>
            <p className="text-text-secondary">1pt = 1/72 of 1 inch ≈ 1.33px</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📏 cm (Centimeters)</p>
            <p className="text-text-secondary">1cm ≈ 37.8px</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📐 mm (Millimeters)</p>
            <p className="text-text-secondary">1mm ≈ 3.78px</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📏 in (Inches)</p>
            <p className="text-text-secondary">1in = 96px (CSS spec)</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Best Practice</p>
            <p className="text-text-secondary">Use rem for fonts, px for borders/margins</p>
          </div>
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
