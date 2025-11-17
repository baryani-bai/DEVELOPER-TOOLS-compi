'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { imageToBase64, copyToClipboard } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function ImageToBase64() {
  const [base64, setBase64] = useState('')
  const [imageInfo, setImageInfo] = useState<{ name: string; size: string; type: string } | null>(null)
  const [preview, setPreview] = useState('')
  const { showToast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return
    }

    try {
      const result = await imageToBase64(file)
      setBase64(result)
      setPreview(result)
      setImageInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type,
      })
      showToast('Image converted to Base64!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleCopy = async () => {
    if (!base64) {
      showToast('No Base64 data to copy', 'error')
      return
    }

    await copyToClipboard(base64)
    showToast('Base64 copied to clipboard!', 'success')
  }

  const handleClear = () => {
    setBase64('')
    setImageInfo(null)
    setPreview('')
  }

  useKeyboardShortcuts([
    { key: 'c', ctrlKey: true, handler: handleCopy, description: 'Copy Base64' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-6">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Upload Image
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Convert images to Base64 strings for embedding in HTML, CSS, or JSON.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <Button
              variant="primary"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="w-full"
            >
              Choose Image
            </Button>
          </label>
          {base64 && (
            <>
              <Button variant="secondary" onClick={handleCopy}>
                Copy Base64
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </>
          )}
        </div>

        {imageInfo && (
          <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
            <div className="grid grid-cols-3 gap-4 text-sm font-mono">
              <div>
                <span className="text-text-secondary">Name:</span>
                <p className="text-text-primary mt-1 truncate">{imageInfo.name}</p>
              </div>
              <div>
                <span className="text-text-secondary">Size:</span>
                <p className="text-text-primary mt-1">{imageInfo.size}</p>
              </div>
              <div>
                <span className="text-text-secondary">Type:</span>
                <p className="text-text-primary mt-1">{imageInfo.type}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {preview && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-bg-secondary border border-border-primary p-6">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              Image Preview
            </h3>
            <div className="bg-bg-tertiary border border-border-primary p-4 flex items-center justify-center min-h-[300px]">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>

          <div className="bg-bg-secondary border border-border-primary p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-lg font-semibold text-text-primary">
                Base64 String
              </h3>
              <Button variant="icon" onClick={handleCopy}>
                📋
              </Button>
            </div>
            <div className="bg-bg-tertiary border border-border-primary p-4 max-h-[400px] overflow-auto">
              <pre className="text-xs text-text-primary font-mono break-all whitespace-pre-wrap">
                {base64}
              </pre>
            </div>
            <p className="mt-4 text-xs text-text-secondary font-mono">
              Base64 length: {base64.length} characters
            </p>
          </div>
        </div>
      )}

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+C', action: 'Copy Base64' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
