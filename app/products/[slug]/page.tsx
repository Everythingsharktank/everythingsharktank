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
      <Link href="/" className="text-slate-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition-colors">
        ← Back to all products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: product image */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-72">
          {(product as any).image ? (
            <img
              src={(product as any).image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl">🦈</div>
          )}
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
                <div className="text-slate-500">Asked for</div>
                <div className="text-white font-medium">{product.deal.ask} for {product.deal.askEquity}</div>
              </div>
              <div>
                <div className="text-slate-500">Season / Episode</div>
                <div className="text-white font-medium">S{product.season} E{product.episode} ({product.year})</div>
              </div>
              {product.deal.amount && (
                <div>
                  <div className="text-slate-500">Final Deal</div>
                  <div className="text-green-400 font-medium">{product.deal.amount} for {product.deal.equity}</div>
                </div>
              )}
              {product.deal.investor && (
                <div>
                  <div className="text-slate-500">Investor(s)</div>
                  <div className="text-yellow-400 font-medium">{product.deal.investor}</div>
                </div>
              )}
            </div>
          </div>

          {/* Buy buttons */}
          <div className="flex flex-col gap-2">
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-center py-3 rounded-xl transition-colors"
            >
              <span>🛒</span> Buy on Amazon
            </a>
            {(product as any).websiteUrl && (
              <a
                href={(product as any).websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-slate-700 hover:bg-slate-600 text-white font-medium text-center py-3 rounded-xl transition-colors border border-slate-600"
              >
                <span>🌐</span> Official Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4">About {product.name}</h2>
        <p className="text-slate-400 leading-relaxed">{product.description}</p>
      </div>

      {/* Timeline */}
      {product.timeline && product.timeline.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-6">Company Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />
            <div className="space-y-6">
              {product.timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 pl-12">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-slate-800 border-2 border-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-400">
                    {item.year.toString().slice(2)}
                  </div>
                  <div>
                    <div className="text-yellow-400 text-sm font-semibold mb-1">{item.year}</div>
                    <div className="text-slate-300">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current status */}
      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm uppercase tracking-wide text-yellow-400 font-semibold mb-2">Where Are They Now?</h2>
        <p className="text-slate-300">{product.currentStatus}</p>
      </div>

      {/* Shark update */}
      {product.sharkUpdate && (
        <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm uppercase tracking-wide text-blue-400 font-semibold mb-2">🦈 Shark Update</h2>
          <p className="text-slate-300">{product.sharkUpdate}</p>
        </div>
      )}

      {/* YouTube embed */}
      {(product as any).youtubeId && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Watch the Pitch</h2>
          <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
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
