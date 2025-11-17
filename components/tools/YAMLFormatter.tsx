'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatYAML } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function YAMLFormatter() {
  const [input, setInput] = useState('name: John Doe\nage: 30\naddress:\ncity: New York\nzip: 10001\nskills:\n- JavaScript\n- TypeScript\n- React')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleFormat = () => {
    if (!input.trim()) {
      showToast('Please enter YAML to format', 'error')
      return
    }

    try {
      const formatted = formatYAML(input)
      setOutput(formatted)
      showToast('YAML formatted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Formatting failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleFormat, description: 'Format' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="YAML Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter YAML to format..."
          rows={20}
        />

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Formatted YAML</h3>
            <Button variant="primary" onClick={handleFormat}>
              Format
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="YAML" code={output} language="yaml" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Formatted YAML will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          YAML Syntax Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">Key-Value Pairs</p>
            <p className="text-text-secondary">key: value</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">Nested Objects</p>
            <p className="text-text-secondary">parent:<br />  child: value</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">Arrays</p>
            <p className="text-text-secondary">items:<br />  - item1<br />  - item2</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">Comments</p>
            <p className="text-text-secondary"># This is a comment</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">Strings</p>
            <p className="text-text-secondary">text: "quoted"<br />text: unquoted</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">Booleans</p>
            <p className="text-text-secondary">active: true<br />disabled: false</p>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">⚙️ Configuration Files</p>
            <p className="text-xs font-mono text-text-secondary">
              Docker Compose, Kubernetes, CI/CD pipelines
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📦 Package Managers</p>
            <p className="text-xs font-mono text-text-secondary">
              NPM, Yarn, Conda configuration files
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔧 Application Config</p>
            <p className="text-xs font-mono text-text-secondary">
              Rails, Django, and other frameworks
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📝 Data Serialization</p>
            <p className="text-xs font-mono text-text-secondary">
              Human-readable structured data
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Format' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
