'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function TextDiffChecker() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [showDiff, setShowDiff] = useState(false)
  const { showToast } = useToast()

  const handleCompare = () => {
    if (!text1.trim() || !text2.trim()) {
      showToast('Please enter text in both panels', 'error')
      return
    }
    setShowDiff(true)
    showToast('Texts compared!', 'success')
  }

  const handleClear = () => {
    setText1('')
    setText2('')
    setShowDiff(false)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleCompare, description: 'Compare' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const getDiffStats = () => {
    if (!showDiff) return null
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const chars1 = text1.length
    const chars2 = text2.length
    const words1 = text1.trim().split(/\s+/).length
    const words2 = text2.trim().split(/\s+/).length

    return (
      <div className="bg-bg-secondary border border-border-primary p-6 space-y-4">
        <h3 className="font-mono text-lg font-semibold text-text-primary">
          Comparison Stats
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-mono text-accent-primary">{Math.abs(lines1.length - lines2.length)}</p>
            <p className="text-xs text-text-tertiary mt-1">Line Difference</p>
          </div>
          <div>
            <p className="text-2xl font-mono text-accent-primary">{Math.abs(words1 - words2)}</p>
            <p className="text-xs text-text-tertiary mt-1">Word Difference</p>
          </div>
          <div>
            <p className="text-2xl font-mono text-accent-primary">{Math.abs(chars1 - chars2)}</p>
            <p className="text-xs text-text-tertiary mt-1">Char Difference</p>
          </div>
        </div>
        <div className="pt-4 border-t border-border-primary text-sm space-y-2">
          <p className="text-text-secondary">
            <span className="text-accent-primary font-mono">Text 1:</span> {lines1.length} lines, {words1} words, {chars1} chars
          </p>
          <p className="text-text-secondary">
            <span className="text-accent-primary font-mono">Text 2:</span> {lines2.length} lines, {words2} words, {chars2} chars
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Text 1"
          value={text1}
          onChange={setText1}
          placeholder="Enter first text..."
          rows={20}
        />

        <ToolPanel
          title="Text 2"
          value={text2}
          onChange={setText2}
          placeholder="Enter second text..."
          rows={20}
        />
      </div>

      <div className="flex gap-3">
        <Button variant="primary" onClick={handleCompare}>
          Compare Texts
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      {getDiffStats()}

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Compare texts' },
          { keys: 'Ctrl+K', action: 'Clear all' },
        ]}
      />
    </div>
  )
}
