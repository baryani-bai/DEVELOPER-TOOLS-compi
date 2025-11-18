'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { minifyCSS } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function CSSMinifier() {
  const [input, setInput] = useState(`/* Main styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}`)
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0, percentage: 0 })
  const { showToast } = useToast()

  const handleMinify = () => {
    if (!input.trim()) {
      showToast('Please enter CSS code to minify', 'error')
      return
    }

    try {
      const minified = minifyCSS(input)
      setOutput(minified)

      const originalSize = new Blob([input]).size
      const minifiedSize = new Blob([minified]).size
      const saved = originalSize - minifiedSize
      const percentage = ((saved / originalSize) * 100).toFixed(1)

      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved,
        percentage: parseFloat(percentage),
      })

      showToast('CSS minified successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Minification failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setStats({ original: 0, minified: 0, saved: 0, percentage: 0 })
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleMinify, description: 'Minify' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Original CSS"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter CSS code to minify..."
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Minified CSS</h3>
            <Button variant="primary" onClick={handleMinify}>
              Minify
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Output" code={output} language="css" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Minified CSS will appear here
            </div>
          )}
        </div>
      </div>

      {stats.original > 0 && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Compression Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Original Size</p>
              <p className="text-xl font-mono text-text-primary">{stats.original} B</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Minified Size</p>
              <p className="text-xl font-mono text-text-primary">{stats.minified} B</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Bytes Saved</p>
              <p className="text-xl font-mono text-accent-primary">{stats.saved} B</p>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Reduction</p>
              <p className="text-xl font-mono text-accent-primary">{stats.percentage}%</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          What Gets Minified?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✓ Comments removed</p>
            <p className="text-text-secondary">/* comments */ are stripped out</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✓ Whitespace removed</p>
            <p className="text-text-secondary">Newlines and extra spaces eliminated</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✓ Semicolons optimized</p>
            <p className="text-text-secondary">Unnecessary semicolons before {'}'}</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✓ Formatting cleaned</p>
            <p className="text-text-secondary">Spaces around operators removed</p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Minify' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
