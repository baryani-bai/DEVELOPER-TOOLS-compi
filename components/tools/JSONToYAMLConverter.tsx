'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { jsonToYAML, yamlToJSON } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type ConversionMode = 'json-to-yaml' | 'yaml-to-json'

export default function JSONToYAMLConverter() {
  const [mode, setMode] = useState<ConversionMode>('json-to-yaml')
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "active": true\n}')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState(2)
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter data to convert', 'error')
      return
    }

    try {
      const result = mode === 'json-to-yaml' ? jsonToYAML(input, indent) : yamlToJSON(input)
      setOutput(result)
      showToast(`Converted to ${mode === 'json-to-yaml' ? 'YAML' : 'JSON'}!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleSwitchMode = () => {
    const newMode: ConversionMode = mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml'
    setMode(newMode)
    // Swap input and output
    if (output) {
      setInput(output)
      setOutput('')
    }
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Conversion Mode
        </h3>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === 'json-to-yaml' ? 'primary' : 'secondary'}
              onClick={() => setMode('json-to-yaml')}
            >
              JSON → YAML
            </Button>
            <Button
              variant={mode === 'yaml-to-json' ? 'primary' : 'secondary'}
              onClick={() => setMode('yaml-to-json')}
            >
              YAML → JSON
            </Button>
            <Button
              variant="secondary"
              onClick={handleSwitchMode}
            >
              ⇄ Switch & Swap
            </Button>
          </div>

          {mode === 'json-to-yaml' && (
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">
                YAML Indentation
              </label>
              <div className="flex gap-2">
                {[2, 4].map((size) => (
                  <Button
                    key={size}
                    variant={indent === size ? 'primary' : 'secondary'}
                    onClick={() => setIndent(size)}
                  >
                    {size} Spaces
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-bg-tertiary border border-border-primary p-4 mt-4">
          <p className="text-sm font-mono text-text-secondary">
            {mode === 'json-to-yaml' ? (
              <>
                <span className="text-accent-primary">JSON to YAML:</span> Converts JSON objects to YAML format
              </>
            ) : (
              <>
                <span className="text-accent-primary">YAML to JSON:</span> Parses YAML and converts to JSON
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={
            mode === 'json-to-yaml'
              ? '{"name": "John", "age": 30}'
              : 'name: John\nage: 30'
          }
          rows={20}
        />

        <CodeDisplay
          title={mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}
          code={output}
        />
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-mono text-accent-primary mb-2">JSON:</p>
            <pre className="bg-bg-tertiary border border-border-primary p-3 text-xs font-mono text-text-primary overflow-auto">
{`{
  "name": "John",
  "age": 30,
  "hobbies": ["coding", "gaming"]
}`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-mono text-accent-primary mb-2">YAML:</p>
            <pre className="bg-bg-tertiary border border-border-primary p-3 text-xs font-mono text-text-primary overflow-auto">
{`name: John
age: 30
hobbies:
  - coding
  - gaming`}
            </pre>
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
