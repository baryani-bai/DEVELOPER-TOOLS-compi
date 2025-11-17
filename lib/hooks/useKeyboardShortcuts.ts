import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  handler: () => void
  description?: string
}

/**
 * Hook for handling keyboard shortcuts
 * Supports both Ctrl (Windows/Linux) and Cmd (Mac)
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlOrMetaMatch =
          shortcut.ctrlKey || shortcut.metaKey
            ? e.ctrlKey || e.metaKey
            : true
        const shiftMatch = shortcut.shiftKey ? e.shiftKey : !e.shiftKey
        const altMatch = shortcut.altKey ? e.altKey : !e.altKey

        if (keyMatch && ctrlOrMetaMatch && shiftMatch && altMatch) {
          e.preventDefault()
          shortcut.handler()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

/**
 * Get display name for keyboard shortcut
 */
export function getShortcutDisplay(key: string, withModifier: boolean = true): string {
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)
  const modifier = withModifier ? (isMac ? '⌘' : 'Ctrl') : ''

  const keyMap: Record<string, string> = {
    Enter: '↵',
    Escape: 'Esc',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
  }

  const displayKey = keyMap[key] || key.toUpperCase()
  return withModifier ? `${modifier}+${displayKey}` : displayKey
}
