'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { toolRegistry } from '@/lib/constants/toolRegistry'

export default function AllToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(toolRegistry.map((tool) => tool.category)))]

  // Filter tools
  const filteredTools = toolRegistry.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-12 md:py-20 bg-bg-primary">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            All Tools
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Browse our complete collection of {toolRegistry.length} developer tools. All free, all client-side.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-3 bg-bg-secondary border border-border-primary px-4 py-3">
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
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="flex-1 bg-transparent text-text-primary font-mono text-sm focus:outline-none placeholder:text-text-tertiary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-text-tertiary hover:text-accent-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-sm border transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent-primary text-black border-accent-primary font-semibold'
                    : 'bg-bg-secondary text-text-secondary border-border-primary hover:border-accent-primary hover:text-accent-primary'
                }`}
              >
                {category === 'all'
                  ? `All (${toolRegistry.length})`
                  : `${category} (${toolRegistry.filter((t) => t.category === category).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm font-mono text-text-tertiary">
            Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="group">
                <Card className="h-full hover:scale-[1.02] transition-transform duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl" aria-hidden="true">
                        {tool.icon}
                      </span>
                      {tool.popular && (
                        <span className="px-2 py-1 text-xs font-mono bg-accent-primary text-black font-semibold">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <h2 className="font-mono text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                      {tool.name}
                    </h2>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs font-mono text-accent-primary bg-bg-tertiary border border-border-primary px-2 py-1"
                        >
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 2 && (
                        <span className="text-xs font-mono text-text-tertiary px-2 py-1">
                          +{tool.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-bg-secondary border border-border-primary">
            <p className="text-text-secondary font-mono mb-2">No tools found</p>
            <p className="text-text-tertiary text-sm">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}
