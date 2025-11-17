'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function HexColorConverter() {
  const [hexInput, setHexInput] = useState('#3498db')
  const [rgbR, setRgbR] = useState(52)
  const [rgbG, setRgbG] = useState(152)
  const [rgbB, setRgbB] = useState(219)
  const [hslH, setHslH] = useState(204)
  const [hslS, setHslS] = useState(70)
  const [hslL, setHslL] = useState(53)
  const { showToast } = useToast()

  const handleHexToRGB = () => {
    try {
      const rgb = hexToRgb(hexInput)
      if (!rgb) {
        showToast('Invalid HEX color', 'error')
        return
      }
      setRgbR(rgb.r)
      setRgbG(rgb.g)
      setRgbB(rgb.b)

      // Also update HSL
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      setHslH(hsl.h)
      setHslS(hsl.s)
      setHslL(hsl.l)

      showToast('Converted HEX to RGB!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Invalid HEX color', 'error')
    }
  }

  const handleRGBToHex = () => {
    try {
      const hex = rgbToHex(rgbR, rgbG, rgbB)
      setHexInput(hex)

      // Also update HSL
      const hsl = rgbToHsl(rgbR, rgbG, rgbB)
      setHslH(hsl.h)
      setHslS(hsl.s)
      setHslL(hsl.l)

      showToast('Converted RGB to HEX!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Invalid RGB values', 'error')
    }
  }

  const handleHSLToRGB = () => {
    try {
      const rgb = hslToRgb(hslH, hslS, hslL)
      setRgbR(rgb.r)
      setRgbG(rgb.g)
      setRgbB(rgb.b)

      // Also update HEX
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
      setHexInput(hex)

      showToast('Converted HSL to RGB!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Invalid HSL values', 'error')
    }
  }

  const currentColor = hexInput

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleHexToRGB, description: 'Convert HEX' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Color Preview
        </h3>
        <div
          className="w-full h-32 border border-border-primary rounded"
          style={{ backgroundColor: currentColor }}
        />
        <p className="text-center mt-3 text-sm font-mono text-text-secondary">
          Current Color: <span className="text-accent-primary">{currentColor}</span>
        </p>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          HEX Color
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            placeholder="#3498db"
            className="flex-1 bg-bg-tertiary border border-border-primary text-text-primary font-mono px-4 py-3 focus:outline-none focus:border-accent-primary uppercase"
          />
          <Button variant="primary" onClick={handleHexToRGB}>
            Convert to RGB
          </Button>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          RGB Color
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">Red (0-255)</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbR}
              onChange={(e) => setRgbR(Number(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">Green (0-255)</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbG}
              onChange={(e) => setRgbG(Number(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">Blue (0-255)</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbB}
              onChange={(e) => setRgbB(Number(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>
        </div>
        <Button variant="primary" onClick={handleRGBToHex} className="w-full">
          Convert to HEX
        </Button>
        <p className="text-center mt-3 text-sm font-mono text-accent-primary">
          rgb({rgbR}, {rgbG}, {rgbB})
        </p>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          HSL Color
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">Hue (0-360)</label>
            <input
              type="number"
              min="0"
              max="360"
              value={hslH}
              onChange={(e) => setHslH(Number(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">Saturation (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hslS}
              onChange={(e) => setHslS(Number(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">Lightness (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hslL}
              onChange={(e) => setHslL(Number(e.target.value))}
              className="w-full bg-bg-tertiary border border-border-primary text-text-primary font-mono px-3 py-2 focus:outline-none focus:border-accent-primary"
            />
          </div>
        </div>
        <Button variant="primary" onClick={handleHSLToRGB} className="w-full">
          Convert to RGB
        </Button>
        <p className="text-center mt-3 text-sm font-mono text-accent-primary">
          hsl({hslH}, {hslS}%, {hslL}%)
        </p>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Color Formats
        </h3>
        <div className="space-y-3 text-sm font-mono text-text-secondary">
          <p>
            <span className="text-accent-primary">HEX:</span> Hexadecimal color notation (#RRGGBB)
          </p>
          <p>
            <span className="text-accent-primary">RGB:</span> Red, Green, Blue values (0-255)
          </p>
          <p>
            <span className="text-accent-primary">HSL:</span> Hue (0-360), Saturation (0-100%), Lightness (0-100%)
          </p>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert HEX to RGB' },
        ]}
      />
    </div>
  )
}
