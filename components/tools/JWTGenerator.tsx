'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateJWT, copyToClipboard } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function JWTGenerator() {
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true\n}')
  const [secret, setSecret] = useState('your-secret-key')
  const [expiresIn, setExpiresIn] = useState(3600)
  const [token, setToken] = useState('')
  const { showToast } = useToast()

  const handleGenerate = () => {
    try {
      const payloadObj = JSON.parse(payload)
      const jwt = generateJWT(payloadObj, secret, expiresIn)
      setToken(jwt)
      showToast('JWT generated!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Invalid JSON payload', 'error')
    }
  }

  const handleClear = () => {
    setPayload('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true\n}')
    setSecret('your-secret-key')
    setExpiresIn(3600)
    setToken('')
  }

  const handleCopy = async () => {
    if (!token) {
      showToast('Generate a token first', 'error')
      return
    }

    await copyToClipboard(token)
    showToast('JWT copied to clipboard!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate JWT' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const expiryOptions = [
    { label: '15 min', value: 900 },
    { label: '1 hour', value: 3600 },
    { label: '1 day', value: 86400 },
    { label: '7 days', value: 604800 },
    { label: '30 days', value: 2592000 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          JWT Settings
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          ⚠️ Demo only - signature is not cryptographically secure. For production, use a proper JWT library.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Secret Key</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="your-secret-key"
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Expires In
            </label>
            <div className="grid grid-cols-5 gap-2">
              {expiryOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={expiresIn === option.value ? 'primary' : 'secondary'}
                  onClick={() => setExpiresIn(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Payload (JSON)"
          value={payload}
          onChange={setPayload}
          onClear={() => setPayload('{}')}
          placeholder='{"sub": "1234567890", "name": "John Doe"}'
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Generated JWT</h3>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleGenerate}>
                Generate
              </Button>
              {token && (
                <Button variant="secondary" onClick={handleCopy}>
                  Copy
                </Button>
              )}
            </div>
          </div>

          {token ? (
            <div className="space-y-4">
              <div className="bg-bg-tertiary border border-border-primary p-4 overflow-auto">
                <pre className="text-xs text-accent-primary font-mono break-all whitespace-pre-wrap">
                  {token}
                </pre>
              </div>

              <div className="bg-bg-tertiary border border-border-primary p-4">
                <p className="text-sm font-mono text-text-secondary mb-2">Token Parts:</p>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-text-secondary">Header:</span>
                    <p className="text-text-primary break-all">{token.split('.')[0]}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Payload:</span>
                    <p className="text-text-primary break-all">{token.split('.')[1]}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Signature:</span>
                    <p className="text-text-primary break-all">{token.split('.')[2]}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[300px] flex items-center justify-center text-text-secondary font-mono text-sm">
              JWT will appear here after generation
            </div>
          )}
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate JWT' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
