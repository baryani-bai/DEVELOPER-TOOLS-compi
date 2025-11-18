'use client'

import { useState, useMemo } from 'react'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { getASCIITable } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'

export default function ASCIITableReference() {
  const [filter, setFilter] = useState<'all' | 'control' | 'printable'>('all')
  const { showToast } = useToast()

  const asciiTable = useMemo(() => getASCIITable(), [])

  const filteredTable = useMemo(() => {
    switch (filter) {
      case 'control':
        return asciiTable.filter(item => item.dec < 32 || item.dec === 127)
      case 'printable':
        return asciiTable.filter(item => item.dec >= 32 && item.dec <= 126)
      default:
        return asciiTable
    }
  }, [asciiTable, filter])

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    showToast('Copied to clipboard!', 'success')
  }

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Filter ASCII Characters
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 font-mono text-sm border ${
              filter === 'all'
                ? 'bg-accent-primary text-black border-accent-primary'
                : 'bg-bg-tertiary text-text-primary border-border-primary hover:border-accent-primary'
            }`}
          >
            All (0-127)
          </button>
          <button
            onClick={() => setFilter('control')}
            className={`px-4 py-2 font-mono text-sm border ${
              filter === 'control'
                ? 'bg-accent-primary text-black border-accent-primary'
                : 'bg-bg-tertiary text-text-primary border-border-primary hover:border-accent-primary'
            }`}
          >
            Control (0-31, 127)
          </button>
          <button
            onClick={() => setFilter('printable')}
            className={`px-4 py-2 font-mono text-sm border ${
              filter === 'printable'
                ? 'bg-accent-primary text-black border-accent-primary'
                : 'bg-bg-tertiary text-text-primary border-border-primary hover:border-accent-primary'
            }`}
          >
            Printable (32-126)
          </button>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          ASCII Table ({filteredTable.length} characters)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-border-primary">
                <th className="text-left p-2 text-accent-primary">DEC</th>
                <th className="text-left p-2 text-accent-primary">HEX</th>
                <th className="text-left p-2 text-accent-primary">CHAR</th>
                <th className="text-left p-2 text-accent-primary">DESCRIPTION</th>
                <th className="text-right p-2 text-accent-primary">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((item) => (
                <tr
                  key={item.dec}
                  className="border-b border-border-primary/50 hover:bg-bg-tertiary transition-colors"
                >
                  <td className="p-2 text-text-primary">{item.dec}</td>
                  <td className="p-2 text-text-secondary">{item.hex}</td>
                  <td className="p-2">
                    {item.char ? (
                      <span className="text-accent-primary text-lg">{item.char}</span>
                    ) : (
                      <span className="text-text-tertiary text-xs">-</span>
                    )}
                  </td>
                  <td className="p-2 text-text-secondary">{item.description}</td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => handleCopy(item.dec.toString())}
                      className="text-xs text-accent-primary hover:text-accent-primary/80 mr-2"
                    >
                      Copy DEC
                    </button>
                    <button
                      onClick={() => handleCopy(item.hex)}
                      className="text-xs text-accent-primary hover:text-accent-primary/80"
                    >
                      Copy HEX
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          ASCII Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📋 Control Characters (0-31)</p>
            <p className="text-text-secondary">
              Non-printable characters used for text control (NULL, TAB, LF, CR, ESC, etc.)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔤 Printable Characters (32-126)</p>
            <p className="text-text-secondary">
              Visible characters including letters, numbers, punctuation, and symbols
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">⌨️ Common Control Codes</p>
            <p className="text-text-secondary">
              9=TAB, 10=LF (Line Feed), 13=CR (Carriage Return), 27=ESC, 32=Space
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🗑️ DELETE (127)</p>
            <p className="text-text-secondary">
              Delete character, originally used to mark deleted data on paper tape
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: '1', action: 'Show All' },
          { keys: '2', action: 'Show Control' },
          { keys: '3', action: 'Show Printable' },
        ]}
      />
    </div>
  )
}
