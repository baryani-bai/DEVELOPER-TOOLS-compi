'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateGitIgnore, gitIgnoreTemplates } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function GitIgnoreGenerator() {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(['node'])
  const [output, setOutput] = useState('')
  const { showToast } = useToast()

  const templates = [
    { id: 'node', name: 'Node.js', icon: '📦' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'nextjs', name: 'Next.js', icon: '▲' },
    { id: 'macos', name: 'macOS', icon: '🍎' },
    { id: 'windows', name: 'Windows', icon: '🪟' },
    { id: 'vscode', name: 'VS Code', icon: '💻' },
  ]

  const handleToggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev => {
      if (prev.includes(templateId)) {
        return prev.filter(id => id !== templateId)
      } else {
        return [...prev, templateId]
      }
    })
  }

  const handleGenerate = () => {
    if (selectedTemplates.length === 0) {
      showToast('Please select at least one template', 'error')
      return
    }

    try {
      const gitignore = generateGitIgnore(selectedTemplates)
      setOutput(gitignore)
      showToast('Gitignore generated successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleClear = () => {
    setSelectedTemplates([])
    setOutput('')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Select Templates
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {templates.map(template => (
            <button
              key={template.id}
              onClick={() => handleToggleTemplate(template.id)}
              className={`p-4 border font-mono text-sm transition-colors ${
                selectedTemplates.includes(template.id)
                  ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                  : 'bg-bg-tertiary border-border-primary text-text-secondary hover:border-accent-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="text-xs">{template.name}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="primary" onClick={handleGenerate}>
            Generate .gitignore
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear All
          </Button>
        </div>
      </div>

      {output && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Generated .gitignore
          </h3>
          <CodeDisplay title=".gitignore" code={output} language="text" />
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          About .gitignore
        </h3>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>
            A .gitignore file specifies intentionally untracked files that Git should ignore.
            Files already tracked by Git are not affected.
          </p>
          <div className="bg-bg-tertiary border border-border-primary p-4">
            <p className="text-accent-primary mb-2 font-mono text-xs">PATTERN EXAMPLES:</p>
            <ul className="space-y-1 text-xs font-mono">
              <li>*.log - Ignore all .log files</li>
              <li>node_modules/ - Ignore entire directory</li>
              <li>!important.log - Exception (do NOT ignore)</li>
              <li>build/* - Ignore everything in build/</li>
              <li>**/*.tmp - Ignore .tmp files in all directories</li>
            </ul>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
