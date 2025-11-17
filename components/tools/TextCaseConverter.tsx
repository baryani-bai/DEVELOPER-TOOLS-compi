'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { convertCase } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

const caseTypes = [
  { id: 'upper', name: 'UPPERCASE', example: 'HELLO WORLD' },
  { id: 'lower', name: 'lowercase', example: 'hello world' },
  { id: 'title', name: 'Title Case', example: 'Hello World' },
  { id: 'sentence', name: 'Sentence case', example: 'Hello world' },
  { id: 'camel', name: 'camelCase', example: 'helloWorld' },
  { id: 'pascal', name: 'PascalCase', example: 'HelloWorld' },
  { id: 'snake', name: 'snake_case', example: 'hello_world' },
  { id: 'kebab', name: 'kebab-case', example: 'hello-world' },
  { id: 'constant', name: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
]

export default function TextCaseConverter() {
  const [input, setInput] = useState('')
  const [selectedCase, setSelectedCase] = useState('title')
  const { showToast } = useToast()

  const output = input ? convertCase(input, selectedCase) : ''

  const handleClear = () => {
    setInput('')
  }

  useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear input' },
  ])

  const handleCaseSelect = (caseId: string) => {
    setSelectedCase(caseId)
    if (input) {
      const selectedType = caseTypes.find(c => c.id === caseId)
      showToast(`Converted to ${selectedType ? selectedType.name : 'selected case'}`, 'success')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Input Text"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text to convert..."
          rows={20}
        >
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-3">
              Select Case Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {caseTypes.map((caseType) => (
                <Button
                  key={caseType.id}
                  variant={selectedCase === caseType.id ? 'primary' : 'secondary'}
                  onClick={() => handleCaseSelect(caseType.id)}
                  className="text-xs justify-start"
                >
                  {caseType.name}
                </Button>
              ))}
            </div>
          </div>
        </ToolPanel>

        <CodeDisplay
          title="Output"
          code={output}
          language="text"
          filename={`converted-${selectedCase}.txt`}
        />
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+K', action: 'Clear input' },
        ]}
      />
    </div>
  )
}
