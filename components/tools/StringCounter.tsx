'use client'

import { useState, useEffect } from 'react'
import ToolPanel from './ToolPanel'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { countString } from '@/lib/utils/toolHelpers'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function StringCounter() {
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog.\nThis is a sample text for counting.')
  const [stats, setStats] = useState(countString('The quick brown fox jumps over the lazy dog.\nThis is a sample text for counting.'))

  useEffect(() => {
    setStats(countString(input))
  }, [input])

  const handleClear = () => {
    setInput('')
  }

  useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const statItems = [
    { label: 'Characters', value: stats.characters, icon: '📝', color: 'text-accent-primary' },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, icon: '🔤', color: 'text-accent-primary' },
    { label: 'Words', value: stats.words, icon: '📖', color: 'text-accent-primary' },
    { label: 'Lines', value: stats.lines, icon: '📄', color: 'text-accent-primary' },
    { label: 'Sentences', value: stats.sentences, icon: '💬', color: 'text-accent-primary' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: '📰', color: 'text-accent-primary' },
    { label: 'Bytes', value: stats.bytes, icon: '💾', color: 'text-accent-primary' },
  ]

  const readingTime = Math.ceil(stats.words / 200) // Average reading speed: 200 words/min
  const speakingTime = Math.ceil(stats.words / 150) // Average speaking speed: 150 words/min

  return (
    <div className="space-y-6">
      <ToolPanel
        title="Input Text"
        value={input}
        onChange={setInput}
        onClear={handleClear}
        placeholder="Enter or paste your text here to see statistics..."
        rows={15}
      />

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Statistics
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item) => (
            <div key={item.label} className="bg-bg-tertiary border border-border-primary p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-mono text-text-secondary">{item.label}</p>
              </div>
              <p className={`text-3xl font-mono font-bold ${item.color}`}>
                {item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Reading & Speaking Time
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">👁️</span>
              <div>
                <p className="text-sm font-mono text-text-secondary">Reading Time</p>
                <p className="text-xs font-mono text-text-tertiary">(~200 words/min)</p>
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-accent-primary">
              {readingTime} {readingTime === 1 ? 'min' : 'mins'}
            </p>
          </div>

          <div className="bg-bg-tertiary border border-border-primary p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🗣️</span>
              <div>
                <p className="text-sm font-mono text-text-secondary">Speaking Time</p>
                <p className="text-xs font-mono text-text-tertiary">(~150 words/min)</p>
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-accent-primary">
              {speakingTime} {speakingTime === 1 ? 'min' : 'mins'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Additional Info
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-text-secondary mb-2">Average Word Length</p>
            <p className="text-xl font-mono text-accent-primary">
              {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : 0} chars
            </p>
          </div>

          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-text-secondary mb-2">Average Words/Sentence</p>
            <p className="text-xl font-mono text-accent-primary">
              {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0} words
            </p>
          </div>

          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-text-secondary mb-2">Words/Line</p>
            <p className="text-xl font-mono text-accent-primary">
              {stats.lines > 0 ? (stats.words / stats.lines).toFixed(1) : 0} words
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
