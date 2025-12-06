import React, { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

export default function Toast() {
  const { toasts, removeToast } = useContext(ToastContext)

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded shadow-lg text-white animate-pulse ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-4 text-xl">×</button>
          </div>
        </div>
      ))}
    </div>
  )
}
