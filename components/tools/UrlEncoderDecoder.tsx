'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import { urlEncode, urlDecode } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'

type Mode = 'encode' | 'decode'

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string>()
  const [mode, setMode] = useState<Mode>('encode')
  const [encodeAll, setEncodeAll] = useState(false)
  const { showToast } = useToast()

  const handleEncode = () => {
    if (!input.trim()) {
      setError('Please enter some text to encode')
      setOutput('')
      return
    }

    try {
      const encoded = urlEncode(input, encodeAll)
      setOutput(encoded)
      setError(undefined)
      showToast('URL encoded successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to encode'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleDecode = () => {
    if (!input.trim()) {
      setError('Please enter a URL to decode')
      setOutput('')
      return
    }

    try {
      const decoded = urlDecode(input)
      setOutput(decoded)
      setError(undefined)
      showToast('URL decoded successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to decode'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setOutput('')
    setError(undefined)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(undefined)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <ToolPanel
        title={mode === 'encode' ? 'Text Input' : 'Encoded URL'}
        value={input}
        onChange={setInput}
        onClear={handleClear}
        placeholder={
          mode === 'encode'
            ? 'Enter text or URL to encode...'
            : 'Enter encoded URL to decode...'
        }
        rows={20}
      >
        {/* Options */}
        <div className="space-y-4">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Mode
            </label>
            <div className="flex gap-2">
              <Button
                variant={mode === 'encode' ? 'primary' : 'secondary'}
                onClick={() => handleModeChange('encode')}
              >
                Encode
              </Button>
              <Button
                variant={mode === 'decode' ? 'primary' : 'secondary'}
                onClick={() => handleModeChange('decode')}
              >
                Decode
              </Button>
            </div>
          </div>

          {/* Encode All Option (only in encode mode) */}
          {mode === 'encode' && (
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={encodeAll}
                  onChange={(e) => setEncodeAll(e.target.checked)}
                  className="w-4 h-4 bg-bg-secondary border border-border-primary accent-accent-primary"
                />
                <span className="text-sm font-mono text-text-secondary">
                  Encode all characters
                </span>
              </label>
              <p className="text-xs text-text-tertiary mt-1 ml-6">
                Encode all characters including /:?#[]@
              </p>
            </div>
          )}

          {/* Action Button */}
          <div>
            <Button
              variant="primary"
              onClick={mode === 'encode' ? handleEncode : handleDecode}
            >
              {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
            </Button>
          </div>
        </div>
      </ToolPanel>

      {/* Output Panel */}
      <CodeDisplay
        title="Output"
        code={output}
        error={error}
        language="text"
        filename={mode === 'encode' ? 'encoded-url.txt' : 'decoded-url.txt'}
      />
    </div>
  )
}
