import React, { createContext, useState, useEffect } from 'react'

export const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        // Filter out unwanted categories (case-insensitive)
        const unwanted = ['test', 'category b', 'category_b', 'string', 'nueva categoria']
        const filtered = data.filter(cat => 
          !unwanted.includes((cat.name || '').toLowerCase())
        )
        setCategories(filtered)
      })
      .catch(err => console.error('Failed to fetch categories:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  )
}
