'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { chmodToRWX, rwxToChmod } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function UnixPermissionsCalculator() {
  const [chmod, setChmod] = useState('755')
  const [rwx, setRwx] = useState({ user: 'rwx', group: 'r-x', other: 'r-x' })
  const { showToast } = useToast()

  const handleChmodConvert = () => {
    try {
      const result = chmodToRWX(chmod)
      setRwx(result)
      showToast('Converted chmod to rwx notation!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const handleRwxConvert = () => {
    try {
      const fullRwx = rwx.user + rwx.group + rwx.other
      const result = rwxToChmod(fullRwx)
      setChmod(result)
      showToast('Converted rwx to chmod notation!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Conversion failed', 'error')
    }
  }

  const togglePermission = (entity: 'user' | 'group' | 'other', position: number) => {
    const current = rwx[entity]
    const chars = current.split('')
    chars[position] = chars[position] === '-' ? ('rwx'[position]) : '-'
    setRwx({ ...rwx, [entity]: chars.join('') })
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleChmodConvert, description: 'Convert chmod' },
  ])

  const permissions = [
    { chmod: '777', rwx: 'rwxrwxrwx', desc: 'Full access for everyone' },
    { chmod: '755', rwx: 'rwxr-xr-x', desc: 'Owner: full, Others: read/execute' },
    { chmod: '644', rwx: 'rw-r--r--', desc: 'Owner: read/write, Others: read only' },
    { chmod: '600', rwx: 'rw-------', desc: 'Owner: read/write, Others: none' },
    { chmod: '700', rwx: 'rwx------', desc: 'Owner: full, Others: none' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Chmod Number
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={chmod}
            onChange={(e) => setChmod(e.target.value)}
            placeholder="755"
            maxLength={3}
            className="w-32 bg-bg-tertiary border border-border-primary text-text-primary font-mono text-2xl px-4 py-3 text-center focus:outline-none focus:border-accent-primary"
          />
          <Button variant="primary" onClick={handleChmodConvert}>
            Convert to rwx
          </Button>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Permission Builder (rwx notation)
        </h3>

        <div className="space-y-4">
          {(['user', 'group', 'other'] as const).map(entity => (
            <div key={entity} className="bg-bg-tertiary border border-border-primary p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-mono text-text-secondary capitalize">{entity}</span>
                <span className="text-lg font-mono text-accent-primary">{rwx[entity]}</span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map(pos => (
                  <Button
                    key={pos}
                    variant={rwx[entity][pos] !== '-' ? 'primary' : 'secondary'}
                    onClick={() => togglePermission(entity, pos)}
                    className="flex-1"
                  >
                    {'rwx'[pos]}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="primary" onClick={handleRwxConvert} className="w-full">
            Convert to chmod
          </Button>
        </div>

        <div className="mt-4 bg-bg-tertiary border border-border-primary p-4">
          <p className="text-sm font-mono text-text-secondary">
            Current: <span className="text-accent-primary font-bold">{chmod}</span> = <span className="text-accent-primary font-bold">{rwx.user + rwx.group + rwx.other}</span>
          </p>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Common Permission Patterns
        </h3>
        <div className="space-y-2">
          {permissions.map(perm => (
            <div
              key={perm.chmod}
              className="bg-bg-tertiary border border-border-primary p-3 flex items-center justify-between cursor-pointer hover:border-accent-primary transition-colors"
              onClick={() => {
                setChmod(perm.chmod)
                handleChmodConvert()
              }}
            >
              <div>
                <span className="text-sm font-mono text-accent-primary font-bold">{perm.chmod}</span>
                <span className="text-sm font-mono text-text-secondary ml-3">{perm.rwx}</span>
              </div>
              <span className="text-xs font-mono text-text-tertiary">{perm.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Permission Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">r (4) = Read</p>
            <p className="text-text-secondary text-xs">View file contents or list directory</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">w (2) = Write</p>
            <p className="text-text-secondary text-xs">Modify file or directory contents</p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">x (1) = Execute</p>
            <p className="text-text-secondary text-xs">Run file as program or access directory</p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Convert chmod to rwx' },
        ]}
      />
    </div>
  )
}
