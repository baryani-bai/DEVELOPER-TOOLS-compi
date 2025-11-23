import { MetadataRoute } from 'next'
import { toolRegistry } from '@/lib/constants/toolRegistry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codebox.dev' // TODO: Update with your actual domain
  const currentDate = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Tool pages - dynamically generated from toolRegistry
  const toolPages: MetadataRoute.Sitemap = toolRegistry.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: tool.popular ? 0.8 : 0.7,
  }))

  return [...staticPages, ...toolPages]
}
