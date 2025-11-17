'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateHash } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    'MD5': '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-512': '',
  })
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter some text to hash')
      return
    }

    setLoading(true)
    setError(undefined)

    try {
      const algorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512']
      const results: Record<HashAlgorithm, string> = { 'MD5': '', 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' }

      for (const algorithm of algorithms) {
        results[algorithm] = await generateHash(input, algorithm)
      }

      setHashes(results)
      showToast('Hashes generated successfully!', 'success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hashes')
      showToast('Failed to generate hashes', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setInput('')
    setHashes({ 'MD5': '', 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' })
    setError(undefined)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate hashes' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear input' },
  ])

  const output = Object.entries(hashes)
    .filter(([_, hash]) => hash)
    .map(([alg, hash]) => `${alg}: ${hash}`)
    .join('\n\n')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text to hash..."
          rows={20}
        >
          <Button variant="primary" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Hashes'}
          </Button>
        </ToolPanel>

        <CodeDisplay
          title="Hash Output"
          code={output}
          error={error}
          language="text"
          filename="hashes.txt"
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate hashes' },
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
