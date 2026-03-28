import products from '@/data/products.json'
import ProductGrid from '@/components/ProductGrid'

export default function HomePage() {
  const dealCount = products.filter(p => p.outcome === 'deal').length
  const noDealCount = products.filter(p => p.outcome === 'no-deal').length
  const categories = Array.from(new Set(products.map(p => p.category))).length

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-3 text-gray-900">
          Everything <span className="text-blue-600">Shark Tank</span>
        </h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto">
          Every product that appeared on Shark Tank — the deals, the sharks, and where to buy them today.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{products.length}</div>
            <div className="text-gray-400 text-sm mt-1">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{dealCount}</div>
            <div className="text-gray-400 text-sm mt-1">Deals Made</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">{noDealCount}</div>
            <div className="text-gray-400 text-sm mt-1">No Deals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">{categories}</div>
            <div className="text-gray-400 text-sm mt-1">Categories</div>
          </div>
        </div>
      </div>

      {/* Famous Shark Mistakes */}
      <div className="mb-8 bg-red-50 border border-red-100 rounded-2xl p-5">
        <h2 className="text-base font-bold text-gray-900 mb-1">🦈 Biggest Shark Mistakes</h2>
        <p className="text-gray-500 text-sm mb-3">The sharks passed on these — and they became massive anyway.</p>
        <div className="flex flex-wrap gap-2">
          {products.filter(p => p.outcome === 'no-deal' && (
            p.currentStatus.toLowerCase().includes('million') ||
            p.currentStatus.toLowerCase().includes('billion') ||
            p.currentStatus.toLowerCase().includes('acquired')
          )).slice(0, 6).map(p => (
            <a key={p.slug} href={`/products/${p.slug}`}
              className="bg-white border border-red-200 hover:border-red-400 text-gray-700 hover:text-red-600 text-sm px-3 py-1.5 rounded-full transition-colors font-medium">
              ❌ {p.name}
            </a>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products as any} />
    </div>
  )
}
