import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { toolRegistry } from '@/lib/constants/toolRegistry'

export const metadata: Metadata = {
  title: 'Code Formatters - CodeBox',
  description: 'Format and beautify JSON, XML, HTML, CSS, JavaScript, SQL, YAML, and more. Free online code formatting tools.',
  keywords: ['code formatter', 'json formatter', 'xml formatter', 'html formatter', 'css formatter', 'javascript formatter', 'sql formatter'],
}

export default function FormattersPage() {
  // Filter tools by category
  const formatterTools = toolRegistry.filter(tool => tool.category === 'formatters')

  return (
    <div className="py-12 md:py-16 bg-bg-primary min-h-screen">
      <Container>
        {/* Page Header */}
        <div className="mb-12">
          <nav className="text-sm font-mono text-text-tertiary mb-4">
            <Link href="/" className="hover:text-accent-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="hover:text-accent-primary">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Formatters</span>
          </nav>

          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Code Formatters
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl">
            Format and beautify your code with proper indentation and syntax. Support for JSON, XML, HTML, CSS, JavaScript, SQL, YAML, and more.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="px-4 py-2 bg-bg-secondary border border-border-primary">
              <span className="text-2xl font-mono font-bold text-accent-primary">{formatterTools.length}</span>
              <span className="text-sm text-text-tertiary ml-2">formatter tools</span>
            </div>
            <div className="px-4 py-2 bg-bg-secondary border border-border-primary">
              <span className="text-sm text-text-tertiary">✓ 100% Client-Side</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formatterTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group bg-bg-secondary border border-border-primary p-6 hover:border-accent-primary transition-all duration-200 hover:shadow-glow"
            >
              {/* Icon and Popular Badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl" aria-hidden="true">
                  {tool.icon}
                </span>
                {tool.popular && (
                  <span className="px-2 py-1 text-xs font-mono bg-accent-primary text-black">
                    POPULAR
                  </span>
                )}
              </div>

              {/* Tool Name */}
              <h2 className="font-mono text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                {tool.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {tool.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {tool.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs font-mono text-text-tertiary bg-bg-tertiary px-2 py-1"
                  >
                    {feature}
                  </span>
                ))}
                {tool.features.length > 2 && (
                  <span className="text-xs font-mono text-text-tertiary">
                    +{tool.features.length - 2} more
                  </span>
                )}
              </div>

              {/* Arrow indicator */}
              <div className="mt-4 flex items-center gap-2 text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-mono">Open Tool</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state (shouldn't happen, but good to have) */}
        {formatterTools.length === 0 && (
          <div className="text-center py-16 bg-bg-secondary border border-border-primary">
            <p className="font-mono text-xl text-text-secondary mb-4">
              No formatter tools found
            </p>
            <Link href="/tools" className="text-accent-primary hover:underline">
              View all tools →
            </Link>
          </div>
        )}

        {/* Back to all tools */}
        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono font-semibold bg-bg-secondary border-2 border-border-primary text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View All Tools
          </Link>
        </div>
      </Container>
    </div>
  )
}
