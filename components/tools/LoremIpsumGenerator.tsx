'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import { generateLoremIpsum } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'

type GenerationType = 'words' | 'sentences' | 'paragraphs'

export default function LoremIpsumGenerator() {
  const [output, setOutput] = useState('')
  const [count, setCount] = useState(5)
  const [type, setType] = useState<GenerationType>('paragraphs')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const { showToast } = useToast()

  const handleGenerate = () => {
    const generated = generateLoremIpsum(count, type, startWithLorem)
    setOutput(generated)
    showToast(
      `Generated ${count} ${type} successfully!`,
      'success'
    )
  }

  const handleClear = () => {
    setOutput('')
  }

  const getMaxCount = () => {
    switch (type) {
      case 'words':
        return 1000
      case 'sentences':
        return 100
      case 'paragraphs':
        return 50
      default:
        return 100
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Options Panel */}
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Generator Options
        </h3>

        <div className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">
              Generate
            </label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={type === 'words' ? 'primary' : 'secondary'}
                onClick={() => setType('words')}
              >
                Words
              </Button>
              <Button
                variant={type === 'sentences' ? 'primary' : 'secondary'}
                onClick={() => setType('sentences')}
              >
                Sentences
              </Button>
              <Button
                variant={type === 'paragraphs' ? 'primary' : 'secondary'}
                onClick={() => setType('paragraphs')}
              >
                Paragraphs
              </Button>
            </div>
          </div>

          {/* Count */}
          <div>
            <label
              htmlFor="lorem-count"
              className="block text-sm font-mono text-text-secondary mb-2"
            >
              Number of {type}
            </label>
            <input
              id="lorem-count"
              type="number"
              min="1"
              max={getMaxCount()}
              value={count}
              onChange={(e) =>
                setCount(
                  Math.max(1, Math.min(getMaxCount(), parseInt(e.target.value) || 1))
                )
              }
              className="w-full bg-bg-primary border border-border-primary text-text-primary font-mono px-4 py-2 focus:outline-none focus:border-accent-primary"
            />
            <p className="text-xs text-text-tertiary mt-1">
              Max: {getMaxCount()} {type}
            </p>
          </div>

          {/* Start with Lorem Option */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 bg-bg-secondary border border-border-primary accent-accent-primary"
              />
              <span className="text-sm font-mono text-text-secondary">
                Start with "Lorem ipsum"
              </span>
            </label>
            <p className="text-xs text-text-tertiary mt-1 ml-6">
              Begin the text with the classic Lorem ipsum phrase
            </p>
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            <Button variant="primary" onClick={handleGenerate} className="w-full">
              Generate Lorem Ipsum
            </Button>
          </div>

          {/* Clear Button */}
          {output && (
            <div>
              <Button variant="secondary" onClick={handleClear} className="w-full">
                Clear
              </Button>
            </div>
          )}

          {/* Info */}
          <div className="pt-4 border-t border-border-primary">
            <p className="text-xs text-text-tertiary">
              Lorem ipsum is placeholder text commonly used in design and typography
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <CodeDisplay
        title="Generated Text"
        code={output}
        language="text"
        filename="lorem-ipsum.txt"
      />
    </div>
  )
}
