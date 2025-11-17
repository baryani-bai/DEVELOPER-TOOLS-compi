import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-mono font-semibold uppercase tracking-wide transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Primary button (neon green background)
          'bg-accent-primary text-black px-8 py-4 hover:bg-accent-dim hover:shadow-glow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-black':
            variant === 'primary',

          // Secondary button (ghost/outline)
          'bg-transparent text-accent-primary border-2 border-accent-primary px-8 py-4 hover:bg-accent-primary hover:text-black hover:shadow-glow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-black':
            variant === 'secondary',

          // Icon button
          'bg-transparent text-text-secondary border border-border-primary w-11 h-11 flex items-center justify-center hover:text-accent-primary hover:border-accent-primary hover:shadow-glow active:scale-95':
            variant === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
