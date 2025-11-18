'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { compareJSON, JSONDiffEntry } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function JSONDiffViewer() {
  const [json1, setJson1] = useState('{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}')
  const [json2, setJson2] = useState('{\n  "name": "John",\n  "age": 31,\n  "city": "Boston",\n  "country": "USA"\n}')
  const [diff, setDiff] = useState<{ differences: JSONDiffEntry[]; identical: boolean } | null>(null)
  const { showToast } = useToast()

  const handleCompare = () => {
    if (!json1.trim() || !json2.trim()) {
      showToast('Please enter JSON to compare', 'error')
      return
    }

    try {
      const result = compareJSON(json1, json2)
      setDiff(result)

      if (result.identical) {
        showToast('JSON objects are identical!', 'success')
      } else {
        showToast(`Found ${result.differences.length} difference${result.differences.length === 1 ? '' : 's'}`, 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Comparison failed', 'error')
    }
  }

  const handleClear = () => {
    setJson1('')
    setJson2('')
    setDiff(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleCompare, description: 'Compare' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="JSON 1 (Original)"
          value={json1}
          onChange={setJson1}
          onClear={() => setJson1('')}
          placeholder="Enter first JSON..."
          rows={15}
        />

        <ToolPanel
          title="JSON 2 (Modified)"
          value={json2}
          onChange={setJson2}
          onClear={() => setJson2('')}
          placeholder="Enter second JSON..."
          rows={15}
        />
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={handleCompare} className="w-full md:w-auto">
          Compare JSON Objects
        </Button>
      </div>

      {diff && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Comparison Results
          </h3>

          {diff.identical ? (
            <div className="bg-bg-tertiary border border-border-primary p-4 text-center">
              <p className="text-accent-primary font-mono">✓ JSON objects are identical</p>
            </div>
          ) : (
            <>
              <div className="mb-4 bg-bg-tertiary border border-border-primary p-4">
                <p className="text-sm font-mono text-text-secondary">
                  Found <span className="text-accent-primary font-bold">{diff.differences.length}</span> difference{diff.differences.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="space-y-3">
                {diff.differences.map((d, idx) => (
                  <div
                    key={idx}
                    className={`border p-4 ${
                      d.type === 'added' ? 'bg-green-900/20 border-green-700' :
                      d.type === 'removed' ? 'bg-red-900/20 border-red-700' :
                      'bg-yellow-900/20 border-yellow-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-text-tertiary">Path: {d.path}</span>
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        d.type === 'added' ? 'bg-green-700 text-green-100' :
                        d.type === 'removed' ? 'bg-red-700 text-red-100' :
                        'bg-yellow-700 text-yellow-100'
                      }`}>
                        {d.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                      <div>
                        <p className="text-text-tertiary text-xs mb-1">Old Value:</p>
                        <p className="text-red-400">
                          {d.old === undefined ? '(not present)' : JSON.stringify(d.old)}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-tertiary text-xs mb-1">New Value:</p>
                        <p className="text-green-400">
                          {d.new === undefined ? '(removed)' : JSON.stringify(d.new)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Difference Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
          <div className="bg-green-900/20 border border-green-700 p-3">
            <p className="text-green-400 mb-2">ADDED</p>
            <p className="text-text-secondary text-xs">Property exists in JSON 2 but not in JSON 1</p>
          </div>
          <div className="bg-red-900/20 border border-red-700 p-3">
            <p className="text-red-400 mb-2">REMOVED</p>
            <p className="text-text-secondary text-xs">Property exists in JSON 1 but not in JSON 2</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-700 p-3">
            <p className="text-yellow-400 mb-2">CHANGED</p>
            <p className="text-text-secondary text-xs">Property exists in both but with different values</p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Compare' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
