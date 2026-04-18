'use client'

import { useState, useCallback } from 'react'

interface Toast {
  message: string
  type: 'success' | 'error'
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)

  const show = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const ToastEl = toast ? (
    <div className={`admin-toast admin-toast--${toast.type}`}>{toast.message}</div>
  ) : null

  return { show, ToastEl }
}