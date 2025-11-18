'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { searchMimeTypes, getMimeByExtension } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function MIMETypeLookup() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Array<{ mime: string; type: string; extensions: string[] }>>([])
  const [selectedMime, setSelectedMime] = useState<{ mime: string; type: string; extensions: string[] } | null>(null)
  const { showToast } = useToast()

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showToast('Please enter a search term', 'error')
      return
    }

    try {
      const found = searchMimeTypes(searchQuery)
      setResults(found)

      if (found.length === 0) {
        showToast('No MIME types found', 'info')
      } else {
        showToast(`Found ${found.length} MIME type(s)`, 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Search failed', 'error')
    }
  }

  const handleLookupExtension = () => {
    if (!searchQuery.trim()) {
      showToast('Please enter a file extension', 'error')
      return
    }

    try {
      const mime = getMimeByExtension(searchQuery)
      if (mime) {
        const found = searchMimeTypes(mime)
        setResults(found)
        if (found.length > 0) {
          setSelectedMime(found[0])
        }
        showToast(`Found MIME type for .${searchQuery}`, 'success')
      } else {
        showToast('Extension not found in database', 'info')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Lookup failed', 'error')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setResults([])
    setSelectedMime(null)
  }

  const handleSelectMime = (mime: string, type: string, extensions: string[]) => {
    setSelectedMime({ mime, type, extensions })
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    showToast('Copied to clipboard!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleSearch, description: 'Search' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Search MIME Types
        </h3>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
              placeholder="Search MIME type, file type, or extension..."
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>

          <Button variant="secondary" onClick={handleLookupExtension}>
            🔍 Lookup by Extension
          </Button>
        </div>
      </div>

      {selectedMime && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Selected MIME Type
          </h3>

          <div className="space-y-3">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-1">Type Name</p>
              <p className="text-2xl font-mono text-accent-primary">{selectedMime.type}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-mono text-text-secondary mb-1">MIME Type</p>
                  <p className="text-lg font-mono text-accent-primary">{selectedMime.mime}</p>
                </div>
                <Button variant="secondary" onClick={() => handleCopy(selectedMime.mime)}>
                  Copy
                </Button>
              </div>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-2">File Extensions</p>
              <div className="flex flex-wrap gap-2">
                {selectedMime.extensions.map(ext => (
                  <span
                    key={ext}
                    className="bg-bg-secondary border border-accent-primary text-accent-primary px-3 py-1 text-sm font-mono"
                  >
                    .{ext}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Search Results ({results.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map(({ mime, type, extensions }) => (
              <button
                key={mime}
                onClick={() => handleSelectMime(mime, type, extensions)}
                className="bg-bg-tertiary border border-border-primary p-4 hover:border-accent-primary transition-colors text-left"
              >
                <p className="text-sm font-mono text-accent-primary mb-2">{type}</p>
                <p className="text-xs font-mono text-text-secondary mb-2">{mime}</p>
                <div className="flex flex-wrap gap-1">
                  {extensions.map(ext => (
                    <span
                      key={ext}
                      className="bg-bg-secondary border border-border-primary text-text-tertiary px-2 py-0.5 text-xs font-mono"
                    >
                      .{ext}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Common MIME Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono">
          {[
            { mime: 'text/html', type: 'HTML', ext: '.html' },
            { mime: 'text/css', type: 'CSS', ext: '.css' },
            { mime: 'text/javascript', type: 'JavaScript', ext: '.js' },
            { mime: 'application/json', type: 'JSON', ext: '.json' },
            { mime: 'image/jpeg', type: 'JPEG', ext: '.jpg' },
            { mime: 'image/png', type: 'PNG', ext: '.png' },
            { mime: 'application/pdf', type: 'PDF', ext: '.pdf' },
            { mime: 'application/zip', type: 'ZIP', ext: '.zip' },
            { mime: 'video/mp4', type: 'MP4', ext: '.mp4' },
          ].map(({ mime, type, ext }) => (
            <div
              key={mime}
              className="bg-bg-tertiary border border-border-primary p-3"
            >
              <p className="text-accent-primary mb-1">{type}</p>
              <p className="text-text-secondary text-xs">{mime}</p>
              <p className="text-text-tertiary text-xs mt-1">{ext}</p>
            </div>
          ))}
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
