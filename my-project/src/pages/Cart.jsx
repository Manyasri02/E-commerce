import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext)

  if (!cart.length) return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      <Link to="/products" className="text-blue-600">Browse products</Link>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center border rounded p-4">
            <img src={item.images?.[0] || '/assets/placeholder.png'} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-gray-600">${item.price}</div>
              {item.options && (
                <div className="text-sm text-gray-500 mt-1">{item.options.size ? `Size: ${item.options.size}` : ''} {item.options.color ? ` • Color: ${item.options.color}` : ''}</div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, item.options || {}, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
              <button onClick={() => removeFromCart(item.id, item.options || {})} className="text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <div className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</div>
        <Link to="/checkout" className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded">Checkout</Link>
      </div>
    </div>
  )
}
