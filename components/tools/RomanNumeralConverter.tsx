'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { decimalToRoman, romanToDecimal } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type Mode = 'to-roman' | 'to-decimal'

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState<Mode>('to-roman')
  const [input, setInput] = useState('2024')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter a value to convert', 'error')
      return
    }

    try {
      if (mode === 'to-roman') {
        const num = parseInt(input)
        if (isNaN(num)) {
          showToast('Please enter a valid number', 'error')
          return
        }
        const roman = decimalToRoman(num)
        setOutput(roman)
        showToast('Converted to Roman numerals!', 'success')
      } else {
        const decimal = romanToDecimal(input)
        setOutput(decimal.toString())
        showToast('Converted to decimal!', 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setInput(newMode === 'to-roman' ? '2024' : 'MMXXIV')
    setOutput('')
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

        <div className="flex gap-2">
          <Button
            variant={mode === 'to-roman' ? 'primary' : 'secondary'}
            onClick={() => handleModeChange('to-roman')}
          >
            🔢 Decimal → Roman
          </Button>
          <Button
            variant={mode === 'to-decimal' ? 'primary' : 'secondary'}
            onClick={() => handleModeChange('to-decimal')}
          >
            🏛️ Roman → Decimal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'to-roman' ? 'Decimal Number' : 'Roman Numerals'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={mode === 'to-roman' ? 'Enter a number (1-3999)...' : 'Enter Roman numerals (e.g., MCMXC)...'}
          rows={8}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {mode === 'to-roman' ? 'Roman Numerals' : 'Decimal Number'}
            </h3>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
          </div>

          {output ? (
            <div className="bg-bg-tertiary border border-border-primary p-6 text-center">
              <p className="text-5xl font-mono text-accent-primary mb-2">{output}</p>
              <p className="text-xs text-text-secondary font-mono">Result</p>
            </div>
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[120px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Converted value will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Roman Numeral Reference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {[
            ['I', '1'],
            ['V', '5'],
            ['X', '10'],
            ['L', '50'],
            ['C', '100'],
            ['D', '500'],
            ['M', '1000'],
          ].map(([roman, decimal]) => (
            <div key={roman} className="bg-bg-tertiary border border-border-primary p-3">
              <p className="text-2xl font-mono text-accent-primary">{roman}</p>
              <p className="text-xs text-text-secondary font-mono mt-1">{decimal}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📝 Rules:</p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside">
              <li>Symbols are written from largest to smallest, left to right</li>
              <li>When a smaller symbol appears before a larger one, subtract it (e.g., IV = 4, IX = 9)</li>
              <li>Maximum value: 3999 (MMMCMXCIX)</li>
              <li>Subtraction only for I (1), X (10), and C (100)</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">4:</span>
              <span className="text-accent-primary ml-2">IV</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">9:</span>
              <span className="text-accent-primary ml-2">IX</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">40:</span>
              <span className="text-accent-primary ml-2">XL</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">90:</span>
              <span className="text-accent-primary ml-2">XC</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">400:</span>
              <span className="text-accent-primary ml-2">CD</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">900:</span>
              <span className="text-accent-primary ml-2">CM</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">1994:</span>
              <span className="text-accent-primary ml-2">MCMXCIV</span>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-2">
              <span className="text-text-secondary">3999:</span>
              <span className="text-accent-primary ml-2">MMMCMXCIX</span>
            </div>
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
