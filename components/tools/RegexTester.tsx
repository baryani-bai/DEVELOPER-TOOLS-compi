'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { testRegex } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

interface RegexTestResult {
  matches: RegExpMatchArray | null
  isValid: boolean
  error?: string
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('\\d{3}-\\d{3}-\\d{4}')
  const [flags, setFlags] = useState('g')
  const [testText, setTestText] = useState('Call me at 555-123-4567 or 555-987-6543')
  const [result, setResult] = useState<RegexTestResult | null>(null)
  const { showToast } = useToast()

  const handleTest = () => {
    const testResult = testRegex(pattern, flags, testText)
    setResult(testResult)

    if (!testResult.isValid) {
      showToast(testResult.error || 'Invalid regex', 'error')
    } else if (testResult.matches) {
      showToast(`Found ${testResult.matches.length} match(es)!`, 'success')
    } else {
      showToast('No matches found', 'info')
    }
  }

  const handleClear = () => {
    setPattern('')
    setFlags('g')
    setTestText('')
    setResult(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleTest, description: 'Test regex' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const commonFlags = [
    { flag: 'g', label: 'Global' },
    { flag: 'i', label: 'Ignore Case' },
    { flag: 'm', label: 'Multiline' },
    { flag: 's', label: 'Dot All' },
  ]

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''))
    } else {
      setFlags(flags + flag)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Regular Expression
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Pattern
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="w-full bg-bg-primary border border-border-primary text-text-primary font-mono px-4 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Flags
            </label>
            <div className="flex gap-2 mb-2">
              {commonFlags.map(({ flag, label }) => (
                <Button
                  key={flag}
                  variant={flags.includes(flag) ? 'primary' : 'secondary'}
                  onClick={() => toggleFlag(flag)}
                >
                  {flag} - {label}
                </Button>
              ))}
            </div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gimsu"
              className="w-full bg-bg-primary border border-border-primary text-text-primary font-mono px-4 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-text-secondary">/</span>
            <span className="font-mono text-accent-primary">{pattern || '...'}</span>
            <span className="font-mono text-text-secondary">/</span>
            <span className="font-mono text-accent-primary">{flags}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Test String"
          value={testText}
          onChange={setTestText}
          onClear={() => setTestText('')}
          placeholder="Enter text to test against regex..."
          rows={12}
        />

        <div className="bg-bg-secondary border border-border-primary p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Results</h3>
            <Button variant="primary" onClick={handleTest}>
              Test
            </Button>
          </div>

          <div className="space-y-4">
            {result && (
              <>
                <div className="bg-bg-tertiary border border-border-primary p-4">
                  <span className="text-sm font-mono text-text-secondary">Status</span>
                  <p className={`font-mono text-sm mt-1 ${result.isValid ? 'text-accent-primary' : 'text-red-500'}`}>
                    {result.isValid ? '✓ Valid regex' : `✗ ${result.error}`}
                  </p>
                </div>

                {result.isValid && (
                  <div className="bg-bg-tertiary border border-border-primary p-4">
                    <span className="text-sm font-mono text-text-secondary">Matches</span>
                    {result.matches && result.matches.length > 0 ? (
                      <div className="mt-2 space-y-2">
                        <p className="font-mono text-sm text-accent-primary">
                          Found {result.matches.length} match(es)
                        </p>
                        {result.matches.map((match: string, index: number) => (
                          <div key={index} className="bg-bg-primary border border-border-primary p-2">
                            <span className="text-xs font-mono text-text-secondary">Match {index + 1}:</span>
                            <p className="font-mono text-sm text-text-primary break-all">{match}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-mono text-sm text-text-secondary mt-1">No matches found</p>
                    )}
                  </div>
                )}
              </>
            )}

            {!result && (
              <div className="bg-bg-tertiary border border-border-primary p-4 text-center text-text-secondary font-mono text-sm">
                Test your regex pattern to see results
              </div>
            )}
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Test regex' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
