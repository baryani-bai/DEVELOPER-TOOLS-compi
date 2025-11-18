'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { httpStatusCodes, searchHTTPStatusCodes } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function HTTPStatusCodeLookup() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Array<{ code: number; message: string; description: string; category: string }>>([])
  const [selectedCode, setSelectedCode] = useState<{ code: number; message: string; description: string; category: string } | null>(null)
  const { showToast } = useToast()

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showToast('Please enter a search term', 'error')
      return
    }

    try {
      const found = searchHTTPStatusCodes(searchQuery)
      setResults(found)

      if (found.length === 0) {
        showToast('No status codes found', 'info')
      } else {
        showToast(`Found ${found.length} status code(s)`, 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Search failed', 'error')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setResults([])
    setSelectedCode(null)
  }

  const handleSelectCode = (code: number, message: string, description: string, category: string) => {
    setSelectedCode({ code, message, description, category })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Informational': return 'text-blue-400 border-blue-400'
      case 'Success': return 'text-green-400 border-green-400'
      case 'Redirection': return 'text-yellow-400 border-yellow-400'
      case 'Client Error': return 'text-orange-400 border-orange-400'
      case 'Server Error': return 'text-red-400 border-red-400'
      default: return 'text-text-secondary border-border-primary'
    }
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleSearch, description: 'Search' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Search HTTP Status Codes
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            placeholder="Search by code (e.g., 404), message, or description..."
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      {selectedCode && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Selected Status Code
          </h3>

          <div className="space-y-4">
            <div className={`border ${getCategoryColor(selectedCode.category)} p-6 bg-bg-tertiary`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-6xl font-mono font-bold">{selectedCode.code}</div>
                <div className={`text-sm font-mono px-3 py-1 border ${getCategoryColor(selectedCode.category)}`}>
                  {selectedCode.category}
                </div>
              </div>
              <p className="text-2xl font-mono mb-4">{selectedCode.message}</p>
              <p className="text-sm text-text-secondary">{selectedCode.description}</p>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Search Results ({results.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map(({ code, message, description, category }) => (
              <button
                key={code}
                onClick={() => handleSelectCode(code, message, description, category)}
                className={`border ${getCategoryColor(category)} bg-bg-tertiary p-4 hover:bg-bg-primary transition-colors text-left`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-mono font-bold">{code}</span>
                  <span className="text-xs font-mono">{category}</span>
                </div>
                <p className="text-sm font-mono">{message}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Common Status Codes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {[200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 500, 502, 503].map(code => {
            const data = httpStatusCodes[code]
            return (
              <button
                key={code}
                onClick={() => handleSelectCode(code, data.message, data.description, data.category)}
                className={`border ${getCategoryColor(data.category)} bg-bg-tertiary p-3 hover:bg-bg-primary transition-colors`}
              >
                <div className="text-2xl font-mono font-bold mb-1">{code}</div>
                <div className="text-xs font-mono">{data.message}</div>
              </button>
            )
          })}
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Search' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
