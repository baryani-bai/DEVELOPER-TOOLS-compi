'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { textToMorse, morseToText, morseCodeMap } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type Mode = 'encode' | 'decode'

export default function MorseCodeConverter() {
  const [mode, setMode] = useState<Mode>('encode')
  const [input, setInput] = useState('HELLO WORLD')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter text to convert', 'error')
      return
    }

    try {
      const result = mode === 'encode' ? textToMorse(input) : morseToText(input)
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
              setInput('HELLO WORLD')
              setOutput('')
            }}
          >
            📤 Text → Morse
          </Button>
          <Button
            variant={mode === 'decode' ? 'primary' : 'secondary'}
            onClick={() => {
              setMode('decode')
              setInput('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')
              setOutput('')
            }}
          >
            📥 Morse → Text
          </Button>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary mb-2">
            {mode === 'encode'
              ? 'Converts text to International Morse Code'
              : 'Converts Morse code back to text'}
          </p>
          <p className="text-xs font-mono text-text-tertiary">
            {mode === 'encode'
              ? 'Example: "SOS" → ... --- ...'
              : 'Example: ... --- ... → "SOS"'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'encode' ? 'Plain Text' : 'Morse Code'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={mode === 'encode' ? 'Enter text to convert to Morse code...' : 'Enter Morse code (use spaces between letters, / for word breaks)...'}
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {mode === 'encode' ? 'Morse Code' : 'Plain Text'}
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
          Morse Code Reference
        </h3>
        <div className="space-y-3">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📡 Basics</p>
            <p className="text-xs font-mono text-text-secondary mb-2">
              • Dot (.) = short signal • Dash (-) = long signal • Space = letter separator • / = word separator
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs font-mono max-h-64 overflow-y-auto">
            {Object.entries(morseCodeMap).slice(0, 26).map(([letter, code]) => (
              <div key={letter} className="bg-bg-tertiary border border-border-primary p-2">
                <span className="text-accent-primary">{letter}:</span>
                <span className="text-text-secondary ml-1">{code}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs font-mono">
            {Object.entries(morseCodeMap).slice(26, 36).map(([letter, code]) => (
              <div key={letter} className="bg-bg-tertiary border border-border-primary p-2">
                <span className="text-accent-primary">{letter}:</span>
                <span className="text-text-secondary ml-1">{code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📻 Ham Radio</p>
            <p className="text-xs font-mono text-text-secondary">
              Communicate using International Morse Code
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🎓 Learning</p>
            <p className="text-xs font-mono text-text-secondary">
              Learn and practice Morse code
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🧩 Puzzles</p>
            <p className="text-xs font-mono text-text-secondary">
              Decode Morse messages in games and CTFs
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🚨 Emergency</p>
            <p className="text-xs font-mono text-text-secondary">
              Universal SOS signal: ... --- ...
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
