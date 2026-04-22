'use client'
import { useState } from 'react'

export default function ProductGallery({ slug, mainImage, name }: {
  slug: string
  mainImage: string | null
  name: string
}) {
  const extraImgs = [2, 3, 4].map(n => `/images/products/${slug}_${n}.jpg`)
  const allImgs = [mainImage, ...extraImgs].filter(Boolean) as string[]
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-2">
      <div className="bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden h-64 relative">
        {allImgs.length > 0 ? (
          <img src={allImgs[active]} alt={name}
            className="w-full h-full object-cover transition-opacity duration-200" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">🦈</div>
        )}
        {/* Shark Tank badge */}
        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          🦈 As seen on Shark Tank
        </div>
      </div>

      {/* Thumbnails */}
      {allImgs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImgs.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                active === i ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}>
              <img src={img} alt={`${name} ${i+1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
