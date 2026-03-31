import products from '@/data/products.json'
import ProductGrid from '@/components/ProductGrid'

export default function HomePage() {
  const dealCount = products.filter(p => p.outcome === 'deal').length
  const noDealCount = products.filter(p => p.outcome === 'no-deal').length
  const totalValue = "$2.1B+"

  // Featured products for hero section
  const featured = [
    products.find(p => p.slug === 'scrub-daddy'),
    products.find(p => p.slug === 'ring'),
    products.find(p => p.slug === 'bombas'),
    products.find(p => p.slug === 'kodiak-cakes'),
  ].filter(Boolean) as typeof products

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* Hero */}
      <div className="py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🦈 The complete Shark Tank product database
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Every Product.<br/>
          <span className="text-blue-600">Every Deal.</span>
        </h1>
        <p className="text-gray-500 text-xl max-w-xl mx-auto mb-8">
          Browse all {products.length} Shark Tank products — deals, ROI data, timelines, and where to buy them today.
        </p>

        {/* Stats bar */}
        <div className="inline-flex flex-wrap justify-center gap-6 bg-gray-50 border border-gray-200 rounded-2xl px-8 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <div className="text-gray-400 text-xs uppercase tracking-wide">Products</div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{dealCount}</div>
            <div className="text-gray-400 text-xs uppercase tracking-wide">Deals Made</div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{noDealCount}</div>
            <div className="text-gray-400 text-xs uppercase tracking-wide">Rejected</div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalValue}</div>
            <div className="text-gray-400 text-xs uppercase tracking-wide">Combined Value</div>
          </div>
        </div>
      </div>

      {/* Featured row */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">🔥 Most Iconic Deals</h2>
          <span className="text-sm text-gray-400">From worst pitch to billion dollar exit</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {featured.map(p => (
            <a key={p.slug} href={`/products/${p.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all group">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-2" style={{aspectRatio:'4/3'}}>
                {(p as any).image && <img src={(p as any).image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
              </div>
              <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 truncate">{p.name}</div>
              <div className={`text-xs mt-0.5 font-semibold ${p.outcome === 'deal' ? 'text-green-600' : 'text-red-500'}`}>
                {p.outcome === 'deal' ? '✅ Deal' : '❌ No Deal'}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Shark mistakes banner */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-gray-900">🤦 Biggest Shark Mistakes</h2>
            <p className="text-gray-500 text-sm">They passed on these — then watched them become empires</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {products.filter(p => p.outcome === 'no-deal' && (
              p.currentStatus.toLowerCase().includes('billion') ||
              p.currentStatus.toLowerCase().includes('$200m') ||
              p.currentStatus.toLowerCase().includes('$630m') ||
              p.currentStatus.toLowerCase().includes('$1.2b') ||
              p.slug === 'manscaped'
            )).slice(0, 5).map(p => (
              <a key={p.slug} href={`/products/${p.slug}`}
                className="bg-white border border-red-200 hover:border-red-400 text-gray-700 hover:text-red-600 text-xs px-3 py-1.5 rounded-full transition-colors font-medium whitespace-nowrap shadow-sm">
                ❌ {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <ProductGrid products={products as any} />

      <div className="py-8" />
    </div>
  )
}
