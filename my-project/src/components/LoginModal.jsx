import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ToastContext } from '../context/ToastContext'

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      addToast('Login successful!', 'success')
      setEmail('')
      setPassword('')
      onClose()
    } else {
      addToast('Please enter email and password', 'error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Login</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            <button type="button" onClick={onClose} className="flex-1 border rounded px-4 py-2">Cancel</button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600">Demo: Use any email/password</div>
      </div>
    </div>
  )
}
