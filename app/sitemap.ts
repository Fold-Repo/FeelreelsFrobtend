import type { MetadataRoute } from 'next'
import { ALL_SERIES } from '@/lib'
import { getOrigin } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const origin = await getOrigin()

    return [
        { url: origin, changeFrequency: 'daily', priority: 1 },
        ...ALL_SERIES.map((series) => ({ url: `${origin}/series/${series.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ]
}
