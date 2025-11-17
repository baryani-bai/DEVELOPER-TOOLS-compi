import { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { toolRegistry } from '@/lib/constants/toolRegistry'

export const metadata: Metadata = {
  title: 'Categories - CodeBox',
  description: 'Browse developer tools by category. Find the perfect tool for your needs.',
  keywords: ['developer tools categories', 'code tools', 'web development tools'],
}

// Get unique categories with tool counts
const categories = Array.from(new Set(toolRegistry.map((tool) => tool.category))).map(
  (category) => ({
    name: category,
    count: toolRegistry.filter((tool) => tool.category === category).length,
    icon: toolRegistry.find((tool) => tool.category === category)?.icon || '🔧',
    description: getCategoryDescription(category),
  })
)

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'Text Transformers': 'Transform, encode, and manipulate text in various formats',
    'Code Formatters': 'Format and beautify code for better readability',
    'Hash Generators': 'Generate cryptographic hashes and checksums',
    Encoders: 'Encode and decode data in different formats',
    Generators: 'Generate UUIDs, passwords, and random data',
    Converters: 'Convert between different data formats and units',
    'Testing Tools': 'Test and validate code, APIs, and data',
    Utilities: 'Miscellaneous helpful developer utilities',
  }
  return descriptions[category] || 'Developer tools and utilities'
}

export default function CategoriesPage() {
  return (
    <div className="py-12 md:py-20 bg-bg-primary">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Browse by Category
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Explore our collection of {toolRegistry.length} developer tools organized by category. Find exactly what you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${encodeURIComponent(category.name.toLowerCase().replace(/\s+/g, '-'))}`}
              className="group"
            >
              <Card className="h-full hover:scale-[1.02] transition-transform duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl" aria-hidden="true">
                      {category.icon}
                    </span>
                    <span className="px-3 py-1 text-xs font-mono bg-bg-tertiary border border-border-primary text-accent-primary">
                      {category.count} {category.count === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                  <h2 className="font-mono text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-text-secondary">{category.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 p-8 bg-bg-secondary border border-border-primary">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-mono font-bold text-accent-primary">
                {toolRegistry.length}
              </p>
              <p className="text-sm text-text-tertiary mt-1">Total Tools</p>
            </div>
            <div>
              <p className="text-3xl font-mono font-bold text-accent-primary">
                {categories.length}
              </p>
              <p className="text-sm text-text-tertiary mt-1">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-mono font-bold text-accent-primary">100%</p>
              <p className="text-sm text-text-tertiary mt-1">Free</p>
            </div>
            <div>
              <p className="text-3xl font-mono font-bold text-accent-primary">0</p>
              <p className="text-sm text-text-tertiary mt-1">Data Sent to Servers</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
