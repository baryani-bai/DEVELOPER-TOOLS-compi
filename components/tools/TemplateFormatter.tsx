'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { formatTemplate } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function TemplateFormatter() {
  const [template, setTemplate] = useState('Hello {{name}}! Welcome to {{city}}.\nYour order total is $${amount}.')
  const [variablesText, setVariablesText] = useState('name=John\ncity=New York\namount=99.99')
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const handleFormat = () => {
    if (!template.trim()) {
      showToast('Please enter a template', 'error')
      return
    }

    try {
      // Parse variables from text (key=value format)
      const variables: Record<string, string> = {}
      variablesText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          variables[key.trim()] = valueParts.join('=').trim()
        }
      })

      const result = formatTemplate(template, variables)
      setOutput(result)
      showToast('Template formatted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Formatting failed', 'error')
    }
  }

  const handleClear = () => {
    setTemplate('')
    setVariablesText('')
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleFormat, description: 'Format' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Supported Syntax
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">{'{{variable}}'}</p>
            <p className="text-text-secondary">Double curly braces (Handlebars/Mustache style)</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">{'${variable}'}</p>
            <p className="text-text-secondary">Dollar sign with braces (Template literal style)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ToolPanel
            title="Template"
            value={template}
            onChange={setTemplate}
            onClear={() => setTemplate('')}
            placeholder="Enter template with {{variables}} or ${variables}..."
            rows={10}
          />

          <ToolPanel
            title="Variables (key=value format)"
            value={variablesText}
            onChange={setVariablesText}
            onClear={() => setVariablesText('')}
            placeholder="name=John\nage=30\ncity=New York"
            rows={10}
          />
        </div>

        <div className="bg-bg-secondary border border-border-primary p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">Formatted Output</h3>
            <Button variant="primary" onClick={handleFormat}>
              Format Template
            </Button>
          </div>

          {output ? (
            <CodeDisplay title="Result" code={output} language="text" />
          ) : (
            <div className="bg-bg-tertiary border border-border-primary p-4 min-h-[200px] flex items-center justify-center text-text-secondary font-mono text-sm">
              Formatted text will appear here
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📧 Email Templates</p>
            <p className="text-xs font-mono text-text-secondary">
              Generate personalized emails with dynamic content
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">📄 Document Generation</p>
            <p className="text-xs font-mono text-text-secondary">
              Create documents with variable substitution
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">🔧 Configuration Files</p>
            <p className="text-xs font-mono text-text-secondary">
              Generate config files from templates
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-sm font-mono text-accent-primary mb-2">💬 Message Formatting</p>
            <p className="text-xs font-mono text-text-secondary">
              Format messages with dynamic values
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Format template' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
