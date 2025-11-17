'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { parseURL } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function URLParser() {
  const [input, setInput] = useState('https://example.com:8080/path/to/page?name=John&age=30#section')
  const [parsed, setParsed] = useState<any>(null)
  const { showToast } = useToast()

  const handleParse = () => {
    if (!input.trim()) {
      showToast('Please enter a URL to parse', 'error')
      return
    }

    try {
      const result = parseURL(input)
      setParsed(result)
      showToast('URL parsed successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Parsing failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setParsed(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleParse, description: 'Parse URL' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <ToolPanel
          title="URL Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter URL to parse..."
          rows={3}
        />

        <div className="mt-4">
          <Button variant="primary" onClick={handleParse} className="w-full">
            Parse URL
          </Button>
        </div>
      </div>

      {parsed && (
        <>
          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              URL Components
            </h3>

            <div className="space-y-3">
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <p className="text-xs font-mono text-text-tertiary mb-2">Protocol</p>
                <p className="text-sm font-mono text-accent-primary">{parsed.protocol || 'N/A'}</p>
              </div>

              <div className="bg-bg-tertiary border border-border-primary p-4">
                <p className="text-xs font-mono text-text-tertiary mb-2">Hostname</p>
                <p className="text-sm font-mono text-accent-primary">{parsed.hostname || 'N/A'}</p>
              </div>

              {parsed.port && (
                <div className="bg-bg-tertiary border border-border-primary p-4">
                  <p className="text-xs font-mono text-text-tertiary mb-2">Port</p>
                  <p className="text-sm font-mono text-accent-primary">{parsed.port}</p>
                </div>
              )}

              <div className="bg-bg-tertiary border border-border-primary p-4">
                <p className="text-xs font-mono text-text-tertiary mb-2">Pathname</p>
                <p className="text-sm font-mono text-accent-primary">{parsed.pathname || '/'}</p>
              </div>

              {parsed.search && (
                <div className="bg-bg-tertiary border border-border-primary p-4">
                  <p className="text-xs font-mono text-text-tertiary mb-2">Query String</p>
                  <p className="text-sm font-mono text-accent-primary break-all">{parsed.search}</p>
                </div>
              )}

              {parsed.hash && (
                <div className="bg-bg-tertiary border border-border-primary p-4">
                  <p className="text-xs font-mono text-text-tertiary mb-2">Hash</p>
                  <p className="text-sm font-mono text-accent-primary">{parsed.hash}</p>
                </div>
              )}
            </div>
          </div>

          {Object.keys(parsed.params).length > 0 && (
            <div className="bg-bg-secondary border border-border-primary p-5">
              <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
                Query Parameters
              </h3>

              <div className="space-y-2">
                {Object.entries(parsed.params).map(([key, value]) => (
                  <div key={key} className="bg-bg-tertiary border border-border-primary p-3 flex items-center justify-between">
                    <span className="text-sm font-mono text-accent-primary">{key}</span>
                    <span className="text-sm font-mono text-text-secondary">=</span>
                    <span className="text-sm font-mono text-text-primary">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          URL Structure
        </h3>
        <div className="bg-bg-tertiary border border-border-primary p-4">
          <p className="text-xs font-mono text-text-secondary mb-3">
            protocol://hostname:port/pathname?query#hash
          </p>
          <p className="text-xs font-mono text-accent-primary">
            https://example.com:8080/path/page?key=value#section
          </p>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Parse URL' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
