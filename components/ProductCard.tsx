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
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group h-full flex flex-col">

        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100" style={{aspectRatio: '16/9'}}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100">🦈</div>
          )}
          {/* Outcome badge */}
          <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full shadow ${isDeal ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {isDeal ? '✅ Deal' : '❌ No Deal'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-medium">{product.category}</span>
          <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors leading-snug">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed line-clamp-2">{product.tagline}</p>

          {/* Deal info */}
          <div className="border-t border-gray-100 pt-3 space-y-1">
            {isDeal && product.deal.investor ? (
              <>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Deal</span>
                  <span className="text-green-600 font-semibold">{product.deal.amount} for {product.deal.equity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Investor</span>
                  <span className="text-gray-700 font-medium truncate ml-2">{product.deal.investor.split(',')[0]}</span>
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-400">Asked {product.deal.ask} — no deal made</div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Season</span>
              <span className="text-gray-500">S{product.season}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
