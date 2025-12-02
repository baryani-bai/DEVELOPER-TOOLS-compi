'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function ToolError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Tool error:', error)
    }

    // In production, you could send to error tracking service
    // Example: Sentry.captureException(error)
  }, [error])

  return (
    <div className="py-12 md:py-16 bg-bg-primary min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm font-mono text-text-tertiary mb-6">
            <Link href="/" className="hover:text-accent-primary transition-colors">
              Home
            </Link>
            {' / '}
            <Link href="/tools" className="hover:text-accent-primary transition-colors">
              Tools
            </Link>
            {' / '}
            <span className="text-error">Error</span>
          </nav>

          {/* Error Card */}
          <div className="bg-bg-secondary border border-error p-8 md:p-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl">⚠️</span>
              <div>
                <h1 className="font-mono text-2xl md:text-3xl font-bold text-error mb-2">
                  Tool Error
                </h1>
                <p className="font-mono text-text-secondary text-sm md:text-base">
                  This tool encountered an error and couldn't complete the operation.
                </p>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-6 p-5 bg-bg-tertiary border-l-4 border-error">
              <h2 className="font-mono text-sm font-semibold text-error mb-2">
                Error Message:
              </h2>
              <p className="font-mono text-sm text-text-primary break-words">
                {error.message || 'An unexpected error occurred'}
              </p>
              {error.digest && (
                <p className="font-mono text-xs text-text-tertiary mt-3">
                  Error ID: <code className="bg-bg-primary px-2 py-1 rounded">{error.digest}</code>
                </p>
              )}
            </div>

            {/* Stack Trace (Development Only) */}
            {process.env.NODE_ENV === 'development' && error.stack && (
              <details className="mb-6">
                <summary className="font-mono text-sm font-semibold text-text-primary cursor-pointer hover:text-accent-primary mb-2">
                  Stack Trace (Development Only) ▾
                </summary>
                <pre className="p-4 bg-bg-primary border border-border-primary rounded overflow-x-auto text-xs text-text-secondary">
                  {error.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <Button
                variant="primary"
                onClick={() => reset()}
                className="justify-center"
              >
                🔄 Try Again
              </Button>
              <Link href="/tools">
                <Button variant="secondary" className="w-full justify-center">
                  📦 All Tools
                </Button>
              </Link>
              <Link href="/">
                <Button variant="secondary" className="w-full justify-center">
                  🏠 Home
                </Button>
              </Link>
            </div>

            {/* Troubleshooting Tips */}
            <div className="p-5 bg-bg-primary border border-border-primary rounded">
              <h3 className="font-mono text-sm font-semibold text-text-primary mb-3">
                💡 Troubleshooting Tips
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary shrink-0">▹</span>
                  <span>
                    <strong className="text-text-primary">Clear your input:</strong> The error might be caused by invalid or
                    malformed data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary shrink-0">▹</span>
                  <span>
                    <strong className="text-text-primary">Reload the page:</strong> A fresh start can resolve temporary
                    issues
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary shrink-0">▹</span>
                  <span>
                    <strong className="text-text-primary">Try a different browser:</strong> Some tools may work better in
                    different browsers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary shrink-0">▹</span>
                  <span>
                    <strong className="text-text-primary">Check your data format:</strong> Ensure your input matches the
                    expected format (JSON, XML, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary shrink-0">▹</span>
                  <span>
                    <strong className="text-text-primary">Report persistent issues:</strong>{' '}
                    <a
                      href="https://github.com/yourusername/codebox/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:underline"
                    >
                      File a bug report
                    </a>{' '}
                    if the problem continues
                  </span>
                </li>
              </ul>
            </div>

            {/* Privacy Assurance */}
            <div className="mt-6 p-4 bg-bg-tertiary border-l-4 border-accent-primary">
              <p className="font-mono text-xs text-text-secondary">
                <span className="text-accent-primary font-semibold">🔒 Your data is safe:</span>{' '}
                All processing happens locally in your browser. No data was sent to any server,
                and nothing was stored.
              </p>
            </div>
          </div>

          {/* Popular Tools */}
          <div className="mt-8 p-6 bg-bg-secondary border border-border-primary">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              Try These Popular Tools Instead
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/json-formatter">
                <Button variant="secondary" className="w-full justify-start text-left">
                  <span className="mr-2">📝</span> JSON Formatter
                </Button>
              </Link>
              <Link href="/tools/base64-encoder">
                <Button variant="secondary" className="w-full justify-start text-left">
                  <span className="mr-2">🔐</span> Base64 Encoder
                </Button>
              </Link>
              <Link href="/tools/url-encoder">
                <Button variant="secondary" className="w-full justify-start text-left">
                  <span className="mr-2">🔗</span> URL Encoder
                </Button>
              </Link>
              <Link href="/tools/markdown-editor">
                <Button variant="secondary" className="w-full justify-start text-left">
                  <span className="mr-2">✍️</span> Markdown Editor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
