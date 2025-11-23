import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { toolRegistry } from '@/lib/constants/toolRegistry'

export const metadata: Metadata = {
  title: 'Security Tools - CodeBox',
  description: 'Hash generators, Base64 encoding, JWT tools, password generation, and more. Free online security and encryption tools.',
  keywords: ['hash generator', 'md5', 'sha256', 'base64', 'jwt', 'password generator', 'encryption'],
}

export default function SecurityPage() {
  // Filter tools by category
  const securityTools = toolRegistry.filter(tool => tool.category === 'security')

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
            <span className="text-text-primary">Security</span>
          </nav>

          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Security & Encryption Tools
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl">
            Generate secure hashes, encode/decode data, work with JWT tokens, and create strong passwords. All processing happens client-side for maximum security.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="px-4 py-2 bg-bg-secondary border border-border-primary">
              <span className="text-2xl font-mono font-bold text-accent-primary">{securityTools.length}</span>
              <span className="text-sm text-text-tertiary ml-2">security tools</span>
            </div>
            <div className="px-4 py-2 bg-bg-secondary border border-border-primary">
              <span className="text-sm text-text-tertiary">🔒 Client-Side Only</span>
            </div>
            <div className="px-4 py-2 bg-bg-secondary border border-border-primary">
              <span className="text-sm text-text-tertiary">✓ No Data Sent</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mb-8 p-6 bg-bg-secondary border-l-4 border-accent-primary">
          <div className="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-accent-primary flex-shrink-0 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <h3 className="font-mono text-lg font-semibold text-text-primary mb-2">
                Privacy First
              </h3>
              <p className="text-sm text-text-secondary">
                All security tools run entirely in your browser. Your sensitive data never leaves your device and is never sent to any server. We don't store, track, or transmit your information.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityTools.map((tool) => (
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
