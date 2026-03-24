import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Everything Shark Tank — Products, Deals & Where to Buy',
  description: 'Browse every product from Shark Tank. See the deals, the sharks, and where to buy them today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <header className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🦈</span>
              <span className="font-bold text-xl text-white">Everything <span className="text-yellow-400">Shark Tank</span></span>
            </a>
            <nav className="flex gap-6 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition-colors">Products</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-slate-800 mt-20 py-8 text-center text-slate-500 text-sm">
          <p>Everything Shark Tank is a fan site. Not affiliated with ABC or Sony Pictures.</p>
        </footer>
      </body>
    </html>
  )
}
