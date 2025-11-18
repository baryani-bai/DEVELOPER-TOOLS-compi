'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateLoremIpsumVariant, loremIpsumVariants } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type VariantType = keyof typeof loremIpsumVariants

export default function LoremIpsumVariants() {
  const [variant, setVariant] = useState<VariantType>('classic')
  const [paragraphs, setParagraphs] = useState(3)
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const variants = [
    { id: 'classic', name: 'Classic Lorem', icon: '📜', description: 'Traditional Latin placeholder' },
    { id: 'hipster', name: 'Hipster Ipsum', icon: '🎩', description: 'Artisanal, organic filler text' },
    { id: 'bacon', name: 'Bacon Ipsum', icon: '🥓', description: 'Meat-lovers placeholder' },
    { id: 'pirate', name: 'Pirate Ipsum', icon: '🏴\u200D☠️', description: 'Arr matey, placeholder ahoy' },
    { id: 'zombie', name: 'Zombie Ipsum', icon: '🧟', description: 'Undead filler text' },
  ]

  const handleGenerate = () => {
    if (paragraphs < 1 || paragraphs > 20) {
      showToast('Please choose 1-20 paragraphs', 'error')
      return
    }

    try {
      const text = generateLoremIpsumVariant(variant, paragraphs)
      setOutput(text)
      showToast('Text generated successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleClear = () => {
    setOutput('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    showToast('Copied to clipboard!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Select Variant
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id as VariantType)}
              className={`border p-4 text-left transition-colors ${
                variant === v.id
                  ? 'bg-accent-primary/10 border-accent-primary'
                  : 'bg-bg-tertiary border-border-primary hover:border-accent-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">{v.icon}</div>
              <p className={`font-mono text-sm mb-1 ${variant === v.id ? 'text-accent-primary' : 'text-text-primary'}`}>
                {v.name}
              </p>
              <p className="text-xs text-text-secondary">{v.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Number of Paragraphs
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Paragraphs: {paragraphs}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value))}
              className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
            />
            <div className="flex justify-between text-xs font-mono text-text-tertiary mt-1">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>

          <Button variant="primary" onClick={handleGenerate}>
            Generate Text
          </Button>
        </div>
      </div>

      {output && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              Generated Text ({paragraphs} paragraph{paragraphs !== 1 ? 's' : ''})
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

          <div className="bg-bg-tertiary border border-border-primary p-4 max-h-96 overflow-y-auto">
            <div className="text-text-primary font-mono text-sm whitespace-pre-wrap">
              {output}
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          About Lorem Ipsum Generators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📜 Classic Lorem</p>
            <p className="text-text-secondary">
              Traditional Latin text from Cicero's "de Finibus Bonorum et Malorum" (45 BC)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎨 Use Cases</p>
            <p className="text-text-secondary">
              Design mockups, website prototypes, content layout testing
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎲 Random Generation</p>
            <p className="text-text-secondary">
              Each generation creates random combinations of sentences
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Pro Tip</p>
            <p className="text-text-secondary">
              Use themed variants for fun or to match your project's tone
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
