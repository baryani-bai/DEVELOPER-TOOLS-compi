'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { validateEmail, validateURL } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type ValidationType = 'email' | 'url'

export default function EmailURLValidator() {
  const [type, setType] = useState<ValidationType>('email')
  const [input, setInput] = useState('user@example.com')
  const [result, setResult] = useState<any>(null)
  const { showToast } = useToast()

  const handleValidate = () => {
    if (!input.trim()) {
      showToast(`Please enter ${type === 'email' ? 'an email' : 'a URL'}`, 'error')
      return
    }

    try {
      const validation = type === 'email' ? validateEmail(input) : validateURL(input)
      setResult(validation)

      if (validation.valid) {
        showToast(`Valid ${type}!`, 'success')
      } else {
        showToast(validation.error || 'Invalid format', 'error')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Validation failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
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
          Validation Type
        </h3>

        <div className="flex gap-2">
          <Button
            variant={type === 'email' ? 'primary' : 'secondary'}
            onClick={() => {
              setType('email')
              setInput('user@example.com')
              setResult(null)
            }}
          >
            📧 Email Address
          </Button>
          <Button
            variant={type === 'url' ? 'primary' : 'secondary'}
            onClick={() => {
              setType('url')
              setInput('https://www.example.com')
              setResult(null)
            }}
          >
            🔗 URL
          </Button>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <ToolPanel
          title={type === 'email' ? 'Email Address' : 'URL'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={type === 'email' ? 'Enter email address...' : 'Enter URL...'}
          rows={3}
        />

        <div className="mt-4">
          <Button variant="primary" onClick={handleValidate} className="w-full">
            Validate {type === 'email' ? 'Email' : 'URL'}
          </Button>
        </div>
      </div>

      {result && (
        <div className={`border p-5 ${
          result.valid
            ? 'bg-green-900/20 border-green-700'
            : 'bg-red-900/20 border-red-700'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-2xl ${result.valid ? 'text-green-400' : 'text-red-400'}`}>
              {result.valid ? '✓' : '✗'}
            </span>
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {result.valid ? 'Valid!' : 'Invalid'}
            </h3>
          </div>

          {!result.valid && result.error && (
            <p className="text-sm font-mono text-red-400 bg-red-900/30 border border-red-700 p-3 rounded">
              {result.error}
            </p>
          )}

          {result.valid && (
            <p className="text-sm font-mono text-green-400">
              The {type} format is correct and passes all validation checks.
            </p>
          )}
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          {type === 'email' ? 'Email' : 'URL'} Format Rules
        </h3>

        {type === 'email' ? (
          <div className="space-y-3 text-sm font-mono text-text-secondary">
            <p>✓ Must contain exactly one @ symbol</p>
            <p>✓ Local part (before @) must not exceed 64 characters</p>
            <p>✓ Domain (after @) must not exceed 255 characters</p>
            <p>✓ Must have valid domain with at least one dot</p>
            <p>✓ No spaces or special characters except allowed ones</p>
            <div className="mt-4 bg-bg-tertiary border border-border-primary p-3">
              <p className="text-accent-primary text-xs mb-2">Valid Examples:</p>
              <p className="text-xs">user@example.com</p>
              <p className="text-xs">john.doe@company.co.uk</p>
              <p className="text-xs">test+tag@email.com</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-sm font-mono text-text-secondary">
            <p>✓ Must start with valid protocol (http, https, ftp, ftps)</p>
            <p>✓ Must contain a hostname</p>
            <p>✓ Can include port number (e.g., :8080)</p>
            <p>✓ Can include path, query string, and hash</p>
            <p>✓ Must follow standard URL structure</p>
            <div className="mt-4 bg-bg-tertiary border border-border-primary p-3">
              <p className="text-accent-primary text-xs mb-2">Valid Examples:</p>
              <p className="text-xs">https://www.example.com</p>
              <p className="text-xs">http://localhost:3000/path</p>
              <p className="text-xs">https://api.example.com/v1?key=value#section</p>
            </div>
          </div>
        )}
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
