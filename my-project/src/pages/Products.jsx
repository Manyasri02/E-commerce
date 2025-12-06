import React, { useEffect, useState, useContext } from 'react'
import ProductCard from '../components/ProductCard'
import { CategoriesContext } from '../context/CategoriesContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { categories } = useContext(CategoriesContext)

  useEffect(() => {
    setLoading(true)
    const url = selectedCategory 
      ? `https://api.escuelajs.co/api/v1/products/?categoryId=${selectedCategory}`
      : 'https://api.escuelajs.co/api/v1/products'
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setLoading(false))
  }, [selectedCategory])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      {categories.length > 0 && (
        <div className="mb-6">
          <label className="block mb-2 font-medium">Filter by Category</label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <div>Loading products…</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
