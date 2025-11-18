'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import {
  parseSemanticVersion,
  compareSemanticVersions,
  isValidSemanticVersion,
  incrementVersion,
} from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function SemanticVersionChecker() {
  const [version1, setVersion1] = useState('')
  const [version2, setVersion2] = useState('')
  const [compareResult, setCompareResult] = useState<string | null>(null)
  const [incrementVersion1, setIncrementVersion1] = useState('')
  const { showToast } = useToast()

  const handleCompare = () => {
    if (!version1.trim() || !version2.trim()) {
      showToast('Please enter both versions', 'error')
      return
    }

    if (!isValidSemanticVersion(version1)) {
      showToast('Version 1 is not valid semantic version', 'error')
      return
    }

    if (!isValidSemanticVersion(version2)) {
      showToast('Version 2 is not valid semantic version', 'error')
      return
    }

    try {
      const result = compareSemanticVersions(version1, version2)
      if (result < 0) {
        setCompareResult(`${version1} < ${version2}`)
      } else if (result > 0) {
        setCompareResult(`${version1} > ${version2}`)
      } else {
        setCompareResult(`${version1} = ${version2}`)
      }
      showToast('Comparison complete!', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Comparison failed', 'error')
    }
  }

  const handleIncrement = (type: 'major' | 'minor' | 'patch') => {
    if (!incrementVersion1.trim()) {
      showToast('Please enter a version to increment', 'error')
      return
    }

    if (!isValidSemanticVersion(incrementVersion1)) {
      showToast('Invalid semantic version format', 'error')
      return
    }

    try {
      const newVersion = incrementVersion(incrementVersion1, type)
      setIncrementVersion1(newVersion)
      showToast(`Incremented ${type} version!`, 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Increment failed', 'error')
    }
  }

  const handleClear = () => {
    setVersion1('')
    setVersion2('')
    setCompareResult(null)
    setIncrementVersion1('')
  }

  const handleSwap = () => {
    const temp = version1
    setVersion1(version2)
    setVersion2(temp)
    setCompareResult(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleCompare, description: 'Compare' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  const parsed1 = version1 ? parseSemanticVersion(version1) : null
  const parsed2 = version2 ? parseSemanticVersion(version2) : null
  const parsedIncrement = incrementVersion1 ? parseSemanticVersion(incrementVersion1) : null

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Compare Versions
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">
              Version 1
            </label>
            <input
              type="text"
              value={version1}
              onChange={(e) => {
                setVersion1(e.target.value)
                setCompareResult(null)
              }}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
              placeholder="1.2.3 or 2.0.0-beta+build.123"
            />
            {parsed1 && (
              <div className="mt-2 text-xs font-mono text-green-400 bg-bg-tertiary border border-green-400 p-2">
                ✓ Valid - Major: {parsed1.major}, Minor: {parsed1.minor}, Patch: {parsed1.patch}
                {parsed1.prerelease && `, Prerelease: ${parsed1.prerelease}`}
                {parsed1.build && `, Build: ${parsed1.build}`}
              </div>
            )}
            {version1 && !parsed1 && (
              <div className="mt-2 text-xs font-mono text-red-400 bg-bg-tertiary border border-red-400 p-2">
                ✗ Invalid semantic version format
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">
              Version 2
            </label>
            <input
              type="text"
              value={version2}
              onChange={(e) => {
                setVersion2(e.target.value)
                setCompareResult(null)
              }}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
              placeholder="1.2.3 or 2.0.0-beta+build.123"
            />
            {parsed2 && (
              <div className="mt-2 text-xs font-mono text-green-400 bg-bg-tertiary border border-green-400 p-2">
                ✓ Valid - Major: {parsed2.major}, Minor: {parsed2.minor}, Patch: {parsed2.patch}
                {parsed2.prerelease && `, Prerelease: ${parsed2.prerelease}`}
                {parsed2.build && `, Build: ${parsed2.build}`}
              </div>
            )}
            {version2 && !parsed2 && (
              <div className="mt-2 text-xs font-mono text-red-400 bg-bg-tertiary border border-red-400 p-2">
                ✗ Invalid semantic version format
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="primary" onClick={handleCompare}>
              Compare
            </Button>
            <Button variant="secondary" onClick={handleSwap}>
              Swap
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        {compareResult && (
          <div className="mt-4 bg-bg-tertiary border border-accent-primary p-4">
            <p className="text-sm font-mono text-text-secondary mb-2">Comparison Result:</p>
            <p className="text-2xl font-mono font-bold text-accent-primary">{compareResult}</p>
          </div>
        )}
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          Increment Version
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-2">
              Current Version
            </label>
            <input
              type="text"
              value={incrementVersion1}
              onChange={(e) => setIncrementVersion1(e.target.value)}
              className="w-full bg-bg-tertiary border border-border-primary p-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary"
              placeholder="1.2.3"
            />
            {parsedIncrement && (
              <div className="mt-2 text-xs font-mono text-green-400 bg-bg-tertiary border border-green-400 p-2">
                ✓ Valid - Major: {parsedIncrement.major}, Minor: {parsedIncrement.minor}, Patch: {parsedIncrement.patch}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="primary" onClick={() => handleIncrement('major')}>
              Increment Major
            </Button>
            <Button variant="primary" onClick={() => handleIncrement('minor')}>
              Increment Minor
            </Button>
            <Button variant="primary" onClick={() => handleIncrement('patch')}>
              Increment Patch
            </Button>
          </div>

          {parsedIncrement && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-bg-tertiary border border-border-primary p-3">
                <p className="text-xs font-mono text-text-secondary mb-1">Major Bump:</p>
                <p className="text-lg font-mono text-accent-primary">
                  {parsedIncrement.major + 1}.0.0
                </p>
              </div>
              <div className="bg-bg-tertiary border border-border-primary p-3">
                <p className="text-xs font-mono text-text-secondary mb-1">Minor Bump:</p>
                <p className="text-lg font-mono text-accent-primary">
                  {parsedIncrement.major}.{parsedIncrement.minor + 1}.0
                </p>
              </div>
              <div className="bg-bg-tertiary border border-border-primary p-3">
                <p className="text-xs font-mono text-text-secondary mb-1">Patch Bump:</p>
                <p className="text-lg font-mono text-accent-primary">
                  {parsedIncrement.major}.{parsedIncrement.minor}.{parsedIncrement.patch + 1}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          About Semantic Versioning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📋 Format: MAJOR.MINOR.PATCH</p>
            <p className="text-text-secondary">
              1.2.3 means Major=1, Minor=2, Patch=3
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔼 MAJOR Version</p>
            <p className="text-text-secondary">
              Increment for incompatible API changes (breaking changes)
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">➕ MINOR Version</p>
            <p className="text-text-secondary">
              Increment for backwards-compatible new features
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔧 PATCH Version</p>
            <p className="text-text-secondary">
              Increment for backwards-compatible bug fixes
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🏷️ Prerelease Tags</p>
            <p className="text-text-secondary">
              1.0.0-alpha, 1.0.0-beta.1, 1.0.0-rc.2
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔨 Build Metadata</p>
            <p className="text-text-secondary">
              1.0.0+build.123, 1.0.0-beta+sha.5114f85
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📊 Comparison Rules</p>
            <p className="text-text-secondary">
              Compare major, then minor, then patch. Prerelease &lt; stable
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Use Cases</p>
            <p className="text-text-secondary">
              NPM packages, API versioning, software releases
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Compare' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
