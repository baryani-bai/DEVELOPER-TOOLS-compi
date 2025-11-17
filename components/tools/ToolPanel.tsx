import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import Button from '@/components/ui/Button'

interface ToolPanelProps {
  title: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  readOnly?: boolean
  className?: string
  children?: ReactNode
  rows?: number
}

export default function ToolPanel({
  title,
  value,
  onChange,
  onClear,
  placeholder,
  readOnly = false,
  className,
  children,
  rows = 15,
}: ToolPanelProps) {
  return (
    <div className={cn('bg-bg-secondary border border-border-primary p-6', className)}>
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-lg font-semibold text-text-primary">{title}</h3>

        {onClear && value && (
          <Button
            variant="icon"
            onClick={onClear}
            aria-label="Clear"
            title="Clear (Esc)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        )}
      </div>

      {/* Textarea */}
      {onChange && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          spellCheck={false}
          className={cn(
            'w-full bg-bg-tertiary text-text-primary font-mono text-sm p-4',
            'border border-border-primary resize-y',
            'focus:outline-none focus:border-accent-primary focus:shadow-glow',
            'placeholder:text-text-tertiary placeholder:italic',
            'transition-all duration-150',
            readOnly && 'cursor-default'
          )}
        />
      )}

      {/* Children (for options, buttons, etc.) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
