'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { searchColorNames, colorNameToHex, hexToRgb } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function ColorNameLookup() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Array<{ name: string; hex: string }>>([])
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string; rgb: { r: number; g: number; b: number } } | null>(null)
  const { showToast } = useToast()

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showToast('Please enter a search term', 'error')
      return
    }

    try {
      const found = searchColorNames(searchQuery)
      setResults(found)

      if (found.length === 0) {
        showToast('No colors found', 'info')
      } else {
        showToast(`Found ${found.length} color(s)`, 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Search failed', 'error')
    }
  }

  const handleSelectColor = (name: string, hex: string) => {
    const rgb = hexToRgb(hex)
    if (rgb) {
      setSelectedColor({ name, hex, rgb })
      showToast(`Selected: ${name}`, 'success')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setResults([])
    setSelectedColor(null)
  }

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex)
    showToast('Hex copied to clipboard!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleSearch, description: 'Search' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Search CSS Color Names
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
            placeholder="Search color names (e.g., blue, dark, light)..."
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      {selectedColor && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Selected Color
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="h-48 border border-border-primary flex items-center justify-center"
              style={{ backgroundColor: selectedColor.hex }}
            >
              <div className="bg-black/50 p-4 backdrop-blur">
                <p className="text-2xl font-mono text-white">{selectedColor.name}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <p className="text-xs font-mono text-text-secondary mb-1">Color Name</p>
                <p className="text-xl font-mono text-accent-primary">{selectedColor.name}</p>
              </div>

              <div className="bg-bg-tertiary border border-border-primary p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-mono text-text-secondary mb-1">HEX</p>
                    <p className="text-xl font-mono text-accent-primary">{selectedColor.hex}</p>
                  </div>
                  <Button variant="secondary" onClick={() => handleCopyHex(selectedColor.hex)}>
                    Copy
                  </Button>
                </div>
              </div>

              <div className="bg-bg-tertiary border border-border-primary p-4">
                <p className="text-xs font-mono text-text-secondary mb-1">RGB</p>
                <p className="text-lg font-mono text-accent-primary">
                  rgb({selectedColor.rgb.r}, {selectedColor.rgb.g}, {selectedColor.rgb.b})
                </p>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {results.map(({ name, hex }) => (
              <button
                key={name}
                onClick={() => handleSelectColor(name, hex)}
                className="bg-bg-tertiary border border-border-primary p-3 hover:border-accent-primary transition-colors text-left group"
              >
                <div
                  className="w-full h-16 mb-2 border border-border-primary group-hover:border-accent-primary"
                  style={{ backgroundColor: hex }}
                />
                <p className="text-xs font-mono text-text-primary">{name}</p>
                <p className="text-xs font-mono text-text-secondary mt-1">{hex}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Popular CSS Colors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[
            ['red', '#FF0000'],
            ['blue', '#0000FF'],
            ['green', '#008000'],
            ['yellow', '#FFFF00'],
            ['purple', '#800080'],
            ['orange', '#FFA500'],
            ['pink', '#FFC0CB'],
            ['cyan', '#00FFFF'],
            ['lime', '#00FF00'],
            ['navy', '#000080'],
            ['teal', '#008080'],
            ['gold', '#FFD700'],
          ].map(([name, hex]) => (
            <button
              key={name}
              onClick={() => handleSelectColor(name, hex)}
              className="bg-bg-tertiary border border-border-primary p-2 hover:border-accent-primary transition-colors"
            >
              <div
                className="w-full h-12 mb-1 border border-border-primary"
                style={{ backgroundColor: hex }}
              />
              <p className="text-xs font-mono text-text-primary">{name}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-3">
          <p className="text-xs font-mono text-text-secondary">
            💡 <strong>Tip:</strong> Search by color family (e.g., "dark", "light", "blue") or
            specific names. Database includes all 140+ CSS named colors.
          </p>
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
