import { fetchMovie } from '@/lib/api'
import type { Series } from '@/types'

export async function loadSeriesArt(slug: string) {
    const loaded = await fetchMovie(slug).catch(() => null)

    if (!loaded) return null

    const [poster, backdrop] = await Promise.all([remoteDataUri(loaded.series.poster), remoteDataUri(loaded.series.thumbnail)])

    return { series: loaded.series, poster, backdrop }
}

async function remoteDataUri(url: string | undefined) {
    if (!url || url.startsWith('/')) return null

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } })

        if (!response.ok) return null

        const type = response.headers.get('content-type')?.split(';')[0] || 'image/jpeg'

        if (!type.startsWith('image/')) return null

        const bytes = Buffer.from(await response.arrayBuffer())

        return `data:${type};base64,${bytes.toString('base64')}`
    } catch {
        return null
    }
}

export type SeriesArt = {
    series: Series
    poster: string | null
    backdrop: string | null
}
