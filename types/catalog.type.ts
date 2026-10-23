export type Category = {
    slug: string
    label: string
}

export type Series = {
    slug: string
    title: string
    category: string
    tags: string[]
    synopsis: string
    poster: string
    episodes: number
    freeEpisodes: number
    rating: number
    views: number
    year: number
    isNew: boolean
    isVip: boolean
    thumbnail: string
    studio: string
    likes: number
    comments: number
    publishedAt: string
    duration: string
    completed: boolean
}

export type Episode = {
    id?: string
    number: number
    title: string
    src: string
    thumbnail: string
    isFree: boolean
    coinCost?: number
    durationSec?: number
    format?: 'hls' | 'mp4' | null
}
