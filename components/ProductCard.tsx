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
  companyStatus?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const isDeal = product.outcome === 'deal'
  const statusColor = product.companyStatus === 'defunct' ? 'bg-red-100 text-red-600' :
                      product.companyStatus === 'acquired' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
  const statusLabel = product.companyStatus === 'defunct' ? '💀 Gone' :
                      product.companyStatus === 'acquired' ? '🤝 Acquired' : '✅ Active'

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group h-full flex flex-col shadow-sm">

        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50" style={{aspectRatio:'16/9'}}>
          {product.image ? (
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">🦈</div>
          )}
          {/* Season badge */}
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            S{product.season}
          </div>
          {/* Deal badge */}
          <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ${isDeal ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {isDeal ? '✅ Deal' : '❌ No Deal'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category + Status */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.category}</span>
            {product.companyStatus && (
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${statusColor}`}>{statusLabel}</span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>

          {/* Tagline */}
          <p className="text-gray-400 text-xs mb-3 flex-grow line-clamp-2 leading-relaxed">{product.tagline}</p>

          {/* Deal details */}
          <div className="border-t border-gray-100 pt-2.5 space-y-1">
            {isDeal && product.deal.amount ? (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Asked</span>
                <span className="text-gray-500">{product.deal.ask}</span>
              </div>
            ) : null}
            {isDeal && product.deal.investor ? (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Got</span>
                <span className="text-green-600 font-semibold">{product.deal.amount} / {product.deal.equity}</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">Asked {product.deal.ask} · No deal</div>
            )}
            {isDeal && product.deal.investor && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Investor</span>
                <span className="text-gray-700 font-medium truncate ml-2 max-w-[60%]">{product.deal.investor.split(',')[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
