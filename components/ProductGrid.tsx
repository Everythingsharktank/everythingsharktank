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

const ALL_SHARKS = ['Mark Cuban', 'Lori Greiner', 'Barbara Corcoran', 'Kevin O\'Leary', 'Daymond John', 'Robert Herjavec']
const ALL_CATEGORIES = ['All', 'Home & Kitchen', 'Apparel', 'Food & Beverage', 'Health & Wellness', 'Tech & Gadgets', 'Beauty & Skincare', 'Beauty & Hair', 'Accessories', 'Sports & Fitness', 'Smart Home', 'Automotive', 'Gifts & Flowers', 'Home & Safety']

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

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-colors"
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedShark}
            onChange={e => setSelectedShark(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="All">All Sharks</option>
            {ALL_SHARKS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-yellow-400"
          >
            {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={selectedOutcome}
            onChange={e => setSelectedOutcome(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="All">All Outcomes</option>
            <option value="deal">Deal Made</option>
            <option value="no-deal">No Deal</option>
          </select>
          <span className="text-slate-500 text-sm self-center">{filtered.length} products</span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-16">No products found. Try a different search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
