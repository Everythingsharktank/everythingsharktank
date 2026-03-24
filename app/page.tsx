import products from '@/data/products.json'
import ProductGrid from '@/components/ProductGrid'

export default function HomePage() {
  const dealCount = products.filter(p => p.outcome === 'deal').length
  const noDealCount = products.filter(p => p.outcome === 'no-deal').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-white">Everything </span>
          <span className="text-yellow-400">Shark Tank</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Every product that appeared on Shark Tank — the deals, the sharks, and where to buy them today.
        </p>
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
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
        </div>
      </div>

      {/* Product Grid with filters */}
      <ProductGrid products={products as any} />
    </div>
  )
}
