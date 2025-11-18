'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { ipv4ToDecimal, decimalToIpv4, ipv4ToBinary, ipv4ToHex } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function IPAddressTools() {
  const [input, setInput] = useState('192.168.1.1')
  const [results, setResults] = useState<{
    ipv4: string
    decimal: number
    binary: string
    hex: string
    octets: number[]
  } | null>(null)
  const { showToast } = useToast()

  const handleConvert = () => {
    if (!input.trim()) {
      showToast('Please enter an IP address', 'error')
      return
    }

    try {
      const decimal = ipv4ToDecimal(input)
      const binary = ipv4ToBinary(input)
      const hex = ipv4ToHex(input)
      const octets = input.split('.').map(Number)

      setResults({
        ipv4: input,
        decimal,
        binary,
        hex,
        octets,
      })

      showToast('IP address converted successfully!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleConvertFromDecimal = () => {
    try {
      const decimal = parseInt(input)
      if (isNaN(decimal)) {
        showToast('Please enter a valid decimal number', 'error')
        return
      }

      const ipv4 = decimalToIpv4(decimal)
      setInput(ipv4)
      handleConvert()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setResults(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleConvert, description: 'Convert' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          IP Address Input
        </h3>

        <ToolPanel
          title=""
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter IPv4 address (e.g., 192.168.1.1) or decimal..."
          rows={3}
        />

        <div className="flex gap-2 mt-4">
          <Button variant="primary" onClick={handleConvert}>
            Convert IP
          </Button>
          <Button variant="secondary" onClick={handleConvertFromDecimal}>
            Convert from Decimal
          </Button>
        </div>
      </div>

      {results && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            IP Address Representations
          </h3>

          <div className="space-y-4">
            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-2">IPv4 (Dotted Decimal)</p>
              <p className="text-2xl font-mono text-accent-primary break-all">{results.ipv4}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-2">Decimal (32-bit Integer)</p>
              <p className="text-2xl font-mono text-accent-primary">{results.decimal}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-2">Binary (Dotted)</p>
              <p className="text-lg font-mono text-accent-primary break-all">{results.binary}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-2">Hexadecimal</p>
              <p className="text-2xl font-mono text-accent-primary">{results.hex}</p>
            </div>

            <div className="bg-bg-tertiary border border-border-primary p-4">
              <p className="text-xs font-mono text-text-secondary mb-2">Octets (Individual Bytes)</p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {results.octets.map((octet, i) => (
                  <div key={i} className="bg-bg-secondary border border-border-primary p-2 text-center">
                    <p className="text-xs text-text-tertiary">Octet {i + 1}</p>
                    <p className="text-xl text-accent-primary">{octet}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {octet.toString(2).padStart(8, '0')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          IP Address Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🏠 Localhost</p>
            <p className="text-text-secondary">127.0.0.1 (Loopback address)</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🌐 Private Network</p>
            <p className="text-text-secondary">192.168.0.0 - 192.168.255.255</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🏢 Private (Class A)</p>
            <p className="text-text-secondary">10.0.0.0 - 10.255.255.255</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🏬 Private (Class B)</p>
            <p className="text-text-secondary">172.16.0.0 - 172.31.255.255</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📡 Broadcast</p>
            <p className="text-text-secondary">255.255.255.255 (All hosts)</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔢 Range</p>
            <p className="text-text-secondary">0.0.0.0 to 255.255.255.255</p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
