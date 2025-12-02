'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }

    // In production, you could send to error tracking service
    // Example: Sentry.captureException(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary py-12 px-4">
      <Container>
        <div className="max-w-2xl mx-auto bg-bg-secondary border border-border-primary p-8 md:p-12">
          {/* Error Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">⚠️</span>
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-error">
                Something went wrong
              </h1>
            </div>
            <div className="border-l-4 border-error pl-4">
              <p className="font-mono text-text-secondary text-sm md:text-base">
                We encountered an unexpected error while processing your request.
              </p>
            </div>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-bg-tertiary border border-border-primary rounded">
              <h2 className="font-mono text-sm font-semibold text-error mb-2">
                Error Details (Development Only):
              </h2>
              <pre className="text-xs text-text-secondary overflow-x-auto">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-text-tertiary mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Error Message (Production) */}
          {process.env.NODE_ENV === 'production' && error.digest && (
            <div className="mb-6 p-4 bg-bg-tertiary border border-border-primary rounded">
              <p className="font-mono text-sm text-text-secondary">
                <span className="text-text-primary font-semibold">Error Reference:</span>{' '}
                {error.digest}
              </p>
              <p className="font-mono text-xs text-text-tertiary mt-2">
                Please include this reference if you contact support.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={() => reset()}
              className="flex-1 justify-center"
            >
              🔄 Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="secondary" className="w-full justify-center">
                🏠 Go Home
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-border-primary">
            <h3 className="font-mono text-sm font-semibold text-text-primary mb-3">
              What can you do?
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary font-mono">
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-1">▹</span>
                <span>Click "Try Again" to retry the operation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-1">▹</span>
                <span>Return to the home page and try a different tool</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-1">▹</span>
                <span>Refresh the page to start fresh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-1">▹</span>
                <span>
                  If the problem persists, please{' '}
                  <a
                    href="https://github.com/yourusername/codebox/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-primary hover:underline"
                  >
                    report this issue
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-bg-primary border border-border-primary rounded">
            <p className="font-mono text-xs text-text-tertiary">
              <span className="text-accent-primary">🔒 Privacy Note:</span> All tools run
              locally in your browser. Your data is safe and hasn't been sent anywhere.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
