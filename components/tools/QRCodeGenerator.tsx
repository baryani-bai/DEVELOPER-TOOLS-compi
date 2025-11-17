'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { generateQRCode, downloadFile } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function QRCodeGenerator() {
  const [input, setInput] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [size, setSize] = useState(256)
  const { showToast } = useToast()

  const handleGenerate = () => {
    if (!input.trim()) {
      showToast('Please enter text or URL', 'error')
      return
    }

    try {
      const qrCode = generateQRCode(input, size)
      setQrCodeUrl(qrCode)
      showToast('QR code generated!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Generation failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setQrCodeUrl('')
  }

  const handleDownload = () => {
    if (!qrCodeUrl) {
      showToast('Generate a QR code first', 'error')
      return
    }

    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('QR code downloaded!', 'success')
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleGenerate, description: 'Generate QR code' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">Options</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-text-secondary mb-2">Size (pixels)</label>
            <div className="flex gap-2">
              {[128, 256, 512].map((s) => (
                <Button
                  key={s}
                  variant={size === s ? 'primary' : 'secondary'}
                  onClick={() => setSize(s)}
                >
                  {s}px
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolPanel
          title="Text or URL"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="https://codebox.dev or any text..."
          rows={10}
        />

        <div className="bg-bg-secondary border border-border-primary p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-lg font-semibold text-text-primary">QR Code</h3>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleGenerate}>
                Generate
              </Button>
              {qrCodeUrl && (
                <Button variant="secondary" onClick={handleDownload}>
                  Download
                </Button>
              )}
            </div>
          </div>

          <div className="bg-bg-tertiary border border-border-primary p-8 flex items-center justify-center min-h-[300px]">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Generated QR Code"
                className="max-w-full h-auto"
                style={{ imageRendering: 'pixelated' }}
              />
            ) : (
              <p className="text-text-secondary font-mono text-sm text-center">
                QR code will appear here after generation
              </p>
            )}
          </div>

          {qrCodeUrl && (
            <div className="mt-4 text-xs font-mono text-text-secondary">
              <p>⚠️ Note: This is a demo QR code generator.</p>
              <p className="mt-1">For production use, integrate a proper QR library.</p>
            </div>
          )}
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Generate QR code' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
