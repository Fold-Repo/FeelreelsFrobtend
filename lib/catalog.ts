import type { Episode, Paginated, Series } from '@/types'

export type Category = { slug: string; label: string }

export type SeriesQuery = {
    category?: string
    studio?: string
    q?: string
    sort?: string
    filters?: string[]
    only?: string[]
}

export function genreSlug(value: string) {
    const slug = value
        .trim()
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return slug || 'drama'
}

export function getCategoryLabel(slug: string) {
    if (!slug) return ''

    return slug
        .split('-')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

export function categoriesFrom(series: Series[]): Category[] {
    const seen = new Map<string, string>()

    for (const item of series) {
        if (!seen.has(item.category)) seen.set(item.category, getCategoryLabel(item.category))
    }

    return [...seen.entries()].map(([slug, label]) => ({ slug, label }))
}

export function studiosFrom(series: Series[]) {
    return [...new Set(series.map((item) => item.studio).filter(Boolean))].map((name) => ({
        name,
        count: series.filter((item) => item.studio === name).length,
    }))
}

export function getTopSeries(series: Series[], limit = 10) {
    return [...series].sort((a, b) => b.views - a.views || b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit)
}

export function getRelatedSeries(series: Series[], current: Series, limit = 6) {
    const sameCategory = series.filter((item) => item.slug !== current.slug && item.category === current.category)
    const others = series.filter((item) => item.slug !== current.slug && item.category !== current.category)

    return [...sameCategory, ...others].slice(0, limit)
}

export function isPlayable(viewer: { vip: boolean; unlocked: Record<string, number[]> }, slug: string, episode: Pick<Episode, 'number' | 'isFree'>) {
    return viewer.vip || episode.isFree || Boolean(viewer.unlocked[slug]?.includes(episode.number))
}

const SORTS: Record<string, (a: Series, b: Series) => number> = {
    popular: (a, b) => b.views - a.views || b.publishedAt.localeCompare(a.publishedAt),
    newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    rating: (a, b) => b.rating - a.rating,
    episodes: (a, b) => b.episodes - a.episodes,
}

const FILTERS: Record<string, (series: Series) => boolean> = {
    new: (series) => series.isNew,
    vip: (series) => series.isVip,
    completed: (series) => series.completed,
    free: (series) => series.freeEpisodes > 0,
}

export function querySeries(series: Series[], { category, studio, q, sort, filters = [], only }: SeriesQuery) {
    const term = q?.trim().toLowerCase()

    const result = series.filter(
        (item) =>
            (!category || item.category === category) &&
            (!studio || item.studio === studio) &&
            (!only || only.includes(item.slug)) &&
            (!term || [item.title, item.studio, getCategoryLabel(item.category), ...item.tags].some((value) => value.toLowerCase().includes(term))) &&
            filters.every((filter) => FILTERS[filter]?.(item) ?? true),
    )

    return sort && SORTS[sort] ? [...result].sort(SORTS[sort]) : result
}

export function paginateSeries(series: Series[], { page, pageSize = 12, ...query }: SeriesQuery & { page: number; pageSize?: number }): Paginated<Series> {
    const filtered = querySeries(series, query)
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

    return {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        page,
        totalPages,
        totalItems: filtered.length,
    }
}
