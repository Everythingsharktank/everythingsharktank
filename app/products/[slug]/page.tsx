import products from '@/data/products.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Product = typeof products[0]

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Shark Tank Deal | Everything Shark Tank`,
    description: product.tagline,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug) as Product | undefined
  if (!product) notFound()

  const outcomeColor = product.outcome === 'deal' ? 'text-green-400' : 'text-red-400'
  const outcomeLabel = product.outcome === 'deal' ? '✅ Deal Made' : '❌ No Deal'

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back */}
      <Link href="/" className="text-slate-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition-colors">
        ← Back to all products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: image placeholder */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center h-72 text-7xl">
          🦈
        </div>

        {/* Right: details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{product.category}</span>
            <span className={`text-sm font-medium ${outcomeColor}`}>{outcomeLabel}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">{product.name}</h1>
          <p className="text-slate-400 text-lg mb-6">{product.tagline}</p>

          {/* Deal box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
            <h2 className="text-yellow-400 font-semibold mb-3 text-sm uppercase tracking-wide">The Pitch</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-slate-500">Ask</div>
                <div className="text-white font-medium">{product.deal.ask}</div>
              </div>
              <div>
                <div className="text-slate-500">Equity Offered</div>
                <div className="text-white font-medium">{product.deal.equity}</div>
              </div>
              {product.deal.amount && (
                <div>
                  <div className="text-slate-500">Deal Amount</div>
                  <div className="text-green-400 font-medium">{product.deal.amount}</div>
                </div>
              )}
              {product.deal.investor && (
                <div>
                  <div className="text-slate-500">Investor(s)</div>
                  <div className="text-yellow-400 font-medium">{product.deal.investor}</div>
                </div>
              )}
              <div>
                <div className="text-slate-500">Season / Episode</div>
                <div className="text-white font-medium">S{product.season} E{product.episode}</div>
              </div>
              <div>
                <div className="text-slate-500">Year</div>
                <div className="text-white font-medium">{product.year}</div>
              </div>
            </div>
          </div>

          {/* Buy button */}
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-center py-3 rounded-xl transition-colors"
          >
            Buy on Amazon →
          </a>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4">About {product.name}</h2>
        <p className="text-slate-400 leading-relaxed">{product.description}</p>
      </div>

      {/* Current status */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm uppercase tracking-wide text-yellow-400 font-semibold mb-2">Where Are They Now?</h2>
        <p className="text-slate-300">{product.currentStatus}</p>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {product.tags.map(tag => (
          <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">#{tag}</span>
        ))}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "url": `https://everythingsharktank.com/products/${product.slug}`,
          })
        }}
      />
    </div>
  )
}
