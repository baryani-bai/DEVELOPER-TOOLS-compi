'use client'

import { cn } from '@/lib/utils/cn'
import Button from '@/components/ui/Button'
import { copyToClipboard, downloadFile } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { highlightCode } from '@/lib/utils/syntaxHighlight'
import { useMemo } from 'react'

interface CodeDisplayProps {
  title: string
  code: string
  error?: string
  language?: string
  filename?: string
  className?: string
}

export default function CodeDisplay({
  title,
  code,
  error,
  language = 'text',
  filename = 'output.txt',
  className,
}: CodeDisplayProps) {
  const { showToast } = useToast()

  // Memoize syntax highlighting for performance
  const highlightedCode = useMemo(() => {
    if (!code || error) return null
    if (language === 'json') {
      return highlightCode(code, 'json')
    }
    return null
  }, [code, language, error])

  const handleCopy = async () => {
    if (!code && !error) return

    try {
      await copyToClipboard(error || code)
      showToast('Copied to clipboard!', 'success')
    } catch (err) {
      showToast('Failed to copy', 'error')
    }
  }

  const handleDownload = () => {
    if (!code) return

    try {
      downloadFile(code, filename)
      showToast('Downloaded successfully!', 'success')
    } catch (err) {
      showToast('Failed to download', 'error')
    }
  }

  return (
    <div className={cn('bg-bg-secondary border border-border-primary p-6', className)}>
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-lg font-semibold text-text-primary">{title}</h3>

        <div className="flex gap-2">
          {(code || error) && (
            <Button
              variant="icon"
              onClick={handleCopy}
              aria-label="Copy to clipboard"
              title="Copy (Cmd+C)"
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </Button>
          )}

          {code && (
            <Button
              variant="icon"
              onClick={handleDownload}
              aria-label="Download"
              title="Download"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Code Display */}
      <div
        className={cn(
          'min-h-[400px] bg-bg-tertiary border border-border-primary p-4 overflow-auto',
          'font-mono text-sm',
          error ? 'text-error' : 'text-text-primary'
        )}
      >
        {error ? (
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold mb-2">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : code ? (
          highlightedCode ? (
            <pre
              className="whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <pre className="whitespace-pre-wrap break-words">{code}</pre>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-text-tertiary italic">
            Output will appear here...
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {code && (
        <div className="flex gap-3 mt-4">
          <Button variant="secondary" onClick={handleCopy} className="flex-1">
            📋 Copy to Clipboard
          </Button>
          <Button variant="secondary" onClick={handleDownload} className="flex-1">
            ⬇️ Download
          </Button>
        </div>
      )}
    </div>
  )
}
