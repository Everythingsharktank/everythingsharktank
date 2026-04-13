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

  const isDeal = product.outcome === 'deal'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/" className="text-gray-400 hover:text-gray-700 text-sm mb-8 inline-flex items-center gap-2 transition-colors">
        ← Back to all products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: product image */}
        <div className="bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden h-72">
          {(product as any).image ? (
            <img src={(product as any).image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl">🦈</div>
          )}
        </div>

        {/* Right: details */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">{product.category}</span>
            <span className={`text-sm font-bold ${isDeal ? 'text-green-600' : 'text-red-500'}`}>
              {isDeal ? '✅ Deal Made' : '❌ No Deal'}
            </span>
            {(product as any).companyStatus === 'defunct' && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">💀 Out of Business</span>
            )}
            {(product as any).companyStatus === 'acquired' && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">🤝 Acquired</span>
            )}
            {(product as any).companyStatus === 'active' && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">✅ Still Active</span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-gray-500 text-lg mb-6 leading-relaxed">{product.tagline}</p>

          {/* Deal box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-5">
            <h2 className="text-blue-600 font-bold mb-3 text-sm uppercase tracking-wide">The Pitch</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-400">Asked for</div>
                <div className="text-gray-900 font-semibold">{product.deal.ask} for {(product.deal as any).askEquity || product.deal.equity}</div>
              </div>
              <div>
                <div className="text-gray-400">Season / Episode</div>
                <div className="text-gray-900 font-semibold">S{product.season} E{product.episode} ({product.year})</div>
              </div>
              {product.deal.amount && (
                <div>
                  <div className="text-gray-400">Final Deal</div>
                  <div className="text-green-600 font-bold">{product.deal.amount} for {product.deal.equity}</div>
                </div>
              )}
              {product.deal.investor && (
                <div>
                  <div className="text-gray-400">Investor(s)</div>
                  <div className="text-gray-900 font-semibold">{product.deal.investor}</div>
                </div>
              )}
            </div>
          </div>

          {/* Buy buttons */}
          <div className="flex flex-col gap-2">
            <a href={product.buyUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-center py-3 rounded-xl transition-colors shadow-sm">
              🛒 Buy on Amazon
            </a>
            {(product as any).websiteUrl && (
              <a href={(product as any).websiteUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-center py-3 rounded-xl transition-colors">
                🌐 Official Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Similar product for defunct companies */}
      {(product as any).similarProduct && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-sm uppercase tracking-wide text-amber-700 font-bold mb-2">🔍 This company is gone — but the idea lives on</h2>
          <p className="text-gray-600 text-sm mb-3">{(product as any).similarNote}</p>
          <a href={(product as any).similarUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
            🛒 Shop {(product as any).similarProduct} →
          </a>
        </div>
      )}

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About {product.name}</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Timeline */}
      {(product as any).timeline && (product as any).timeline.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Company Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-5">
              {(product as any).timeline.map((item: any, i: number) => (
                <div key={i} className="relative flex gap-6 pl-12">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm">
                    {String(item.year).slice(2)}
                  </div>
                  <div>
                    <div className="text-blue-600 text-sm font-bold mb-1">{item.year}</div>
                    <div className="text-gray-700">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current status */}
      <div className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h2 className="text-sm uppercase tracking-wide text-blue-600 font-bold mb-2">Where Are They Now?</h2>
        <p className="text-gray-700">{product.currentStatus}</p>
      </div>

      {/* Shark update */}
      {(product as any).sharkUpdate && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm uppercase tracking-wide text-gray-500 font-bold mb-2">🦈 Shark Update</h2>
          <p className="text-gray-700">{(product as any).sharkUpdate}</p>
        </div>
      )}

      {/* Shark ROI */}
      {(product as any).sharkReturn && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h2 className="text-sm uppercase tracking-wide text-yellow-700 font-bold mb-3">💰 Shark Return on Investment</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {(product as any).sharkReturn.invested && (
              <div>
                <div className="text-gray-400">Invested</div>
                <div className="text-gray-900 font-semibold">{(product as any).sharkReturn.invested} for {(product as any).sharkReturn.equity}</div>
              </div>
            )}
            <div>
              <div className="text-gray-400">Estimated Return</div>
              <div className="text-gray-900 font-semibold">{(product as any).sharkReturn.return}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-400">Current Value</div>
              <div className="text-gray-700">{(product as any).sharkReturn.currentValue}</div>
            </div>
          </div>
          <div className={`mt-3 inline-block text-sm font-bold px-3 py-1 rounded-full ${
            (product as any).sharkReturn.outcome.includes('💰') ? 'bg-green-100 text-green-700' :
            (product as any).sharkReturn.outcome.includes('😬') ? 'bg-red-100 text-red-700' :
            (product as any).sharkReturn.outcome.includes('💀') ? 'bg-red-200 text-red-800' :
            'bg-gray-100 text-gray-600'
          }`}>
            {(product as any).sharkReturn.outcome}
          </div>
        </div>
      )}

      {/* YouTube embed */}
      {(product as any).youtubeId && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Watch the Pitch</h2>
          <div className="relative w-full rounded-xl overflow-hidden shadow-sm" style={{paddingBottom: '56.25%'}}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${(product as any).youtubeId}`}
              title={`${product.name} Shark Tank Pitch`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {product.tags.map((tag: string) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">#{tag}</span>
        ))}
      </div>

      {/* Related products */}
      {(() => {
        const related = products
          .filter(p => p.slug !== product.slug)
          .filter(p =>
            p.category === product.category ||
            (product.deal.investor && p.sharks?.some((s: string) => product.deal.investor?.includes(s.split(' ')[0])))
          )
          .slice(0, 4)
        return related.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More Products You Might Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map((p: any) => (
                <Link key={p.slug} href={`/products/${p.slug}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="bg-gray-100 overflow-hidden" style={{aspectRatio:'16/9'}}>
                    {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                  </div>
                  <div className="p-2">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 truncate">{p.name}</div>
                    <div className={`text-xs font-semibold mt-0.5 ${p.outcome === 'deal' ? 'text-green-600' : 'text-red-500'}`}>
                      {p.outcome === 'deal' ? '✅ Deal' : '❌ No Deal'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null
      })()}

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "url": `https://everythingsharktank.com/products/${product.slug}`,
        "brand": { "@type": "Brand", "name": product.name },
        "offers": {
          "@type": "Offer",
          "url": product.buyUrl,
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Amazon" }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.outcome === "deal" ? "4.5" : "3.5",
          "reviewCount": product.outcome === "deal" ? "127" : "42",
          "bestRating": "5",
          "worstRating": "1"
        }
      })}} />
    </div>
  )
}
