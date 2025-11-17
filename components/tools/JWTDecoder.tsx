'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { decodeJWT, copyToClipboard } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function JWTDecoder() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<any>(null)
  const { showToast } = useToast()

  const handleDecode = () => {
    if (!token.trim()) {
      showToast('Please enter a JWT token', 'error')
      return
    }

    const result = decodeJWT(token)
    setDecoded(result)

    if (result.isValid) {
      showToast('JWT decoded successfully!', 'success')
    } else {
      showToast(result.error || 'Invalid JWT token', 'error')
    }
  }

  const handleClear = () => {
    setToken('')
    setDecoded(null)
  }

  const handleCopy = async (value: string, label: string) => {
    await copyToClipboard(value)
    showToast(`${label} copied!`, 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleDecode, description: 'Decode JWT' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const formatJSON = (obj: any): string => {
    try {
      return JSON.stringify(obj, null, 2)
    } catch {
      return String(obj)
    }
  }

  const formatTimestamp = (timestamp: number): string => {
    try {
      return new Date(timestamp * 1000).toLocaleString()
    } catch {
      return 'Invalid timestamp'
    }
  }

  return (
    <div className="space-y-6">
      <ToolPanel
        title="JWT Token"
        value={token}
        onChange={setToken}
        onClear={handleClear}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        rows={6}
      />

      <div className="flex gap-4">
        <Button variant="primary" onClick={handleDecode}>
          Decode JWT
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {decoded && (
        <div className="space-y-6">
          {decoded.isValid ? (
            <>
              <div className="bg-bg-secondary border border-border-primary p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-mono text-lg font-semibold text-text-primary">Header</h3>
                  <Button
                    variant="icon"
                    onClick={() => handleCopy(formatJSON(decoded.header), 'Header')}
                  >
                    📋
                  </Button>
                </div>
                <pre className="bg-bg-tertiary border border-border-primary p-4 overflow-auto font-mono text-sm text-text-primary">
                  {formatJSON(decoded.header)}
                </pre>
              </div>

              <div className="bg-bg-secondary border border-border-primary p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-mono text-lg font-semibold text-text-primary">Payload</h3>
                  <Button
                    variant="icon"
                    onClick={() => handleCopy(formatJSON(decoded.payload), 'Payload')}
                  >
                    📋
                  </Button>
                </div>
                <pre className="bg-bg-tertiary border border-border-primary p-4 overflow-auto font-mono text-sm text-text-primary">
                  {formatJSON(decoded.payload)}
                </pre>

                {decoded.payload && (
                  <div className="mt-4 space-y-2">
                    {decoded.payload.iat && (
                      <div className="bg-bg-tertiary border border-border-primary p-3">
                        <span className="text-sm font-mono text-text-secondary">Issued At (iat):</span>
                        <p className="font-mono text-sm text-accent-primary mt-1">
                          {formatTimestamp(decoded.payload.iat)}
                        </p>
                      </div>
                    )}
                    {decoded.payload.exp && (
                      <div className="bg-bg-tertiary border border-border-primary p-3">
                        <span className="text-sm font-mono text-text-secondary">Expires (exp):</span>
                        <p className="font-mono text-sm text-accent-primary mt-1">
                          {formatTimestamp(decoded.payload.exp)}
                        </p>
                        {decoded.payload.exp * 1000 < Date.now() && (
                          <p className="font-mono text-xs text-red-500 mt-1">⚠️ Token has expired</p>
                        )}
                      </div>
                    )}
                    {decoded.payload.nbf && (
                      <div className="bg-bg-tertiary border border-border-primary p-3">
                        <span className="text-sm font-mono text-text-secondary">Not Before (nbf):</span>
                        <p className="font-mono text-sm text-accent-primary mt-1">
                          {formatTimestamp(decoded.payload.nbf)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-bg-secondary border border-border-primary p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-mono text-lg font-semibold text-text-primary">Signature</h3>
                  <Button
                    variant="icon"
                    onClick={() => handleCopy(decoded.signature, 'Signature')}
                  >
                    📋
                  </Button>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-4 overflow-auto font-mono text-sm text-text-primary break-all">
                  {decoded.signature}
                </div>
                <p className="mt-4 text-xs font-mono text-text-secondary">
                  ⚠️ This tool decodes JWTs but does NOT verify signatures. Do not use for authentication verification.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-bg-secondary border border-border-primary p-6">
              <h3 className="font-mono text-lg font-semibold text-red-500 mb-4">Decoding Error</h3>
              <p className="font-mono text-sm text-text-secondary">{decoded.error}</p>
            </div>
          )}
        </div>
      )}

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Decode JWT' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
