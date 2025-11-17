interface KeyboardHintProps {
  shortcuts: Array<{ keys: string; action: string }>
}

export default function KeyboardHint({ shortcuts }: KeyboardHintProps) {
  const isMac = typeof window !== 'undefined' && /Mac/.test(navigator.platform)
  const cmdKey = isMac ? '⌘' : 'Ctrl'

  return (
    <div className="mt-6 p-4 bg-bg-tertiary border border-border-primary">
      <p className="text-xs font-mono text-text-tertiary mb-2">KEYBOARD SHORTCUTS</p>
      <div className="flex flex-wrap gap-4">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center gap-2">
            <kbd className="px-2 py-1 text-xs font-mono bg-bg-primary border border-border-primary text-accent-primary">
              {shortcut.keys.replace('Ctrl', cmdKey)}
            </kbd>
            <span className="text-xs text-text-secondary">{shortcut.action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
