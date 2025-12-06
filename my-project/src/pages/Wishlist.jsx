import React, { useContext } from 'react'
import { WishlistContext } from '../context/WishlistContext'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  const { items, removeFromWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const moveToCart = (item) => {
    // Build a product object compatible with CartContext expectations
    const product = {
      id: item.id,
      name: item.title,
      title: item.title,
      price: item.price,
      images: item.image ? [item.image] : []
    }
    addToCart(product, 1)
    removeFromWishlist(item.id)
  }

  if (!items.length) return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
      <Link to="/products" className="text-blue-600">Browse products</Link>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="border rounded p-4">
            <img src={item.image || '/assets/placeholder.png'} className="w-full h-48 object-cover mb-3" />
            <div className="font-semibold">{item.title}</div>
            <div className="text-gray-600 mb-3">${item.price}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => moveToCart(item)} className="bg-primary text-white px-3 py-1 rounded">Move to cart</button>
                <button onClick={() => removeFromWishlist(item.id)} className="text-red-600">Remove</button>
              </div>
              <Link to={`/products/${item.id}`} className="text-blue-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
