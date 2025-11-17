import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

interface CardProps {
  title?: string
  description?: string
  icon?: string
  href?: string
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({
  title,
  description,
  icon,
  href,
  children,
  className,
  onClick,
}: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="text-4xl text-accent-primary mb-3 font-mono">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-mono font-semibold text-text-primary mb-2 leading-tight">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-grow">
          {description}
        </p>
      )}
      {children}
    </>
  )

  const cardClasses = cn(
    'bg-bg-secondary border border-border-primary p-5 transition-all duration-200 flex flex-col h-full',
    'hover:border-accent-primary hover:shadow-glow hover:scale-[1.02]',
    'focus:outline-none focus:border-accent-primary focus:shadow-glow',
    className
  )

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(cardClasses, 'cursor-pointer')}>
        {content}
      </button>
    )
  }

  return <div className={cardClasses}>{content}</div>
}
