import { CATALOG, WATCH } from '@/data'
import type { Episode, Paginated, Series } from '@/types'
import { interpolate } from './format'

const CLIPS = CATALOG.videos

export const CATEGORIES = CATALOG.categories

export const CATALOG_UPDATED_AT = CATALOG.updatedAt

export const STUDIOS = [...new Set(CATALOG.series.map((series) => series.studio))].map((name) => ({
    name,
    count: CATALOG.series.filter((series) => series.studio === name).length,
}))

export const ALL_SERIES: Series[] = CATALOG.series

export function getSeries(slug: string) {
    return ALL_SERIES.find((series) => series.slug === slug)
}

export function getCategoryLabel(slug: string) {
    return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug
}

export function getTopSeries(limit = 10) {
    return [...ALL_SERIES].sort((a, b) => b.views - a.views).slice(0, limit)
}

export function getRelatedSeries(series: Series, limit = 6) {
    const sameCategory = ALL_SERIES.filter((item) => item.slug !== series.slug && item.category === series.category)
    const others = ALL_SERIES.filter((item) => item.slug !== series.slug && item.category !== series.category)

    return [...sameCategory, ...others].slice(0, limit)
}

export function getEpisodes(series: Series): Episode[] {
    const start = Math.max(
        0,
        ALL_SERIES.findIndex((item) => item.slug === series.slug),
    )

    return Array.from({ length: series.episodes }, (_, index) => ({
        number: index + 1,
        title: interpolate(WATCH.episode, { number: index + 1 }),
        src: CLIPS[(index + start) % CLIPS.length],
        thumbnail: index === 0 ? series.thumbnail : ALL_SERIES[(start + index) % ALL_SERIES.length].thumbnail,
        isFree: index < series.freeEpisodes,
    }))
}

export type SeriesQuery = {
    category?: string
    studio?: string
    q?: string
    sort?: string
    filters?: string[]
    only?: string[]
}

const SORTS: Record<string, (a: Series, b: Series) => number> = {
    popular: (a, b) => b.views - a.views,
    newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    rating: (a, b) => b.rating - a.rating,
    episodes: (a, b) => b.episodes - a.episodes,
}

const FILTERS: Record<string, (series: Series) => boolean> = {
    new: (series) => series.isNew,
    vip: (series) => series.isVip,
    completed: (series) => series.completed,
    free: (series) => series.freeEpisodes >= 10,
}

export function querySeries({ category, studio, q, sort, filters = [], only }: SeriesQuery) {
    const term = q?.trim().toLowerCase()

    const result = ALL_SERIES.filter(
        (series) =>
            (!category || series.category === category) &&
            (!studio || series.studio === studio) &&
            (!only || only.includes(series.slug)) &&
            (!term || [series.title, series.studio, getCategoryLabel(series.category), ...series.tags].some((value) => value.toLowerCase().includes(term))) &&
            filters.every((filter) => FILTERS[filter]?.(series) ?? true),
    )

    return sort && SORTS[sort] ? [...result].sort(SORTS[sort]) : result
}

export async function listSeries({ page, pageSize = 12, ...query }: SeriesQuery & { page: number; pageSize?: number }): Promise<Paginated<Series>> {
    const filtered = querySeries(query)
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        page,
        totalPages,
        totalItems: filtered.length,
    }
}
