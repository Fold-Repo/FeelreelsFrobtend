import type { Viewer } from '@/types'

const KEY = 'feelreels.viewer'

const DEFAULT_VIEWER: Viewer = {
    guestId: '',
    user: null,
    vip: false,
    tokens: 3,
    unlocked: {},
    progress: {},
    saved: [],
    liked: [],
    comments: {},
    prefs: { autoplay: true, subtitles: false, dataSaver: false, quality: 'auto' },
}

const listeners = new Set<() => void>()

let cache: Viewer | null = null

function read(): Viewer {
    if (cache) return cache

    try {
        const stored = window.localStorage.getItem(KEY)

        cache = stored ? { ...DEFAULT_VIEWER, ...(JSON.parse(stored) as Viewer) } : DEFAULT_VIEWER
    } catch {
        cache = DEFAULT_VIEWER
    }

    return cache
}

function write(next: Viewer) {
    cache = next

    try {
        window.localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}

    listeners.forEach((listener) => listener())
}

export const viewerStore = {
    subscribe(listener: () => void) {
        listeners.add(listener)

        return () => listeners.delete(listener)
    },
    getSnapshot: read,
    getServerSnapshot: () => DEFAULT_VIEWER,
    update(change: (viewer: Viewer) => Partial<Viewer>) {
        const current = read()

        write({ ...current, ...change(current) })
    },
    ensureGuest() {
        if (read().guestId) return

        const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

        write({ ...read(), guestId: `guest_${id}` })
    },
    reset() {
        write(DEFAULT_VIEWER)
        viewerStore.ensureGuest()
    },
}
