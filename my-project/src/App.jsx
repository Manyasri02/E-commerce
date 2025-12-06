
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import { CategoriesProvider } from './context/CategoriesContext'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AuthProvider>
          <CategoriesProvider>
            <ToastProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Header />
                <Toast />
              <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ToastProvider>
        </CategoriesProvider>
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
