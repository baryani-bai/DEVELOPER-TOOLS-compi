'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { id, message, type }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'bg-bg-secondary border p-4 shadow-glow-strong flex items-center gap-4 animate-slide-in',
              {
                'border-l-4 border-l-success': toast.type === 'success',
                'border-l-4 border-l-error': toast.type === 'error',
                'border-l-4 border-l-warning': toast.type === 'warning',
                'border-l-4 border-l-info': toast.type === 'info',
                'border-border-primary': true,
              }
            )}
          >
            {/* Icon */}
            <div className="text-2xl flex-shrink-0">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✕'}
              {toast.type === 'warning' && '⚠'}
              {toast.type === 'info' && 'ℹ'}
            </div>

            {/* Message */}
            <p className="text-sm text-text-primary flex-grow">{toast.message}</p>

            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
