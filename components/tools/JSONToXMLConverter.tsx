'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { jsonToXML, xmlToJSON } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type Mode = 'json-to-xml' | 'xml-to-json'

export default function JSONToXMLConverter() {
  const [mode, setMode] = useState<Mode>('json-to-xml')
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York"\n}')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter data to convert', 'error')
      return
    }

    try {
      const result = mode === 'json-to-xml' ? jsonToXML(input) : xmlToJSON(input)
      setOutput(result)
      showToast('Conversion successful!', 'success')
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
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Conversion Mode
        </h3>

        <div className="flex gap-2">
          <Button
            variant={mode === 'json-to-xml' ? 'primary' : 'secondary'}
            onClick={() => {
              setMode('json-to-xml')
              setInput('{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York"\n}')
              setOutput('')
            }}
          >
            📤 JSON → XML
          </Button>
          <Button
            variant={mode === 'xml-to-json' ? 'primary' : 'secondary'}
            onClick={() => {
              setMode('xml-to-json')
              setInput('<root>\n  <name>John Doe</name>\n  <age>30</age>\n  <city>New York</city>\n</root>')
              setOutput('')
            }}
          >
            📥 XML → JSON
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title={mode === 'json-to-xml' ? 'JSON Input' : 'XML Input'}
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder={mode === 'json-to-xml' ? 'Enter JSON...' : 'Enter XML...'}
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">
              {mode === 'json-to-xml' ? 'XML Output' : 'JSON Output'}
            </h3>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
          </div>

          {output ? (
            <CodeDisplay
              title={mode === 'json-to-xml' ? 'XML' : 'JSON'}
              code={output}
              language={mode === 'json-to-xml' ? 'xml' : 'json'}
            />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Converted output will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Conversion Notes
        </h3>
        <div className="space-y-3 text-sm font-mono text-text-secondary">
          <p>
            ✓ <span className="text-accent-primary">JSON → XML:</span> Objects become nested elements, arrays become repeated items
          </p>
          <p>
            ✓ <span className="text-accent-primary">XML → JSON:</span> Elements become object properties, attributes preserved
          </p>
          <p>
            ✓ <span className="text-accent-primary">Data Types:</span> XML doesn't have native type support, types may be converted to strings
          </p>
          <p>
            ℹ️ <span className="text-accent-primary">Note:</span> This is a basic converter - complex XML structures may require specialized tools
          </p>
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
