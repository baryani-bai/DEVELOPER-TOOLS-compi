'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateMarkdownTable } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function MarkdownTableGenerator() {
  const [headers, setHeaders] = useState(['Column 1', 'Column 2', 'Column 3'])
  const [rows, setRows] = useState([
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ])
  const [alignment, setAlignment] = useState<('left' | 'center' | 'right')[]>(['left', 'left', 'left'])
  const { showToast } = useToast()

  const handleHeaderChange = (index: number, value: string) => {
    const newHeaders = [...headers]
    newHeaders[index] = value
    setHeaders(newHeaders)
  }

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows]
    newRows[rowIndex][colIndex] = value
    setRows(newRows)
  }

  const handleAlignmentChange = (index: number) => {
    const newAlignment = [...alignment]
    const current = newAlignment[index]
    newAlignment[index] = current === 'left' ? 'center' : current === 'center' ? 'right' : 'left'
    setAlignment(newAlignment)
  }

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`])
    setAlignment([...alignment, 'left'])
    setRows(rows.map(row => [...row, '']))
    showToast('Column added!', 'success')
  }

  const removeColumn = () => {
    if (headers.length > 1) {
      setHeaders(headers.slice(0, -1))
      setAlignment(alignment.slice(0, -1))
      setRows(rows.map(row => row.slice(0, -1)))
      showToast('Column removed!', 'success')
    }
  }

  const addRow = () => {
    setRows([...rows, Array(headers.length).fill('')])
    showToast('Row added!', 'success')
  }

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1))
      showToast('Row removed!', 'success')
    }
  }

  const handleClear = () => {
    setHeaders(['Column 1', 'Column 2', 'Column 3'])
    setRows([
      ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
      ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
    ])
    setAlignment(['left', 'left', 'left'])
  }

  const handleCopy = () => {
    const markdown = generateMarkdownTable(headers, rows, alignment)
    navigator.clipboard.writeText(markdown)
    showToast('Markdown copied to clipboard!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'c', ctrlKey: true, handler: handleCopy, description: 'Copy' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const markdown = generateMarkdownTable(headers, rows, alignment)

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Table Controls
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="secondary" onClick={addColumn}>+ Add Column</Button>
          <Button variant="secondary" onClick={removeColumn}>- Remove Column</Button>
          <Button variant="secondary" onClick={addRow}>+ Add Row</Button>
          <Button variant="secondary" onClick={removeRow}>- Remove Row</Button>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Table Editor
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="border border-border-primary p-2">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => handleHeaderChange(index, e.target.value)}
                        className="w-full bg-bg-tertiary border border-border-primary p-2 text-text-primary focus:outline-none focus:border-accent-primary"
                      />
                      <button
                        onClick={() => handleAlignmentChange(index)}
                        className="text-xs text-accent-primary hover:text-accent-primary/80"
                      >
                        {alignment[index] === 'left' && '← Left'}
                        {alignment[index] === 'center' && '↔ Center'}
                        {alignment[index] === 'right' && '→ Right'}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border border-border-primary p-2">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        className="w-full bg-bg-tertiary border border-border-primary p-2 text-text-primary focus:outline-none focus:border-accent-primary"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-mono text-lg font-semibold text-text-primary">
            Generated Markdown
          </h3>
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleCopy}>
              Copy Markdown
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Reset
            </Button>
          </div>
        </div>

        <CodeDisplay title="Markdown Table" code={markdown} language="markdown" />
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Markdown Table Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">↔ Column Alignment</p>
            <p className="text-text-secondary">
              Click alignment buttons to change: Left (:---), Center (:---:), Right (---:)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📝 Editing</p>
            <p className="text-text-secondary">
              Click any cell to edit. Use pipe (|) and dashes for manual tables
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✅ Compatibility</p>
            <p className="text-text-secondary">
              Works in GitHub, GitLab, Bitbucket, and most Markdown editors
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Tip</p>
            <p className="text-text-secondary">
              Keep cells short for better mobile rendering
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+C', action: 'Copy' },
          { keys: 'Ctrl+K', action: 'Reset' },
        ]}
      />
    </div>
  )
}
