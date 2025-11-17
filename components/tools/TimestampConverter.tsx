'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { unixToDate, dateToUnix, formatDate } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type ConversionMode = 'unix-to-date' | 'date-to-unix'

export default function TimestampConverter() {
  const [mode, setMode] = useState<ConversionMode>('unix-to-date')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const { showToast } = useToast()

  const handleConvert = () => {
    try {
      if (mode === 'unix-to-date') {
        const timestamp = parseInt(input)
        if (isNaN(timestamp)) {
          showToast('Invalid Unix timestamp', 'error')
          return
        }
        const isoDate = unixToDate(timestamp)
        const formattedDate = formatDate(new Date(timestamp * 1000))
        setOutput(`ISO: ${isoDate}\n\nFormatted: ${formattedDate}`)
        showToast('Converted to date!', 'success')
      } else {
        const timestamp = dateToUnix(input)
        if (isNaN(timestamp)) {
          showToast('Invalid date format', 'error')
          return
        }
        setOutput(timestamp.toString())
        showToast('Converted to Unix timestamp!', 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleUseNow = () => {
    const now = new Date()
    setCurrentTime(now)
    if (mode === 'date-to-unix') {
      setInput(now.toISOString())
    } else {
      setInput(Math.floor(now.getTime() / 1000).toString())
    }
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <div className="flex gap-4 mb-6">
          <Button
            variant={mode === 'unix-to-date' ? 'primary' : 'secondary'}
            onClick={() => setMode('unix-to-date')}
          >
            Unix → Date
          </Button>
          <Button
            variant={mode === 'date-to-unix' ? 'primary' : 'secondary'}
            onClick={() => setMode('date-to-unix')}
          >
            Date → Unix
          </Button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-text-secondary">Current Time</span>
            <Button variant="secondary" onClick={handleUseNow}>
              Use Now
            </Button>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="font-mono text-accent-primary text-sm">
              Unix: {Math.floor(currentTime.getTime() / 1000)}
            </p>
            <p className="font-mono text-accent-primary text-sm mt-2">
              ISO: {currentTime.toISOString()}
            </p>
            <p className="font-mono text-text-secondary text-xs mt-2">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'unix-to-date' ? 'Unix Timestamp' : 'Date (ISO 8601)'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={
            mode === 'unix-to-date'
              ? '1640000000'
              : '2023-12-20T12:00:00Z'
          }
          rows={8}
        />

        <div className="bg-bg-secondary border border-border-primary p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {mode === 'unix-to-date' ? 'Converted Date' : 'Unix Timestamp'}
            </h3>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] font-mono text-sm text-text-primary whitespace-pre-wrap">
            {output || 'Result will appear here...'}
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
