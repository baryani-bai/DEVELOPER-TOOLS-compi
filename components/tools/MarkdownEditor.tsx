'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { markdownToHTML } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n## Features\n- Lists\n- `code`\n- [links](https://example.com)')
  const { showToast } = useToast()

  const html = markdownToHTML(markdown)

  const handleClear = () => {
    setMarkdown('')
  }

  useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Markdown Input"
          value={markdown}
          onChange={setMarkdown}
          onClear={handleClear}
          placeholder="# Write markdown here..."
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-6">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">HTML Preview</h3>
          <div 
            className="prose prose-invert max-w-none bg-bg-tertiary border border-border-primary p-4 min-h-[400px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <KeyboardHint shortcuts={[{ keys: 'Ctrl+K', action: 'Clear input' }]} />
    </div>
  )
}
