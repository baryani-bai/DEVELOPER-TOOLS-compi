'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { convertTimezone, timezones } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function TimezoneConverter() {
  const [dateTimeInput, setDateTimeInput] = useState('')
  const [fromTimezone, setFromTimezone] = useState(0) // UTC
  const [toTimezone, setToTimezone] = useState(-5) // EST
  const [result, setResult] = useState<{ date: string; time: string; iso: string } | null>(null)
  const { showToast } = useToast()

  // Set current datetime on mount
  useEffect(() => {
    const now = new Date()
    const formatted = now.toISOString().slice(0, 16) // Format: YYYY-MM-DDThh:mm
    setDateTimeInput(formatted)
  }, [])

  const handleConvert = () => {
    if (!dateTimeInput) {
      showToast('Please enter a date and time', 'error')
      return
    }

    try {
      const converted = convertTimezone(dateTimeInput, fromTimezone, toTimezone)
      setResult(converted)
      showToast('Time converted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleSetNow = () => {
    const now = new Date()
    const formatted = now.toISOString().slice(0, 16)
    setDateTimeInput(formatted)
    showToast('Set to current time!', 'success')
  }

  const handleSwap = () => {
    const temp = fromTimezone
    setFromTimezone(toTimezone)
    setToTimezone(temp)
    setResult(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
  ])

  const getOffsetString = (offset: number) => {
    if (offset === 0) return 'UTC+0'
    const sign = offset > 0 ? '+' : ''
    return `UTC${sign}${offset}`
  }

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Date & Time Input
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateTimeInput}
              onChange={(e) => setDateTimeInput(e.target.value)}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>

          <Button variant="secondary" onClick={handleSetNow}>
            🕐 Set to Current Time
          </Button>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-mono text-lg font-semibold text-text-primary">
            Timezone Selection
          </h3>
          <Button variant="secondary" onClick={handleSwap}>
            ↔️ Swap
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              From Timezone
            </label>
            <select
              value={fromTimezone}
              onChange={(e) => setFromTimezone(parseFloat(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {timezones.map((tz) => (
                <option key={tz.name} value={tz.offset}>
                  {tz.name} ({getOffsetString(tz.offset)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              To Timezone
            </label>
            <select
              value={toTimezone}
              onChange={(e) => setToTimezone(parseFloat(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {timezones.map((tz) => (
                <option key={tz.name} value={tz.offset}>
                  {tz.name} ({getOffsetString(tz.offset)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="primary" onClick={handleConvert}>
            Convert Time
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Converted Time
          </h3>

          <div className="space-y-3">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Date</p>
              <p className="text-2xl font-mono text-accent-primary">{result.date}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Time</p>
              <p className="text-2xl font-mono text-accent-primary">{result.time}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">ISO 8601 Format</p>
              <p className="text-sm font-mono text-text-primary">{result.iso}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Popular Timezone Conversions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🌍 UTC (Universal)</p>
            <p className="text-text-secondary">
              Coordinated Universal Time - the global time standard
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🗽 EST (New York)</p>
            <p className="text-text-secondary">
              Eastern Standard Time - UTC-5 (or UTC-4 during DST)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🗼 CET (Paris)</p>
            <p className="text-text-secondary">
              Central European Time - UTC+1 (or UTC+2 during DST)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🗾 JST (Tokyo)</p>
            <p className="text-text-secondary">
              Japan Standard Time - UTC+9 (no DST)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">⚠️ Note on DST</p>
            <p className="text-text-secondary">
              Daylight Saving Time not included - adjust offsets manually
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Use Cases</p>
            <p className="text-text-secondary">
              Schedule meetings, coordinate across teams, plan travel
            </p>
          </div>
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
