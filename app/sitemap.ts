import type { MetadataRoute } from 'next'
import { fetchAllMovies } from '@/lib/api'
import { getOrigin } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const origin = await getOrigin()
    const series = await fetchAllMovies().catch(() => [])

    return [
        { url: origin, changeFrequency: 'daily', priority: 1 },
        ...series.map((item) => ({ url: `${origin}/series/${item.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ]
}
