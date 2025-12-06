import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
  <div className="mb-2">© {new Date().getFullYear()} Shop It. All rights reserved.</div>
        <div className="text-sm">Built with Tailwind — UI inspired by UI Light.</div>
      </div>
    </footer>
  )
}
