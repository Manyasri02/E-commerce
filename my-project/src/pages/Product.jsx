import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext)

  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setMainImage(data.images?.[0] || data.image || null)
        setSize((data.sizes && data.sizes[0]) || '')
        setColor((data.colors && data.colors[0]) || (data.color && data.color) || '')
        // fetch related products (simple approach)
        fetch('https://api.escuelajs.co/api/v1/products')
          .then(r => r.json())
          .then(list => setRelated(list.filter(p => p.id !== data.id).slice(0, 2)))
          .catch(() => {})
      })
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>Loading product…</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!product) return <div>Product not found</div>

  const handleAdd = () => {
    const item = { ...product, options: { size: size || null, color: color || null } }
    addToCart(item, Number(quantity))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="bg-white rounded shadow p-4">
          <img src={mainImage || '/assets/placeholder.png'} alt={product.name || product.title} className="w-full h-96 object-cover rounded mb-4" />
          <div className="flex gap-3">
            {(product.images || (product.image ? [product.image] : []) || []).map((img, i) => (
              <button key={i} onClick={() => setMainImage(img)} className="w-20 h-20 rounded overflow-hidden border">
                <img src={img} alt={`${product.name}-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
  <h1 className="text-3xl font-bold mb-2">{product.name || product.title}</h1>
        <div className="text-2xl font-semibold mb-4">${product.price}</div>
  <p className="text-gray-700 mb-4">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Size</label>
            <div className="flex gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 border rounded ${size === s ? 'bg-primary text-white' : 'bg-white'}`}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {(product.colors && product.colors.length > 0) && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Color</label>
            <div className="flex gap-2 items-center">
              {product.colors.map(c => (
                <button key={c} onClick={() => setColor(c)} title={c} className={`w-8 h-8 rounded-full border ${color === c ? 'ring-2 ring-primary' : ''}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Quantity</label>
          <input type="number" min="1" max={product.stock || 999} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-24 border rounded px-2 py-1" />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded">Add to cart</button>
          <button onClick={() => toggleWishlist(product)} className="px-3 py-2 border rounded">
            {isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          </button>
          <div className="text-sm text-gray-600">Stock: {product.stock}</div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Related products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
