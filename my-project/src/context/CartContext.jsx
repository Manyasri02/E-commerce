import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setCart(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    // product may include options like size/color
    setCart(prev => {
      const matchIndex = prev.findIndex(i => i.id === product.id && JSON.stringify(i.options || {}) === JSON.stringify(product.options || {}))
      if (matchIndex > -1) {
        const next = [...prev]
        next[matchIndex] = { ...next[matchIndex], quantity: next[matchIndex].quantity + quantity }
        return next
      }
    return [...prev, { id: product.id, name: product.name || product.title, price: product.price, images: product.images, quantity, options: product.options || {} }]
    })
  }

  const removeFromCart = (id, options = {}) => {
    setCart(prev => prev.filter(i => !(i.id === id && JSON.stringify(i.options || {}) === JSON.stringify(options || {}))))
  }

  const updateQuantity = (id, options = {}, quantity) => {
    setCart(prev => prev.map(i => (i.id === id && JSON.stringify(i.options || {}) === JSON.stringify(options || {})) ? { ...i, quantity } : i))
  }

  const clearCart = () => setCart([])

  const getTotalItems = () => cart.reduce((s, i) => s + (i.quantity || 0), 0)

  const getTotalPrice = () => cart.reduce((s, i) => s + (i.quantity || 0) * (i.price || 0), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
