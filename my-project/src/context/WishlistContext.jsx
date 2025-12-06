import React, { createContext, useState, useEffect } from 'react'

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wishlist')
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load wishlist', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save wishlist', e)
    }
  }, [items])

  const isInWishlist = (id) => items.some(i => i.id === id)

  const addToWishlist = (product) => {
    setItems(prev => {
      if (prev.some(i => i.id === product.id)) return prev
      return [...prev, { id: product.id, title: product.title || product.name, price: product.price, image: product.image || (product.images && product.images[0]) }]
    })
  }

  const removeFromWishlist = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  const clearWishlist = () => setItems([])

  const getCount = () => items.length

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, getCount }}>
      {children}
    </WishlistContext.Provider>
  )
}
