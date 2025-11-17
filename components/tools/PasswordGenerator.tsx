'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generatePassword, copyToClipboard } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const { showToast } = useToast()

  const handleGenerate = () => {
    try {
      const pwd = generatePassword(length, options)
      setPassword(pwd)
      showToast('Password generated!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleCopy = async () => {
    if (!password) {
      showToast('Generate a password first', 'error')
      return
    }

    await copyToClipboard(password)
    showToast('Password copied to clipboard!', 'success')
  }

  const toggleOption = (option: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }))
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate password' },
    { key: 'c', ctrlKey: true, handler: handleCopy, description: 'Copy password' },
  ])

  // Calculate password strength
  const getStrength = (): { label: string; color: string; width: string } => {
    let score = 0
    if (length >= 8) score++
    if (length >= 12) score++
    if (length >= 16) score++
    if (options.uppercase) score++
    if (options.lowercase) score++
    if (options.numbers) score++
    if (options.symbols) score++

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '25%' }
    if (score <= 4) return { label: 'Fair', color: 'bg-yellow-500', width: '50%' }
    if (score <= 6) return { label: 'Good', color: 'bg-accent-primary', width: '75%' }
    return { label: 'Strong', color: 'bg-accent-primary', width: '100%' }
  }

  const strength = getStrength()

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Password Options
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-accent-primary"
            />
            <div className="flex justify-between text-xs font-mono text-text-secondary mt-1">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-3">
              Character Types
            </label>
            <div className="space-y-2">
              {[
                { key: 'uppercase' as const, label: 'Uppercase (A-Z)', example: 'ABCDEFG' },
                { key: 'lowercase' as const, label: 'Lowercase (a-z)', example: 'abcdefg' },
                { key: 'numbers' as const, label: 'Numbers (0-9)', example: '0123456' },
                { key: 'symbols' as const, label: 'Symbols (!@#$...)', example: '!@#$%^&' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-3 cursor-pointer bg-bg-tertiary border border-border-primary p-3 hover:border-accent-primary transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={options[item.key]}
                    onChange={() => toggleOption(item.key)}
                    className="w-4 h-4 accent-accent-primary"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-mono text-text-primary">{item.label}</span>
                    <p className="text-xs font-mono text-text-secondary mt-1">{item.example}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Strength
            </label>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-mono text-text-primary">{strength.label}</span>
                <span className="text-xs font-mono text-text-secondary">
                  {length} characters
                </span>
              </div>
              <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-mono text-lg font-semibold text-text-primary">
            Generated Password
          </h3>
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleGenerate}>
              Generate
            </Button>
            {password && (
              <Button variant="secondary" onClick={handleCopy}>
                Copy
              </Button>
            )}
          </div>
        </div>

        {password ? (
          <div className="bg-bg-tertiary border border-border-primary p-6">
            <p className="text-2xl font-mono text-accent-primary break-all text-center">
              {password}
            </p>
          </div>
        ) : (
          <div className="bg-bg-tertiary border border-border-primary p-6 min-h-[100px] flex items-center justify-center text-text-secondary font-mono text-sm">
            Click Generate to create a password
          </div>
        )}

        {password && (
          <div className="mt-4 text-xs font-mono text-text-secondary">
            <p>⚠️ Store this password in a secure password manager</p>
            <p className="mt-1">✓ Generated using cryptographically secure random values</p>
          </div>
        )}
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate password' },
          { keys: 'Ctrl+C', action: 'Copy password' },
        ]}
      />
    </div>
  )
}
