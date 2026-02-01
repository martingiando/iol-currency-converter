import { memo } from 'react'

interface ErrorAlertProps {
  title: string
  message: string
  onRetry?: () => void
}

export const ErrorAlert = memo(({ title, message, onRetry }: ErrorAlertProps) => (
  <div className="rounded-lg border border-red-300 bg-red-50 p-4">
    <h3 className="font-semibold text-red-800">{title}</h3>
    <p className="mt-1 text-sm text-red-600">{message}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="btn-error">
        Try again
      </button>
    )}
  </div>
))

ErrorAlert.displayName = 'ErrorAlert'
