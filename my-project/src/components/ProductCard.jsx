import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'
import { ToastContext } from '../context/ToastContext'

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext)
  const { addToast } = useContext(ToastContext)

  const handleAddClick = () => {
    addToCart(product, 1)
    addToast(`Added 1 "${product.title || product.name}" to cart`, 'success', 2000)
  }

  return (
    <article className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {product.badge && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">{product.badge}</div>
      )}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
        className={`absolute top-3 right-3 bg-white rounded-full p-1 shadow heart-btn ${isInWishlist(product.id) ? 'active text-red-500' : 'text-gray-400'}`}
        aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {/* Heart SVG: filled when in wishlist */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <Link to={`/products/${product.id}`} className="block">
        <img src={product.images?.[0] || product.image || '/assets/placeholder.png'} alt={product.name || product.title} className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.name || product.title}</h3>
          <p className="text-gray-500 text-sm mb-3">{(product.description || product.title || '').slice(0, 80)}</p>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">${product.price}</div>
            <button onClick={(e) => { e.preventDefault(); handleAddClick() }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2">
              <span>Add</span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  )
}
