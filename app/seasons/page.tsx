import products from '@/data/products.json'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse by Season — Everything Shark Tank',
  description: 'Browse every Shark Tank product organized by season, from Season 1 (2009) to the latest season.',
}

export default function SeasonsPage() {
  // Group by season
  const bySeason: Record<number, typeof products> = {}
  products.forEach(p => {
    const s = p.season || 0
    if (!bySeason[s]) bySeason[s] = []
    bySeason[s].push(p)
  })
  const seasons = Object.keys(bySeason).map(Number).sort((a,b) => a-b)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Browse by Season</h1>
        <p className="text-gray-500 text-lg">Every product, organized by when it appeared on Shark Tank</p>
      </div>

      <div className="space-y-6">
        {seasons.map(season => {
          const prods = bySeason[season]
          const deals = prods.filter(p => p.outcome === 'deal').length
          return (
            <div key={season} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white font-black text-xl w-14 h-14 rounded-xl flex items-center justify-center">
                    S{season}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-xl">Season {season}</h2>
                    <p className="text-gray-400 text-sm">{prods.length} products · {deals} deals · {prods.length - deals} no deals</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{deals} deals</div>
                  <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">{prods.length-deals} rejected</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {prods.map(p => (
                    <Link key={p.slug} href={`/products/${p.slug}`}
                      className={`text-sm px-3 py-1.5 rounded-full font-medium transition-colors ${
                        p.outcome === 'deal'
                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                          : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                      }`}>
                      {p.outcome === 'deal' ? '✅' : '❌'} {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
