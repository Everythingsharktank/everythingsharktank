import products from '@/data/products.json'
import ProductGrid from '@/components/ProductGrid'

export default function HomePage() {
  const dealCount = products.filter(p => p.outcome === 'deal').length
  const noDealCount = products.filter(p => p.outcome === 'no-deal').length
  const categories = Array.from(new Set(products.map(p => p.category))).length

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-white">Everything </span>
          <span className="text-yellow-400">Shark Tank</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Every product that appeared on Shark Tank — the deals, the sharks, the timelines, and where to buy them today.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{products.length}</div>
            <div className="text-slate-500 text-sm mt-1">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{dealCount}</div>
            <div className="text-slate-500 text-sm mt-1">Deals Made</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">{noDealCount}</div>
            <div className="text-slate-500 text-sm mt-1">No Deals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{categories}</div>
            <div className="text-slate-500 text-sm mt-1">Categories</div>
          </div>
        </div>
      </div>

      {/* Famous No Deals that Succeeded banner */}
      <div className="mb-10 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-3">🦈 Famous Shark Mistakes</h2>
        <p className="text-slate-400 text-sm mb-4">The sharks passed on these — and they became massive successes anyway.</p>
        <div className="flex flex-wrap gap-2">
          {products.filter(p => p.outcome === 'no-deal' && p.currentStatus.toLowerCase().includes('million') || p.outcome === 'no-deal' && p.currentStatus.toLowerCase().includes('billion') || p.outcome === 'no-deal' && p.currentStatus.toLowerCase().includes('acquired')).slice(0, 6).map(p => (
            <a key={p.slug} href={`/products/${p.slug}`} className="bg-slate-800 hover:bg-slate-700 border border-red-500/30 text-slate-300 hover:text-white text-sm px-3 py-1.5 rounded-full transition-colors">
              ❌ {p.name}
            </a>
          ))}
        </div>
      </div>

      {/* Product Grid with filters */}
      <ProductGrid products={products as any} />
    </div>
  )
}
