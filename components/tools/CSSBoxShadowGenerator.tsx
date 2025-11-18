'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function CSSBoxShadowGenerator() {
  const [horizontalOffset, setHorizontalOffset] = useState(0)
  const [verticalOffset, setVerticalOffset] = useState(8)
  const [blurRadius, setBlurRadius] = useState(16)
  const [spreadRadius, setSpreadRadius] = useState(0)
  const [shadowColor, setShadowColor] = useState('#000000')
  const [opacity, setOpacity] = useState(0.3)
  const [inset, setInset] = useState(false)
  const { showToast } = useToast()

  const generateCSS = () => {
    const rgba = hexToRgba(shadowColor, opacity)
    return `box-shadow: ${inset ? 'inset ' : ''}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${rgba};`
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const shadowStyle = {
    boxShadow: `${inset ? 'inset ' : ''}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, opacity)}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCSS())
    showToast('CSS copied to clipboard!', 'success')
  }

  const handleClear = () => {
    setHorizontalOffset(0)
    setVerticalOffset(8)
    setBlurRadius(16)
    setSpreadRadius(0)
    setShadowColor('#000000')
    setOpacity(0.3)
    setInset(false)
  }

  const presets = [
    { name: 'Subtle', values: [0, 2, 8, 0, '#000000', 0.1] as const },
    { name: 'Medium', values: [0, 4, 12, 0, '#000000', 0.15] as const },
    { name: 'Strong', values: [0, 8, 16, 0, '#000000', 0.3] as const },
    { name: 'Neon Glow', values: [0, 0, 20, 4, '#00ff41', 0.8] as const },
  ]

  const applyPreset = (values: readonly [number, number, number, number, string, number]) => {
    setHorizontalOffset(values[0])
    setVerticalOffset(values[1])
    setBlurRadius(values[2])
    setSpreadRadius(values[3])
    setShadowColor(values[4])
    setOpacity(values[5])
  }

  useKeyboardShortcuts([
    { key: 'c', ctrlKey: true, handler: handleCopy, description: 'Copy CSS' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
              Shadow Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Horizontal Offset: {horizontalOffset}px
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={horizontalOffset}
                  onChange={(e) => setHorizontalOffset(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Vertical Offset: {verticalOffset}px
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={verticalOffset}
                  onChange={(e) => setVerticalOffset(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Blur Radius: {blurRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={blurRadius}
                  onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Spread Radius: {spreadRadius}px
                </label>
                <input
                  type="range"
                  min="-20"
                  max="50"
                  value={spreadRadius}
                  onChange={(e) => setSpreadRadius(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Shadow Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-16 h-10 bg-bg-tertiary border border-border-primary cursor-pointer"
                  />
                  <input
                    type="text"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="flex-1 bg-bg-tertiary border border-border-primary p-2 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Opacity: {opacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inset"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="w-4 h-4 accent-accent-primary"
                />
                <label htmlFor="inset" className="text-sm font-mono text-text-primary">
                  Inset shadow (inner shadow)
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="primary" onClick={handleCopy}>
                  Copy CSS
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              Presets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="secondary"
                  onClick={() => applyPreset(preset.values)}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              Preview
            </h3>
            <div className="bg-bg-tertiary p-8 flex items-center justify-center min-h-[300px]">
              <div
                style={shadowStyle}
                className="w-48 h-48 bg-white flex items-center justify-center"
              >
                <span className="font-mono text-black text-sm">Preview Box</span>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              Generated CSS
            </h3>
            <CodeDisplay title="CSS" code={generateCSS()} language="css" />
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Box Shadow Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">↔️ Horizontal Offset</p>
            <p className="text-text-secondary">
              Positive values move shadow right, negative values move it left
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">↕️ Vertical Offset</p>
            <p className="text-text-secondary">
              Positive values move shadow down, negative values move it up
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🌫️ Blur Radius</p>
            <p className="text-text-secondary">
              Larger values create more blur. 0 = sharp shadow edge
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📏 Spread Radius</p>
            <p className="text-text-secondary">
              Positive = shadow expands, negative = shadow contracts
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎨 Color & Opacity</p>
            <p className="text-text-secondary">
              Use RGBA for transparent shadows. Lower opacity for subtle effects
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📥 Inset</p>
            <p className="text-text-secondary">
              Creates an inner shadow instead of outer. Great for depth effects
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+C', action: 'Copy CSS' },
          { keys: 'Ctrl+K', action: 'Reset' },
        ]}
      />
    </div>
  )
}
