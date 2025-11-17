'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { unicodeCategories, searchUnicodeCharacters } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function UnicodeCharacterFinder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchResults, setSearchResults] = useState<Array<{ char: string; code: string; name: string }>>([])
  const { showToast } = useToast()

  const categories = ['all', ...Object.keys(unicodeCategories)]

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showToast('Please enter a search term', 'error')
      return
    }

    try {
      const results = searchUnicodeCharacters(searchQuery)
      setSearchResults(results)
      showToast(`Found ${results.length} character${results.length === 1 ? '' : 's'}`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Search failed', 'error')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const handleCopyChar = (char: string) => {
    navigator.clipboard.writeText(char)
    showToast(`Copied "${char}" to clipboard!`, 'success')
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    showToast(`Copied ${code} to clipboard!`, 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleSearch, description: 'Search' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const displayedCharacters = selectedCategory === 'all'
    ? Object.entries(unicodeCategories).flatMap(([cat, chars]) => chars.map(c => ({ ...c, category: cat })))
    : unicodeCategories[selectedCategory as keyof typeof unicodeCategories].map(c => ({ ...c, category: selectedCategory }))

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
          Search Unicode Characters
        </h3>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, code (U+0041), or character..."
              className="flex-1 bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-3 focus:outline-none focus:border-accent-primary"
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <h4 className="text-sm font-mono text-text-secondary mb-3">
                Search Results ({searchResults.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                {searchResults.map((char, idx) => (
                  <div
                    key={idx}
                    className="bg-bg-secondary border border-border-primary p-3 hover:border-accent-primary cursor-pointer transition-colors"
                    onClick={() => handleCopyChar(char.char)}
                  >
                    <div className="text-center text-3xl mb-2">{char.char}</div>
                    <div className="text-xs font-mono text-text-secondary text-center mb-1">
                      {char.name}
                    </div>
                    <div className="text-xs font-mono text-accent-primary text-center">
                      {char.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Browse by Category
        </h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(cat)}
              className="text-xs"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[600px] overflow-y-auto">
          {displayedCharacters.map((char, idx) => (
            <div
              key={idx}
              className="bg-bg-tertiary border border-border-primary p-3 hover:border-accent-primary cursor-pointer transition-colors group"
              onClick={() => handleCopyChar(char.char)}
              title={`${char.name}\n${char.code}\nClick to copy`}
            >
              <div className="text-center text-3xl mb-2">{char.char}</div>
              <div className="text-xs font-mono text-text-secondary text-center truncate">
                {char.name}
              </div>
              <div className="text-xs font-mono text-accent-primary text-center mt-1">
                {char.code}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          How to Use
        </h3>
        <div className="space-y-3 text-sm font-mono text-text-secondary">
          <p>
            ✓ <span className="text-accent-primary">Click any character</span> to copy it to clipboard
          </p>
          <p>
            ✓ <span className="text-accent-primary">Search by name</span> (e.g., "arrow", "heart", "copyright")
          </p>
          <p>
            ✓ <span className="text-accent-primary">Search by code</span> (e.g., "U+2764", "U+00A9")
          </p>
          <p>
            ✓ <span className="text-accent-primary">Browse categories</span> to find related symbols
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
