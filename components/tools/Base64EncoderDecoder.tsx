'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import { base64Encode, base64Decode } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'

type Mode = 'encode' | 'decode'

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string>()
  const [mode, setMode] = useState<Mode>('encode')
  const { showToast } = useToast()

  const handleEncode = () => {
    if (!input.trim()) {
      setError('Please enter some text to encode')
      setOutput('')
      return
    }

    try {
      const encoded = base64Encode(input)
      setOutput(encoded)
      setError(undefined)
      showToast('Text encoded successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to encode'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleDecode = () => {
    if (!input.trim()) {
      setError('Please enter some Base64 to decode')
      setOutput('')
      return
    }

    try {
      const decoded = base64Decode(input)
      setOutput(decoded)
      setError(undefined)
      showToast('Base64 decoded successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to decode'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    // Clear output when switching modes
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
        title={mode === 'encode' ? 'Text Input' : 'Base64 Input'}
        value={input}
        onChange={setInput}
        onClear={handleClear}
        placeholder={
          mode === 'encode'
            ? 'Enter text to encode...'
            : 'Enter Base64 string to decode...'
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

          {/* Action Button */}
          <div>
            <Button
              variant="primary"
              onClick={mode === 'encode' ? handleEncode : handleDecode}
            >
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
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
        filename={mode === 'encode' ? 'encoded.txt' : 'decoded.txt'}
      />
    </div>
  )
}
