'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toolRegistry, type ToolConfig } from '@/lib/constants/toolRegistry'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter tools based on search query
  const filteredTools = query.trim()
    ? toolRegistry.filter((tool) => {
        const searchText = query.toLowerCase()
        return (
          tool.name.toLowerCase().includes(searchText) ||
          tool.description.toLowerCase().includes(searchText) ||
          tool.category.toLowerCase().includes(searchText) ||
          tool.keywords.some((keyword) => keyword.toLowerCase().includes(searchText))
        )
      })
    : []

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filteredTools.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
        e.preventDefault()
        handleSelect(filteredTools[selectedIndex])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredTools, selectedIndex, onClose])

  const handleSelect = (tool: ToolConfig) => {
    router.push(`/tools/${tool.id}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-bg-secondary border border-border-primary shadow-2xl animate-slide-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-text-tertiary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search tools... (try 'json', 'encode', 'generate')"
            className="flex-1 bg-transparent text-text-primary font-mono text-base focus:outline-none placeholder:text-text-tertiary"
          />
          <kbd className="hidden sm:block px-2 py-1 text-xs font-mono bg-bg-primary border border-border-primary text-text-tertiary">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="px-6 py-12 text-center">
              <p className="text-text-tertiary font-mono text-sm">
                Type to search through {toolRegistry.length} developer tools
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <kbd className="px-2 py-1 text-xs font-mono bg-bg-primary border border-border-primary text-accent-primary">
                  ↑↓
                </kbd>
                <span className="text-text-tertiary text-xs">Navigate</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-bg-primary border border-border-primary text-accent-primary">
                  ↵
                </kbd>
                <span className="text-text-tertiary text-xs">Select</span>
              </div>
            </div>
          ) : filteredTools.length > 0 ? (
            <div className="py-2">
              {filteredTools.map((tool, index) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-6 py-3 transition-colors ${
                    index === selectedIndex
                      ? 'bg-bg-tertiary border-l-2 border-accent-primary'
                      : 'hover:bg-bg-tertiary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {tool.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm text-text-primary truncate">
                          {tool.name}
                        </p>
                        {tool.popular && (
                          <span className="text-xs text-accent-primary">★</span>
                        )}
                      </div>
                      <p className="text-xs text-text-tertiary truncate">
                        {tool.description}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-text-tertiary whitespace-nowrap">
                      {tool.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-text-secondary font-mono mb-2">
                No tools found for "{query}"
              </p>
              <p className="text-text-tertiary text-sm">
                Try searching for "json", "encode", "generate", or "hash"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredTools.length > 0 && (
          <div className="px-6 py-3 border-t border-border-primary bg-bg-primary">
            <p className="text-xs text-text-tertiary font-mono">
              {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
