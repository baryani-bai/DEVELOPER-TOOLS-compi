'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateSlug } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function SlugGenerator() {
  const [input, setInput] = useState('Hello World! This is a Test Title')
  const [output, setOutput] = useState('')
  const [separator, setSeparator] = useState('-')
  const [lowercase, setLowercase] = useState(true)
  const [removeSpecialChars, setRemoveSpecialChars] = useState(true)
  const { showToast } = useToast()

  const handleGenerate = () => {
    if (!input.trim()) {
      showToast('Please enter text to convert', 'error')
      return
    }

    try {
      const slug = generateSlug(input, { separator, lowercase, removeSpecialChars })
      setOutput(slug)
      showToast('Slug generated successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate slug' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const separators = [
    { value: '-', label: 'Hyphen (-)', example: 'hello-world' },
    { value: '_', label: 'Underscore (_)', example: 'hello_world' },
    { value: '.', label: 'Dot (.)', example: 'hello.world' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Slug Options
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Separator</label>
            <div className="grid grid-cols-3 gap-2">
              {separators.map((s) => (
                <Button
                  key={s.value}
                  variant={separator === s.value ? 'primary' : 'secondary'}
                  onClick={() => setSeparator(s.value)}
                  className="text-xs"
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              Convert to lowercase
            </label>

            <label className="flex items-center gap-2 text-sm font-mono text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={removeSpecialChars}
                onChange={(e) => setRemoveSpecialChars(e.target.checked)}
                className="w-4 h-4 bg-bg-tertiary border border-border-primary text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              Remove special characters
            </label>
          </div>

          {output && (
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <h4 className="text-sm font-mono text-text-secondary mb-2">Preview URL</h4>
              <p className="text-xs font-mono text-accent-primary break-all">
                https://example.com/blog/{output}
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
          placeholder="Enter text to convert to slug..."
          rows={10}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Generated Slug</h3>
            <Button variant="primary" onClick={handleGenerate}>
              Generate
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="URL Slug" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Generated slug will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🌍 URL-Friendly</p>
            <p className="text-xs font-mono text-text-secondary">
              Removes spaces, special characters, and accents
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔡 Case Control</p>
            <p className="text-xs font-mono text-text-secondary">
              Option to convert to lowercase for consistency
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">➖ Custom Separator</p>
            <p className="text-xs font-mono text-text-secondary">
              Choose between hyphen, underscore, or dot
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">✨ SEO-Optimized</p>
            <p className="text-xs font-mono text-text-secondary">
              Perfect for blog posts, articles, and pages
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate slug' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
