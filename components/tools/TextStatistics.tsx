'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { calculateTextStats } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function TextStatistics() {
  const [input, setInput] = useState(`The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet at least once.

It is commonly used for displaying font samples and testing keyboards. The phrase has been used since the late 1800s and remains popular today for its simplicity and comprehensive letter coverage.`)
  const [stats, setStats] = useState<{
    characters: number
    charactersNoSpaces: number
    words: number
    sentences: number
    paragraphs: number
    readingTime: number
    speakingTime: number
    averageWordLength: number
    longestWord: string
  } | null>(null)
  const { showToast } = useToast()

  const handleAnalyze = () => {
    if (!input.trim()) {
      showToast('Please enter text to analyze', 'error')
      return
    }

    try {
      const result = calculateTextStats(input)
      setStats(result)
      showToast('Text analyzed successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Analysis failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setStats(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleAnalyze, description: 'Analyze' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter or paste text to analyze..."
          rows={15}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Statistics</h3>
            <Button variant="primary" onClick={handleAnalyze}>
              Analyze Text
            </Button>
          </div>

          {stats ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-tertiary border border-border-primary p-3">
                  <p className="text-xs font-mono text-text-secondary mb-1">Characters</p>
                  <p className="text-2xl font-mono text-accent-primary">{stats.characters}</p>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-3">
                  <p className="text-xs font-mono text-text-secondary mb-1">No Spaces</p>
                  <p className="text-2xl font-mono text-accent-primary">{stats.charactersNoSpaces}</p>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-3">
                  <p className="text-xs font-mono text-text-secondary mb-1">Words</p>
                  <p className="text-2xl font-mono text-accent-primary">{stats.words}</p>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-3">
                  <p className="text-xs font-mono text-text-secondary mb-1">Sentences</p>
                  <p className="text-2xl font-mono text-accent-primary">{stats.sentences}</p>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-3">
                  <p className="text-xs font-mono text-text-secondary mb-1">Paragraphs</p>
                  <p className="text-2xl font-mono text-accent-primary">{stats.paragraphs}</p>
                </div>
                <div className="bg-bg-tertiary border border-border-primary p-3">
                  <p className="text-xs font-mono text-text-secondary mb-1">Avg Word Length</p>
                  <p className="text-2xl font-mono text-accent-primary">{stats.averageWordLength}</p>
                </div>
              </div>

              <div className="bg-bg-tertiary border border-border-primary p-3">
                <p className="text-xs font-mono text-text-secondary mb-1">Longest Word</p>
                <p className="text-lg font-mono text-accent-primary break-all">{stats.longestWord || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Statistics will appear here
            </div>
          )}
        </div>
      </div>

      {stats && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Time Estimates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <div>
                  <p className="text-xs font-mono text-text-secondary">Reading Time</p>
                  <p className="text-2xl font-mono text-accent-primary">
                    {stats.readingTime} min
                  </p>
                  <p className="text-xs font-mono text-text-tertiary mt-1">
                    @ 200 words/min (average reading speed)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🗣️</span>
                <div>
                  <p className="text-xs font-mono text-text-secondary">Speaking Time</p>
                  <p className="text-2xl font-mono text-accent-primary">
                    {stats.speakingTime} min
                  </p>
                  <p className="text-xs font-mono text-text-tertiary mt-1">
                    @ 130 words/min (average speaking speed)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          What We Measure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📊 Basic Counts</p>
            <p className="text-text-secondary">Characters, words, sentences, paragraphs</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">⏱️ Time Estimates</p>
            <p className="text-text-secondary">Reading and speaking time calculations</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📏 Word Analysis</p>
            <p className="text-text-secondary">Average word length and longest word</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✏️ Use Cases</p>
            <p className="text-text-secondary">Blog posts, essays, articles, speeches</p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Analyze' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
