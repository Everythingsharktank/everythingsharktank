import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Everything Shark Tank — Every Product, Deal & Where to Buy',
  description: 'The complete Shark Tank product database. Browse all 88 products — deals, ROI data, shark investors, timelines, and where to buy them today. From Season 1 to now.',
  keywords: 'shark tank products, shark tank deals, shark tank where are they now, shark tank season 1, scrub daddy, bombas, ring doorbell shark tank, shark tank buy',
  openGraph: {
    title: 'Everything Shark Tank — Every Product, Deal & Where to Buy',
    description: 'Browse all 88 Shark Tank products. Deals, ROI data, timelines, and buy links.',
    url: 'https://everythingsharktank.com',
    siteName: 'Everything Shark Tank',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Everything Shark Tank',
    description: 'Browse all 88 Shark Tank products — deals, ROI data, and where to buy.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://everythingsharktank.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QR237Z35TW" />
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QR237Z35TW');
        `}} />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🦈</span>
              <div>
                <span className="font-black text-lg text-gray-900 tracking-tight">Everything</span>
                <span className="font-black text-lg text-blue-600 tracking-tight"> Shark Tank</span>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <nav className="hidden sm:flex gap-5 text-sm text-gray-500">
                <a href="/" className="hover:text-gray-900 transition-colors font-medium">Products</a>
                <a href="/seasons" className="hover:text-gray-900 transition-colors font-medium">By Season</a>
                <a href="/about" className="hover:text-gray-900 transition-colors font-medium">About</a>
              </nav>
              <a href="https://www.tiktok.com/@everythingsharktan" target="_blank" rel="noopener noreferrer"
                className="text-xs bg-black text-white px-3 py-1.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Follow on TikTok
              </a>
            </div>
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
