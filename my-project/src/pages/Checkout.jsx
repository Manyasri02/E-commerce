import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: normally you'd call backend / create payment session
    setSubmitted(true)
    clearCart()
  }

  if (submitted) return <div className="text-center py-12"><h2 className="text-2xl font-bold">Order placed</h2><p className="mt-2">Thank you! This is a demo checkout.</p></div>

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full name</label>
          <input required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">City</label>
          <input required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="text-right">
          <div className="text-lg font-bold mb-2">Total: ${getTotalPrice().toFixed(2)}</div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Place order (demo)</button>
        </div>
      </form>
    </div>
  )
}
