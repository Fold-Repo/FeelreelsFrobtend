export type MovieSummary = {
    id: string
    title: string
    description: string
    genre: string
    category: string
    thumbnailUrl: string
    thumbnailPortraitUrl: string
    episodeCount: number
    freeEpisodeCount?: number
    creatorName?: string
    updatedAt?: string
    isPremium: boolean
    rating: number
}

export type MovieEpisode = {
    id: string
    number: number
    title: string
    synopsis: string
    durationSec: number
    isLocked: boolean
    coinCost: number
    status: string
    videoUrl: string | null
    videoFormat: 'hls' | 'mp4' | null
    videoProvider: string | null
}

export type MovieDetail = MovieSummary & {
    freeEpisodeCount: number
    freeEpisodeRatio: number
    creator: { id: string; name: string; avatarUrl?: string }
    episodes: MovieEpisode[]
}

export type MoviePage = {
    items: MovieSummary[]
    page: number
    limit: number
    total: number
    hasMore: boolean
}

export type StreamPayload = {
    movieId: string
    episodeNumber: number
    streamUrl: string | null
    videoProvider: string | null
    signedToken: string
    expiresAt: string
    durationSec: number
    episode: MovieEpisode
}

export type Engagement = {
    movieId: string
    likeCount: number
    saveCount: number
    shareCount: number
    likedByMe: boolean
    savedByMe: boolean
}

export type WalletBalance = {
    coinBalance: number
    unlockCredits: number
    vipActive: boolean
    deviceId: string
    isAnonymous: boolean
}

export type WatchlistPayload = {
    items: Array<{ movieId: string }>
}

export type PurchasedItems = {
    unlockedEpisodes: Array<{ projectId: string; episodeNumber: number }>
}

export type UnlockResult = {
    unlocked: boolean
    coinBalance: number
    unlockCredits: number
    coinsSpent: number
}
