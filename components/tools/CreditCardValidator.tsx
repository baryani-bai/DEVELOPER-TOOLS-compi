'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { validateCreditCard } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState('')
  const [result, setResult] = useState<{ valid: boolean; type: string; formatted: string } | null>(null)
  const { showToast } = useToast()

  const handleValidate = () => {
    if (!cardNumber.trim()) {
      showToast('Please enter a card number', 'error')
      return
    }

    try {
      const validation = validateCreditCard(cardNumber)
      setResult(validation)

      if (validation.valid) {
        showToast('Card number is valid!', 'success')
      } else {
        showToast('Card number is invalid', 'error')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Validation failed', 'error')
    }
  }

  const handleClear = () => {
    setCardNumber('')
    setResult(null)
  }

  const handleTestCard = (number: string) => {
    setCardNumber(number)
    setResult(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleValidate, description: 'Validate' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Enter Card Number
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
            className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            placeholder="Enter card number (spaces and dashes will be removed)..."
            maxLength={19}
          />

          <div className="flex gap-2">
            <Button variant="primary" onClick={handleValidate}>
              Validate Card
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Validation Result
          </h3>

          <div className="space-y-4">
            <div className={`border ${result.valid ? 'border-green-400' : 'border-red-400'} p-6 bg-bg-tertiary`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-mono font-bold">
                  {result.valid ? (
                    <span className="text-green-400">✓ VALID</span>
                  ) : (
                    <span className="text-red-400">✗ INVALID</span>
                  )}
                </div>
                <div className={`text-sm font-mono px-3 py-1 border ${result.valid ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}`}>
                  {result.type}
                </div>
              </div>
              <p className="text-xl font-mono text-text-primary mb-2">Formatted Number</p>
              <p className="text-2xl font-mono text-accent-primary">{result.formatted}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Test Card Numbers
        </h3>
        <p className="text-xs font-mono text-text-secondary mb-4">
          Click to use these valid test card numbers (Luhn algorithm compliant):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { type: 'Visa', number: '4532015112830366' },
            { type: 'Visa', number: '4916338506082832' },
            { type: 'Mastercard', number: '5425233430109903' },
            { type: 'Mastercard', number: '2222420000001113' },
            { type: 'Amex', number: '374245455400126' },
            { type: 'Amex', number: '378282246310005' },
            { type: 'Discover', number: '6011111111111117' },
            { type: 'Discover', number: '6011000990139424' },
          ].map(({ type, number }) => (
            <button
              key={number}
              onClick={() => handleTestCard(number)}
              className="bg-bg-tertiary border border-border-primary p-3 hover:border-accent-primary transition-colors text-left"
            >
              <p className="text-sm font-mono text-accent-primary mb-1">{type}</p>
              <p className="text-xs font-mono text-text-secondary">{number}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          About Card Validation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔢 Luhn Algorithm</p>
            <p className="text-text-secondary">
              The Luhn algorithm (mod 10) validates card numbers by calculating a checksum
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💳 Card Type Detection</p>
            <p className="text-text-secondary">
              Identifies Visa (4xxx), Mastercard (51-55, 2221-2720), Amex (34, 37), Discover (6011, 65)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✅ Valid Format</p>
            <p className="text-text-secondary">
              Enter 13-19 digit card numbers with or without spaces/dashes
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">⚠️ Security Note</p>
            <p className="text-text-secondary">
              This tool only validates format - never use real card numbers for testing
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🧮 How Luhn Works</p>
            <p className="text-text-secondary">
              Double every second digit from right, subtract 9 if &gt;9, sum all digits, valid if divisible by 10
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Use Cases</p>
            <p className="text-text-secondary">
              Form validation, payment testing, e-commerce development
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Validate' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
