'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { textToBinary, binaryToText } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type Mode = 'encode' | 'decode'

export default function BinaryTextConverter() {
  const [mode, setMode] = useState<Mode>('encode')
  const [input, setInput] = useState('Hello World!')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter text to convert', 'error')
      return
    }

    try {
      const result = mode === 'encode' ? textToBinary(input) : binaryToText(input)
      setOutput(result)
      showToast(`Successfully ${mode === 'encode' ? 'encoded' : 'decoded'}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Conversion Mode
        </h3>

        <div className="flex gap-2">
          <Button
            variant={mode === 'encode' ? 'primary' : 'secondary'}
            onClick={() => {
              setMode('encode')
              setInput('Hello World!')
              setOutput('')
            }}
          >
            📤 Text → Binary
          </Button>
          <Button
            variant={mode === 'decode' ? 'primary' : 'secondary'}
            onClick={() => {
              setMode('decode')
              setInput('01001000 01100101 01101100 01101100 01101111')
              setOutput('')
            }}
          >
            📥 Binary → Text
          </Button>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary mb-2">
            {mode === 'encode'
              ? 'Converts text to 8-bit binary representation'
              : 'Converts binary (8-bit bytes) back to text'}
          </p>
          <p className="text-xs font-mono text-text-tertiary">
            {mode === 'encode'
              ? 'Example: "A" → 01000001'
              : 'Example: 01000001 → "A"'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'encode' ? 'Plain Text' : 'Binary Code'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={mode === 'encode' ? 'Enter text to convert to binary...' : 'Enter binary code (e.g., 01001000 01100101)...'}
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {mode === 'encode' ? 'Binary Code' : 'Plain Text'}
            </h3>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Output" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Converted output will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Binary Encoding Guide
        </h3>
        <div className="space-y-3">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📊 8-Bit Representation</p>
            <p className="text-xs font-mono text-text-secondary">
              Each character is represented as an 8-bit binary number (ASCII encoding)
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <span className="text-text-secondary">A:</span>
              <p className="text-accent-primary mt-1">01000001</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <span className="text-text-secondary">0:</span>
              <p className="text-accent-primary mt-1">00110000</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <span className="text-text-secondary">Space:</span>
              <p className="text-accent-primary mt-1">00100000</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-3">
              <span className="text-text-secondary">!:</span>
              <p className="text-accent-primary mt-1">00100001</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">💻 Computer Science</p>
            <p className="text-xs font-mono text-text-secondary">
              Learn how computers represent text internally
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🎓 Education</p>
            <p className="text-xs font-mono text-text-secondary">
              Understand binary encoding and ASCII
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔐 Data Encoding</p>
            <p className="text-xs font-mono text-text-secondary">
              Convert text for binary data transmission
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🧩 Puzzles</p>
            <p className="text-xs font-mono text-text-secondary">
              Decode binary messages and CTF challenges
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
