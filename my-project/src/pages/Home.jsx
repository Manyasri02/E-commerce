import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setFeatured(data.slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <div>
      <section className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg p-10 mb-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">Refresh your wardrobe</h1>
            <p className="mb-4 text-lg">Discover comfortable and stylish pieces for every season. Free returns within 30 days.</p>
            <Link to="/products" className="inline-block bg-white text-sky-600 px-4 py-2 rounded font-semibold">Shop collection</Link>
          </div>
          <div className="flex-1 hidden md:block">
            <img src="/assets/hero-clothing.jpg" alt="Clothing hero" className="w-full rounded shadow-xl" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
