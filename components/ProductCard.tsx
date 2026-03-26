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
  deal: { ask: string; equity: string; amount: string | null; investor: string | null }
  outcome: string
  buyUrl: string
  image?: string | null
}

export default function ProductCard({ product }: { product: Product }) {
  const outcomeColor = product.outcome === 'deal' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
  const outcomeLabel = product.outcome === 'deal' ? '✅ Deal Made' : '❌ No Deal'

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-yellow-400/50 hover:bg-slate-800/80 transition-all cursor-pointer group h-full flex flex-col">
        {/* Category + Outcome */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{product.category}</span>
          <span className={`text-xs border px-2 py-1 rounded-full ${outcomeColor}`}>{outcomeLabel}</span>
        </div>

        {/* Product image */}
        <div className="bg-slate-800 rounded-lg h-36 mb-4 overflow-hidden relative">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl group-hover:bg-slate-700 transition-colors">🦈</div>
          )}
        </div>

        {/* Name + tagline */}
        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-yellow-400 transition-colors">{product.name}</h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow">{product.tagline}</p>

        {/* Deal info */}
        <div className="border-t border-slate-800 pt-3 mt-auto">
          {product.outcome === 'deal' && product.deal.investor ? (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Investor</span>
              <span className="text-yellow-400 font-medium">{product.deal.investor.split(',')[0]}</span>
            </div>
          ) : (
            <div className="text-sm text-slate-500">Asked: {product.deal.ask} for {product.deal.equity}</div>
          )}
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-slate-400">Season</span>
            <span className="text-slate-300">S{product.season}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
