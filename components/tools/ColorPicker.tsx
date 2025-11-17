'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { hexToRgb, rgbToHex, rgbToHsl } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'
import { copyToClipboard } from '@/lib/utils/toolHelpers'

export default function ColorPicker() {
  const [color, setColor] = useState('#00ff41')
  const { showToast } = useToast()

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const handleCopy = async (value: string, label: string) => {
    await copyToClipboard(value)
    showToast(`${label} copied!`, 'success')
  }

  useKeyboardShortcuts([
    { key: 'c', ctrlKey: true, handler: () => handleCopy(color, 'HEX'), description: 'Copy HEX' },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-secondary border border-border-primary p-6">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">Color Picker</h3>
          
          <div className="space-y-6">
            <div className="w-full h-64 border-4 border-border-primary" style={{ backgroundColor: color }} />
            
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">Select Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 cursor-pointer bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">HEX</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-bg-primary border border-border-primary text-text-primary font-mono px-4 py-2"
              />
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border-primary p-6">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-6">Color Values</h3>
          
          <div className="space-y-4">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-mono text-text-secondary">HEX</span>
                <Button variant="icon" onClick={() => handleCopy(color, 'HEX')}>📋</Button>
              </div>
              <p className="font-mono text-accent-primary">{color}</p>
            </div>

            {rgb && (
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-mono text-text-secondary">RGB</span>
                  <Button variant="icon" onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}>📋</Button>
                </div>
                <p className="font-mono text-accent-primary">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</p>
              </div>
            )}

            {hsl && (
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-mono text-text-secondary">HSL</span>
                  <Button variant="icon" onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}>📋</Button>
                </div>
                <p className="font-mono text-accent-primary">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <KeyboardHint shortcuts={[{ keys: 'Ctrl+C', action: 'Copy HEX' }]} />
    </div>
  )
}
