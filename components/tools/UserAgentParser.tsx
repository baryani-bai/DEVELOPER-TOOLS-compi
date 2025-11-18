'use client'

import { useState, useEffect } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { parseUserAgent } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function UserAgentParser() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{
    browser: { name: string; version: string }
    os: { name: string; version: string }
    device: string
    raw: string
  } | null>(null)
  const { showToast } = useToast()

  // Auto-detect current browser's user agent on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInput(navigator.userAgent)
    }
  }, [])

  const handleParse = () => {
    if (!input.trim()) {
      showToast('Please enter a user agent string', 'error')
      return
    }

    try {
      const parsed = parseUserAgent(input)
      setResult(parsed)
      showToast('User agent parsed successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Parsing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setResult(null)
  }

  const handleDetectCurrent = () => {
    if (typeof window !== 'undefined') {
      setInput(navigator.userAgent)
      showToast('Current browser UA detected!', 'success')
    }
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleParse, description: 'Parse user agent' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-mono text-lg font-semibold text-text-primary">
            User Agent String
          </h3>
          <Button variant="secondary" onClick={handleDetectCurrent}>
            🔍 Detect Current Browser
          </Button>
        </div>

        <ToolPanel
          title=""
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Paste user agent string here or detect your current browser..."
          rows={4}
        />

        <div className="mt-4">
          <Button variant="primary" onClick={handleParse}>
            Parse User Agent
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Parsed Information
          </h3>

          <div className="space-y-4">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <h4 className="font-mono text-sm text-accent-primary mb-2">🌐 BROWSER</h4>
              <p className="text-text-primary font-mono text-lg">{result.browser.name}</p>
              {result.browser.version && (
                <p className="text-text-secondary font-mono text-sm">Version: {result.browser.version}</p>
              )}
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <h4 className="font-mono text-sm text-accent-primary mb-2">💻 OPERATING SYSTEM</h4>
              <p className="text-text-primary font-mono text-lg">{result.os.name}</p>
              {result.os.version && (
                <p className="text-text-secondary font-mono text-sm">Version: {result.os.version}</p>
              )}
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <h4 className="font-mono text-sm text-accent-primary mb-2">📱 DEVICE TYPE</h4>
              <p className="text-text-primary font-mono text-lg">{result.device}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Example User Agents
        </h3>
        <div className="space-y-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-1">Chrome on Windows:</p>
            <p className="text-text-secondary break-all">
              Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-1">Safari on macOS:</p>
            <p className="text-text-secondary break-all">
              Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-1">Firefox on Linux:</p>
            <p className="text-text-secondary break-all">
              Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/121.0
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-1">Mobile Chrome on Android:</p>
            <p className="text-text-secondary break-all">
              Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Parse' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
