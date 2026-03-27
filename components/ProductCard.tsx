'use client'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  slug: string
  tagline: string
  category: string
  season: number
  sharks: string[]
  deal: { ask: string; askEquity?: string; equity: string; amount: string | null; investor: string | null }
  outcome: string
  buyUrl: string
  image?: string | null
}

export default function ProductCard({ product }: { product: Product }) {
  const isDeal = product.outcome === 'deal'

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-yellow-400/60 hover:shadow-lg hover:shadow-yellow-400/5 transition-all cursor-pointer group h-full flex flex-col">

        {/* Image */}
        <div className="relative overflow-hidden bg-slate-800" style={{aspectRatio: '16/9'}}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-slate-800">🦈</div>
          )}
          {/* Outcome badge */}
          <div className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${isDeal ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
            {isDeal ? '✅ Deal' : '❌ No Deal'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          <span className="text-xs text-slate-500 uppercase tracking-wide mb-1">{product.category}</span>

          {/* Name */}
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-yellow-400 transition-colors leading-tight">{product.name}</h3>

          {/* Tagline */}
          <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed line-clamp-2">{product.tagline}</p>

          {/* Deal info */}
          <div className="border-t border-slate-800 pt-3 space-y-1">
            {isDeal && product.deal.investor ? (
              <>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Deal</span>
                  <span className="text-green-400 font-medium">{product.deal.amount} for {product.deal.equity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Investor</span>
                  <span className="text-yellow-400 font-medium truncate ml-2">{product.deal.investor.split(',')[0]}</span>
                </div>
              </>
            ) : (
              <div className="text-xs text-slate-500">Asked {product.deal.ask} for {product.deal.askEquity || product.deal.equity} — no deal</div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Season</span>
              <span className="text-slate-400">S{product.season}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
