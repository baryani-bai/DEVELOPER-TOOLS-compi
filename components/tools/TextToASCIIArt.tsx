'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { textToASCIIArt } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function TextToASCIIArt() {
  const [input, setInput] = useState('HELLO')
  const [style, setStyle] = useState<'standard' | 'slant' | 'banner'>('standard')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const styles = [
    { id: 'standard', name: 'Standard', description: 'Classic block letters' },
    { id: 'slant', name: 'Slant', description: 'Diagonal style' },
    { id: 'banner', name: 'Banner', description: 'Boxed text' },
  ]

  const handleGenerate = () => {
    if (!input.trim()) {
      showToast('Please enter text to convert', 'error')
      return
    }

    if (input.length > 20) {
      showToast('Please keep text under 20 characters for best results', 'error')
      return
    }

    try {
      const art = textToASCIIArt(input, style)
      setOutput(art)
      showToast('ASCII art generated!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    showToast('ASCII art copied to clipboard!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Input Text
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Text (max 20 characters, A-Z and 0-9)
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
              placeholder="Enter text..."
              maxLength={20}
            />
            <p className="text-xs text-text-tertiary mt-1">
              {input.length}/20 characters
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          ASCII Art Style
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id as 'standard' | 'slant' | 'banner')}
              className={`border p-4 text-left transition-colors ${
                style === s.id
                  ? 'bg-accent-primary/10 border-accent-primary'
                  : 'bg-bg-tertiary border-border-primary hover:border-accent-primary/50'
              }`}
            >
              <p className={`font-mono text-sm mb-1 ${style === s.id ? 'text-accent-primary' : 'text-text-primary'}`}>
                {s.name}
              </p>
              <p className="text-xs text-text-secondary">{s.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="primary" onClick={handleGenerate}>
            Generate ASCII Art
          </Button>
        </div>
      </div>

      {output && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              ASCII Art Output
            </h3>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleCopy}>
                Copy
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>

          <CodeDisplay title="ASCII Art" code={output} language="text" />
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          ASCII Art Examples
        </h3>

        <div className="space-y-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-xs font-mono text-accent-primary mb-2">Standard Style:</p>
            <pre className="text-xs text-text-secondary overflow-x-auto">
{`  A
 A A
AAAAA
A   A
A   A`}
            </pre>
          </div>

          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-xs font-mono text-accent-primary mb-2">Banner Style:</p>
            <pre className="text-xs text-text-secondary overflow-x-auto">
{`╔══════╗
║ TEXT ║
╚══════╝`}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💬 Comments</p>
            <p className="text-text-secondary">
              Create eye-catching section headers in source code
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📄 README Files</p>
            <p className="text-text-secondary">
              Add decorative titles to markdown documentation
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💻 Terminal Output</p>
            <p className="text-text-secondary">
              Display stylized text in CLI applications
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎨 Art Projects</p>
            <p className="text-text-secondary">
              Create retro-style text graphics
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
