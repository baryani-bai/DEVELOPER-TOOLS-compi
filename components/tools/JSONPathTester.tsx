'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { evaluateJSONPath } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function JSONPathTester() {
  const [json, setJson] = useState('{\n  "store": {\n    "book": [\n      {\n        "title": "Book 1",\n        "price": 10.99\n      },\n      {\n        "title": "Book 2",\n        "price": 8.99\n      }\n    ]\n  }\n}')
  const [path, setPath] = useState('$.store.book[0].title')
  const [result, setResult] = useState('')
  const { showToast } = useToast()

  const handleEvaluate = () => {
    if (!json.trim()) {
      showToast('Please enter JSON data', 'error')
      return
    }

    if (!path.trim()) {
      showToast('Please enter a JSONPath expression', 'error')
      return
    }

    try {
      const evalResult = evaluateJSONPath(json, path)
      setResult(evalResult)
      showToast('Path evaluated successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Evaluation failed', 'error')
      setResult('')
    }
  }

  const handleClear = () => {
    setJson('')
    setPath('')
    setResult('')
  }

  const handleExamplePath = (examplePath: string) => {
    setPath(examplePath)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleEvaluate, description: 'Evaluate path' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const examples = [
    { label: 'Root', path: '$' },
    { label: 'Object property', path: '$.store' },
    { label: 'Array item', path: '$.store.book[0]' },
    { label: 'Nested property', path: '$.store.book[0].title' },
    { label: 'All books', path: '$.store.book' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          JSONPath Expression
        </h3>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="$.store.book[0].title"
          className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-3 focus:outline-none focus:border-accent-primary text-lg"
        />

        <div className="mt-4">
          <p className="text-sm font-mono text-text-secondary mb-3">Example Paths:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <Button
                key={example.path}
                variant="secondary"
                onClick={() => handleExamplePath(example.path)}
                className="text-xs"
              >
                {example.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="JSON Data"
          value={json}
          onChange={setJson}
          onClear={() => setJson('')}
          placeholder='{"store": {"book": [{"title": "Book 1"}]}}'
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Result</h3>
            <Button variant="primary" onClick={handleEvaluate}>
              Evaluate
            </Button>
          </div>

          {result ? (
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <pre className="font-mono text-sm text-accent-primary whitespace-pre-wrap break-words overflow-auto max-h-[500px]">
                {result}
              </pre>
            </div>
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Result will appear here after evaluation
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          JSONPath Syntax Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">$</p>
            <p className="text-xs font-mono text-text-secondary">Root object</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">.property</p>
            <p className="text-xs font-mono text-text-secondary">Access object property</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">[0]</p>
            <p className="text-xs font-mono text-text-secondary">Array index (zero-based)</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">*</p>
            <p className="text-xs font-mono text-text-secondary">Wildcard (all values)</p>
          </div>
        </div>

        <p className="mt-4 text-xs font-mono text-text-secondary">
          ⚠️ Note: This is a simplified JSONPath implementation supporting basic queries.
        </p>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Evaluate path' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
