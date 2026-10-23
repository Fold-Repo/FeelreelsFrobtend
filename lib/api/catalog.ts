import { genreSlug } from '@/lib/catalog'
import type { Episode, Series } from '@/types'
import { ApiError, apiRequest, catalogFlags } from './client'
import type { MovieDetail, MoviePage, MovieSummary } from './types'

export async function fetchAllMovies(options?: { revalidate?: number }) {
    const items: MovieSummary[] = []
    let page = 0
    let hasMore = true

    while (hasMore && page < 40) {
        const result = await apiRequest<MoviePage>(`/catalog/movies${catalogFlags({ page, limit: 50 })}`, options)

        items.push(...result.items)
        hasMore = result.hasMore
        page += 1
    }

    return items.map((movie) => toSeries(movie))
}

export async function fetchMovie(id: string) {
    try {
        const movie = await apiRequest<MovieDetail>(`/catalog/movies/${encodeURIComponent(id)}${catalogFlags()}`)

        return { series: toSeries(movie), episodes: toEpisodes(movie) }
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) return null

        throw error
    }
}

export function toSeries(movie: MovieSummary | MovieDetail): Series {
    const genre = movie.genre?.trim() || movie.category?.trim() || 'Drama'
    const creator = 'creator' in movie ? movie.creator?.name?.trim() : ''

    return {
        slug: movie.id,
        title: movie.title,
        category: genreSlug(genre),
        tags: [],
        synopsis: movie.description ?? '',
        poster: movie.thumbnailPortraitUrl || movie.thumbnailUrl,
        episodes: movie.episodeCount,
        freeEpisodes: movie.freeEpisodeCount ?? 0,
        rating: movie.rating ?? 0,
        views: 0,
        year: movie.updatedAt ? new Date(movie.updatedAt).getUTCFullYear() : 0,
        isNew: false,
        isVip: Boolean(movie.isPremium),
        thumbnail: movie.thumbnailUrl || movie.thumbnailPortraitUrl,
        studio: creator || movie.creatorName?.trim() || 'Feelreels',
        likes: 0,
        comments: 0,
        publishedAt: movie.updatedAt ?? new Date(0).toISOString(),
        duration: '',
        completed: false,
    }
}

export function toEpisodes(movie: MovieDetail): Episode[] {
    const thumbnail = movie.thumbnailUrl || movie.thumbnailPortraitUrl

    return [...movie.episodes]
        .sort((a, b) => a.number - b.number)
        .map((episode) => ({
            id: episode.id,
            number: episode.number,
            title: episode.title,
            src: episode.isLocked ? '' : (episode.videoUrl ?? ''),
            thumbnail,
            isFree: !episode.isLocked,
            coinCost: episode.coinCost,
            durationSec: episode.durationSec,
            format: episode.videoFormat,
        }))
}
