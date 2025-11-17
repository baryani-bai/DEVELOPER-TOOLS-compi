'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { parseCronExpression } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function CronParser() {
  const [input, setInput] = useState('*/5 * * * *')
  const [result, setResult] = useState<any>(null)
  const { showToast } = useToast()

  const handleParse = () => {
    if (!input.trim()) {
      showToast('Please enter a cron expression', 'error')
      return
    }

    const parsed = parseCronExpression(input)
    setResult(parsed)

    if (parsed.isValid) {
      showToast('Cron expression parsed!', 'success')
    } else {
      showToast(parsed.error || 'Invalid cron expression', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setResult(null)
  }

  const handlePreset = (preset: string) => {
    setInput(preset)
    const parsed = parseCronExpression(preset)
    setResult(parsed)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleParse, description: 'Parse expression' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const presets = [
    { label: 'Every minute', cron: '* * * * *' },
    { label: 'Every 5 minutes', cron: '*/5 * * * *' },
    { label: 'Every hour', cron: '0 * * * *' },
    { label: 'Every day at midnight', cron: '0 0 * * *' },
    { label: 'Every Monday at 9 AM', cron: '0 9 * * 1' },
    { label: 'First day of month', cron: '0 0 1 * *' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Cron Expression Format
        </h3>
        <div className="bg-bg-tertiary border border-border-primary p-4 font-mono text-sm">
          <p className="text-accent-primary mb-2">* * * * *</p>
          <p className="text-text-secondary">│ │ │ │ │</p>
          <p className="text-text-secondary">│ │ │ │ └─ Day of Week (0-6, Sunday=0)</p>
          <p className="text-text-secondary">│ │ │ └─── Month (1-12)</p>
          <p className="text-text-secondary">│ │ └───── Day of Month (1-31)</p>
          <p className="text-text-secondary">│ └─────── Hour (0-23)</p>
          <p className="text-text-secondary">└───────── Minute (0-59)</p>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Common Presets
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.cron}
              variant="secondary"
              onClick={() => handlePreset(preset.cron)}
              className="text-left justify-start"
            >
              <div>
                <p className="text-xs text-text-secondary">{preset.label}</p>
                <p className="text-sm text-accent-primary font-mono">{preset.cron}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Cron Expression"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="*/5 * * * *"
          rows={6}
        />

        <div className="bg-bg-secondary border border-border-primary p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Parsed Result</h3>
            <Button variant="primary" onClick={handleParse}>
              Parse
            </Button>
          </div>

          {result ? (
            <div className="space-y-4">
              {result.isValid ? (
                <>
                  <div className="bg-bg-tertiary border border-border-primary p-4">
                    <span className="text-sm font-mono text-text-secondary">Description</span>
                    <p className="font-mono text-text-primary mt-2">{result.description}</p>
                  </div>

                  {result.parts && (
                    <div className="bg-bg-tertiary border border-border-primary p-4">
                      <span className="text-sm font-mono text-text-secondary mb-3 block">
                        Expression Parts
                      </span>
                      <div className="space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Minute:</span>
                          <span className="text-accent-primary">{result.parts.minute}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Hour:</span>
                          <span className="text-accent-primary">{result.parts.hour}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Day of Month:</span>
                          <span className="text-accent-primary">{result.parts.dayOfMonth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Month:</span>
                          <span className="text-accent-primary">{result.parts.month}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Day of Week:</span>
                          <span className="text-accent-primary">{result.parts.dayOfWeek}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-bg-tertiary border border-border-primary p-4">
                  <span className="text-sm font-mono text-red-500">Error</span>
                  <p className="font-mono text-text-secondary mt-2">{result.error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 text-center text-text-secondary font-mono text-sm">
              Enter a cron expression and click Parse
            </div>
          )}
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Parse expression' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
