'use client'
import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'

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
  tags: string[]
}

const SHARK_INFO: Record<string, { emoji: string; known: string; bio: string; color: string }> = {
  'Mark Cuban': {
    emoji: '💻',
    known: 'Tech & Sports',
    bio: 'Billionaire owner of the Dallas Mavericks and tech investor. Loves disruptive tech, apps, and consumer brands. Most likely to swing big.',
    color: 'bg-blue-50 border-blue-200',
  },
  'Lori Greiner': {
    emoji: '🛍️',
    known: 'QVC Queen',
    bio: 'The Queen of QVC. Invented over 700 products. Best at consumer goods that can be demonstrated on TV. If it photographs well, she\'s in.',
    color: 'bg-pink-50 border-pink-200',
  },
  "Barbara Corcoran": {
    emoji: '🏠',
    known: 'Real Estate & Brands',
    bio: 'Built a real estate empire from a $1,000 loan. Loves underdog stories and authentic founders. Best for lifestyle and food brands.',
    color: 'bg-purple-50 border-purple-200',
  },
  "Kevin O'Leary": {
    emoji: '💰',
    known: 'Mr. Wonderful',
    bio: 'The ruthless numbers guy. Loves royalty deals and cash flow over equity. Will tell you your company is worth nothing — and mean it.',
    color: 'bg-yellow-50 border-yellow-200',
  },
  'Daymond John': {
    emoji: '👕',
    known: 'Fashion & FUBU',
    bio: 'Founded FUBU from his mother\'s house with $40. Expert in fashion, apparel, and brand building. Best for lifestyle and apparel deals.',
    color: 'bg-orange-50 border-orange-200',
  },
  'Robert Herjavec': {
    emoji: '🔐',
    known: 'Cybersecurity',
    bio: 'Cybersecurity mogul who came to Canada as a refugee. Loves tech and innovation. More patient than the other sharks — will mentor founders.',
    color: 'bg-green-50 border-green-200',
  },
}

const ALL_SHARKS = Object.keys(SHARK_INFO)
const ALL_CATEGORIES = ['All', 'Home & Kitchen', 'Apparel', 'Food & Beverage', 'Health & Wellness', 'Tech & Gadgets', 'Beauty & Skincare', 'Beauty & Hair', 'Accessories', 'Sports & Fitness', 'Smart Home', 'Automotive', 'Gifts', 'Gifts & Flowers', 'Kids & Baby', 'Pets', 'Music & Education', 'Travel', 'Tech & Apps', 'Lifestyle', 'Home & Safety']

export default function ProductGrid({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [selectedShark, setSelectedShark] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedOutcome, setSelectedOutcome] = useState('All')

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase())
      const matchShark = selectedShark === 'All' || p.sharks.some(s => s.includes(selectedShark))
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
      const matchOutcome = selectedOutcome === 'All' || p.outcome === selectedOutcome
      return matchSearch && matchShark && matchCategory && matchOutcome
    })
  }, [products, search, selectedShark, selectedCategory, selectedOutcome])

  // Stats for selected shark
  const sharkStats = useMemo(() => {
    if (selectedShark === 'All') return null
    const sharkProducts = products.filter(p => p.sharks.some(s => s.includes(selectedShark)))
    const deals = sharkProducts.filter(p => p.outcome === 'deal').length
    const total = sharkProducts.length
    return { deals, total, noDeals: total - deals }
  }, [products, selectedShark])

  // Stats for outcome filter
  const outcomeStats = useMemo(() => {
    const base = selectedShark === 'All' ? products : products.filter(p => p.sharks.some(s => s.includes(selectedShark)))
    const cat = selectedCategory === 'All' ? base : base.filter(p => p.category === selectedCategory)
    return {
      deals: cat.filter(p => p.outcome === 'deal').length,
      noDeals: cat.filter(p => p.outcome === 'no-deal').length,
    }
  }, [products, selectedShark, selectedCategory])

  const sharkInfo = selectedShark !== 'All' ? SHARK_INFO[selectedShark] : null

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="🔍  Search products, sharks, or categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
        />
        <div className="flex flex-wrap gap-2 items-center">
          {/* Shark filter with counts */}
          <div className="relative">
            <select
              value={selectedShark}
              onChange={e => setSelectedShark(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-gray-700 text-sm focus:outline-none focus:border-blue-400 shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">🦈 All Sharks</option>
              {ALL_SHARKS.map(s => {
                const count = products.filter(p => p.sharks.some(x => x.includes(s))).length
                return <option key={s} value={s}>{SHARK_INFO[s].emoji} {s} ({count})</option>
              })}
            </select>
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:border-blue-400 shadow-sm cursor-pointer"
          >
            <option value="All">📦 All Categories</option>
            {ALL_CATEGORIES.filter(c => c !== 'All').map(c => {
              const count = products.filter(p => p.category === c).length
              return <option key={c} value={c}>{c} ({count})</option>
            })}
          </select>

          {/* Outcome filter with counts */}
          <select
            value={selectedOutcome}
            onChange={e => setSelectedOutcome(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:border-blue-400 shadow-sm cursor-pointer"
          >
            <option value="All">🎯 All Outcomes ({outcomeStats.deals + outcomeStats.noDeals})</option>
            <option value="deal">✅ Deals Made ({outcomeStats.deals})</option>
            <option value="no-deal">❌ No Deals ({outcomeStats.noDeals})</option>
          </select>

          <select
            onChange={e => {
              const val = e.target.value
              setSearch(val === 'All' ? '' : val === 'defunct' ? 'out of business' : val === 'acquired' ? 'acquired' : '')
            }}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:border-blue-400 shadow-sm cursor-pointer"
          >
            <option value="All">🏢 All Companies</option>
            <option value="active">✅ Still Active</option>
            <option value="acquired">🤝 Acquired</option>
            <option value="defunct">💀 Out of Business</option>
          </select>

          <span className="text-gray-400 text-sm ml-1 font-medium">{filtered.length} products</span>
        </div>
      </div>

      {/* Shark infographic panel */}
      {sharkInfo && sharkStats && (
        <div className={`mb-6 rounded-2xl border p-5 ${sharkInfo.color}`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Shark info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{sharkInfo.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selectedShark}</h3>
                  <span className="text-sm text-gray-500">{sharkInfo.known}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{sharkInfo.bio}</p>
            </div>
            {/* Stats */}
            <div className="flex gap-4 sm:flex-col sm:gap-2 sm:text-right sm:min-w-[120px]">
              <div className="text-center sm:text-right">
                <div className="text-2xl font-bold text-gray-900">{sharkStats.total}</div>
                <div className="text-xs text-gray-500">Products featured</div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-2xl font-bold text-green-600">{sharkStats.deals}</div>
                <div className="text-xs text-gray-500">Deals made</div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-2xl font-bold text-red-500">{sharkStats.noDeals}</div>
                <div className="text-xs text-gray-500">Passed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-16 text-lg">No products found. Try a different search.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
