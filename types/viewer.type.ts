export type ViewerUser = {
    name: string
    email: string
}

export type PlaybackPrefs = {
    autoplay: boolean
    subtitles: boolean
    dataSaver: boolean
    quality: string
}

export type ViewerComment = {
    id: string
    text: string
    at: number
    parent?: string
}

export type Viewer = {
    guestId: string
    user: ViewerUser | null
    vip: boolean
    tokens: number
    unlocked: Record<string, number[]>
    progress: Record<string, number>
    saved: string[]
    liked: string[]
    comments: Record<string, ViewerComment[]>
    prefs: PlaybackPrefs
}
