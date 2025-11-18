'use client'

import { useState } from 'react'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

type GradientType = 'linear' | 'radial'

export default function CSSGradientGenerator() {
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState(90)
  const [color1, setColor1] = useState('#00ff41')
  const [color2, setColor2] = useState('#000000')
  const [stop1, setStop1] = useState(0)
  const [stop2, setStop2] = useState(100)
  const { showToast } = useToast()

  const generateCSS = () => {
    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%);`
    } else {
      return `background: radial-gradient(circle, ${color1} ${stop1}%, ${color2} ${stop2}%);`
    }
  }

  const gradientStyle = {
    background: gradientType === 'linear'
      ? `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`
      : `radial-gradient(circle, ${color1} ${stop1}%, ${color2} ${stop2}%)`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCSS())
    showToast('CSS copied to clipboard!', 'success')
  }

  const handleClear = () => {
    setAngle(90)
    setColor1('#00ff41')
    setColor2('#000000')
    setStop1(0)
    setStop2(100)
  }

  useKeyboardShortcuts([
    { key: 'c', ctrlKey: true, handler: handleCopy, description: 'Copy CSS' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Gradient Type
        </h3>

        <div className="flex gap-2">
          <Button
            variant={gradientType === 'linear' ? 'primary' : 'secondary'}
            onClick={() => setGradientType('linear')}
          >
            Linear Gradient
          </Button>
          <Button
            variant={gradientType === 'radial' ? 'primary' : 'secondary'}
            onClick={() => setGradientType('radial')}
          >
            Radial Gradient
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">
              Gradient Settings
            </h3>

            <div className="space-y-6">
              {gradientType === 'linear' && (
                <div>
                  <label className="block text-sm font-mono text-text-secondary mb-2">
                    Angle: {angle}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                  />
                  <div className="flex justify-between text-xs font-mono text-text-tertiary mt-1">
                    <span>0° (→)</span>
                    <span>90° (↑)</span>
                    <span>180° (←)</span>
                    <span>270° (↓)</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Color 1
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-10 bg-bg-tertiary border border-border-primary cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 bg-bg-tertiary border border-border-primary p-2 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Stop 1: {stop1}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop1}
                  onChange={(e) => setStop1(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Color 2
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-10 bg-bg-tertiary border border-border-primary cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 bg-bg-tertiary border border-border-primary p-2 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono text-text-secondary mb-2">
                  Stop 2: {stop2}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop2}
                  onChange={(e) => setStop2(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary border border-border-primary accent-accent-primary"
                />
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
        </div>

        <div className="space-y-4">
          <div className="bg-bg-secondary border border-border-primary p-5">
            <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
              Preview
            </h3>
            <div
              style={gradientStyle}
              className="w-full h-64 border border-border-primary"
            />
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
          Gradient Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📐 Linear Gradients</p>
            <p className="text-text-secondary">
              Create gradients along a straight line at any angle. 0° = left to right, 90° = bottom to top.
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎯 Radial Gradients</p>
            <p className="text-text-secondary">
              Create gradients that radiate from a center point outward in a circular or elliptical shape.
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎨 Color Stops</p>
            <p className="text-text-secondary">
              Control where colors start and end. 0% = start, 100% = end. Mix them for unique effects.
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Browser Support</p>
            <p className="text-text-secondary">
              CSS gradients are supported in all modern browsers. No images needed!
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
