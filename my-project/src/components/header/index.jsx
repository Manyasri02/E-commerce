import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { WishlistContext } from '../../context/WishlistContext'
import { AuthContext } from '../../context/AuthContext'
import LoginModal from '../LoginModal'

export const Header = () => {
  const { getTotalItems } = useContext(CartContext)
  const { getCount } = useContext(WishlistContext)
  const { user, logout } = useContext(AuthContext)
  const [showLogin, setShowLogin] = useState(false)

  return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">S</div>
                        <span className="text-xl font-semibold">Shop It</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-4 text-gray-700">
                        <Link to="/products" className="hover:text-gray-900">Products</Link>
                    </nav>
                </div>

                <div className="flex-1 mx-6 hidden md:block">
                    <div className="relative">
                        <input placeholder="Search products" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                        <button className="absolute right-2 top-2 text-gray-600">🔍</button>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/wishlist" className="relative inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                        <span className="ml-2 hidden md:inline">Wishlist</span>
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{getCount()}</span>
                    </Link>
                    <Link to="/cart" className="relative inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                        <span className="ml-2 hidden md:inline">Cart</span>
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{getTotalItems()}</span>
                    </Link>

                    <Link to="#" className="hidden md:inline-block text-gray-700" onClick={() => user ? logout() : setShowLogin(true)}>
                      {user ? `${user.name} (Logout)` : 'Login'}
                    </Link>
                </div>
            </div>
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </header>
    )
}

export default Header