'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { markdownToHTML } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function MarkdownToHTMLConverter() {
  const [input, setInput] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n## Features\n\n- Easy to use\n- Fast conversion\n- Preview available\n\n[Link](https://example.com)')
  const [output, setOutput] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter Markdown to convert', 'error')
      return
    }

    try {
      const html = markdownToHTML(input)
      setOutput(html)
      showToast('Markdown converted to HTML!', 'success')
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
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          View Options
        </h3>

        <div className="flex gap-2">
          <Button
            variant={!showPreview ? 'primary' : 'secondary'}
            onClick={() => setShowPreview(false)}
          >
            📝 HTML Code
          </Button>
          <Button
            variant={showPreview ? 'primary' : 'secondary'}
            onClick={() => setShowPreview(true)}
          >
            👁️ Preview
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Markdown Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter Markdown text..."
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">HTML Output</h3>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
          </div>

          {output ? (
            showPreview ? (
              <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px]">
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              </div>
            ) : (
              <CodeDisplay title="HTML" code={output} language="html" />
            )
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              HTML output will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Supported Markdown Syntax
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-accent-primary"># Header 1</span>
            <p className="text-text-secondary mt-1">→ &lt;h1&gt;Header 1&lt;/h1&gt;</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-accent-primary">**Bold**</span>
            <p className="text-text-secondary mt-1">→ &lt;strong&gt;Bold&lt;/strong&gt;</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-accent-primary">*Italic*</span>
            <p className="text-text-secondary mt-1">→ &lt;em&gt;Italic&lt;/em&gt;</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-accent-primary">`Code`</span>
            <p className="text-text-secondary mt-1">→ &lt;code&gt;Code&lt;/code&gt;</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-accent-primary">[Link](url)</span>
            <p className="text-text-secondary mt-1">→ &lt;a href="url"&gt;Link&lt;/a&gt;</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <span className="text-accent-primary">- List item</span>
            <p className="text-text-secondary mt-1">→ &lt;li&gt;List item&lt;/li&gt;</p>
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
