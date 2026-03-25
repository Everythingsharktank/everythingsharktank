import { MetadataRoute } from 'next'
import products from '@/data/products.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map(p => ({
    url: `https://everythingsharktank.com/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://everythingsharktank.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://everythingsharktank.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ]
}
