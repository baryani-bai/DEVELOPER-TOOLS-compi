'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { rot13, caesarCipher } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function ROT13Cipher() {
  const [input, setInput] = useState('Hello World! This is a secret message.')
  const [output, setOutput] = useState('')
  const [shift, setShift] = useState(13)
  const { showToast } = useToast()

  const handleEncode = () => {
    if (!input.trim()) {
      showToast('Please enter text to encode', 'error')
      return
    }

    try {
      const encoded = shift === 13 ? rot13(input) : caesarCipher(input, shift)
      setOutput(encoded)
      showToast(`Encoded with shift ${shift}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Encoding failed', 'error')
    }
  }

  const handleDecode = () => {
    if (!input.trim()) {
      showToast('Please enter text to decode', 'error')
      return
    }

    try {
      // Decoding is just encoding with negative shift
      const decoded = shift === 13 ? rot13(input) : caesarCipher(input, -shift)
      setOutput(decoded)
      showToast(`Decoded with shift ${shift}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Decoding failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleEncode, description: 'Encode' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Caesar Cipher Shift
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Shift Amount: {shift}
            </label>
            <input
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
            />
            <div className="flex justify-between text-xs font-mono text-text-tertiary mt-1">
              <span>1</span>
              <span>13 (ROT13)</span>
              <span>25</span>
            </div>
          </div>

          {shift === 13 && (
            <div className="bg-accent-primary/10 border border-accent-primary/50 p-3">
              <p className="text-xs font-mono text-accent-primary">
                ✓ Using classic ROT13 cipher (shift 13)
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text to encode or decode..."
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Output</h3>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleEncode}>
                Encode
              </Button>
              <Button variant="secondary" onClick={handleDecode}>
                Decode
              </Button>
            </div>
          </div>

          {output ? (
            <CodeDisplay title="Result" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Encoded/Decoded text will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          About Caesar Cipher
        </h3>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>
            The Caesar cipher is one of the oldest encryption techniques. Each letter is shifted
            by a fixed number of positions in the alphabet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <p className="text-accent-primary mb-2">🔐 ROT13</p>
              <p className="text-text-secondary">
                Shift 13 - Its own inverse (encoding = decoding)
              </p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <p className="text-accent-primary mb-2">📊 Example</p>
              <p className="text-text-secondary">A→N, B→O, C→P ... Z→M</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <p className="text-accent-primary mb-2">⚠️ Security</p>
              <p className="text-text-secondary">Not secure - use for fun/obfuscation only</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <p className="text-accent-primary mb-2">🔄 Reversible</p>
              <p className="text-text-secondary">Easily decoded with the same shift</p>
            </div>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Encode' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
