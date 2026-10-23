'use client'

import { useEffect } from 'react'
import { viewerStore } from '@/lib'
import { getBalance, getPurchasedItems, getWatchlist, registerDevice } from '@/lib/api'

export function ViewerProvider() {
    useEffect(() => {
        viewerStore.ensureGuest()

        let cancel = false
        const deviceId = viewerStore.getSnapshot().guestId

        void (async () => {
            try {
                await registerDevice(deviceId)
                const [balance, items, watchlist] = await Promise.all([getBalance(), getPurchasedItems(), getWatchlist()])

                if (cancel) return

                const unlocked: Record<string, number[]> = {}

                for (const entry of items.unlockedEpisodes ?? []) {
                    unlocked[entry.projectId] = [...(unlocked[entry.projectId] ?? []), entry.episodeNumber]
                }

                viewerStore.update((current) => ({
                    tokens: balance.coinBalance,
                    vip: balance.vipActive,
                    saved: watchlist.items.map((item) => item.movieId),
                    unlocked: mergeUnlocked(current.unlocked, unlocked),
                }))
            } catch {
                // Catalog and playback still work if device registration is slow.
            }
        })()

        return () => {
            cancel = true
        }
    }, [])

    return null
}

function mergeUnlocked(local: Record<string, number[]>, remote: Record<string, number[]>) {
    const slugs = new Set([...Object.keys(local), ...Object.keys(remote)])
    const next: Record<string, number[]> = {}

    for (const slug of slugs) {
        next[slug] = [...new Set([...(local[slug] ?? []), ...(remote[slug] ?? [])])]
    }

    return next
}
