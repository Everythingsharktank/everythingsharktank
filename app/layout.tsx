import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Everything Shark Tank — Products, Deals & Where to Buy',
  description: 'Browse every product from Shark Tank. See the deals, the sharks, and where to buy them today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🦈</span>
              <span className="font-bold text-xl text-gray-900">Everything <span className="text-blue-600">Shark Tank</span></span>
            </a>
            <nav className="flex gap-6 text-sm text-gray-500">
              <a href="/" className="hover:text-gray-900 transition-colors font-medium">Products</a>
              <a href="/about" className="hover:text-gray-900 transition-colors font-medium">About</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 mt-20 py-8 text-center text-gray-400 text-sm bg-white">
          <p>Everything Shark Tank is a fan site. Not affiliated with ABC or Sony Pictures.</p>
        </footer>
      </body>
    </html>
  )
}
