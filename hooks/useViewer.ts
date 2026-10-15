'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { viewerStore } from '@/lib'
import type { PlaybackPrefs, Series, ViewerUser } from '@/types'

export function useViewer() {
    const viewer = useSyncExternalStore(viewerStore.subscribe, viewerStore.getSnapshot, viewerStore.getServerSnapshot)

    const canWatch = useCallback(
        (series: Series, episode: number) => viewer.vip || episode <= series.freeEpisodes || Boolean(viewer.unlocked[series.slug]?.includes(episode)),
        [viewer],
    )

    const unlock = useCallback((slug: string, episode: number, payWithToken = false) => {
        viewerStore.update((current) => ({
            tokens: payWithToken ? Math.max(0, current.tokens - 1) : current.tokens,
            unlocked: { ...current.unlocked, [slug]: [...(current.unlocked[slug] ?? []), episode] },
        }))
    }, [])

    const saveProgress = useCallback((slug: string, episode: number) => {
        viewerStore.update((current) => ({ progress: { ...current.progress, [slug]: episode } }))
    }, [])

    const toggleSaved = useCallback(
        (slug: string) =>
            viewerStore.update((current) => ({
                saved: current.saved.includes(slug) ? current.saved.filter((item) => item !== slug) : [...current.saved, slug],
            })),
        [],
    )

    const toggleLiked = useCallback(
        (slug: string) =>
            viewerStore.update((current) => ({
                liked: current.liked.includes(slug) ? current.liked.filter((item) => item !== slug) : [...current.liked, slug],
            })),
        [],
    )

    const addComment = useCallback(
        (slug: string, text: string, parent?: string) =>
            viewerStore.update((current) => ({
                comments: { ...current.comments, [slug]: [{ id: `${Date.now()}`, text, at: Date.now(), parent }, ...(current.comments[slug] ?? [])] },
            })),
        [],
    )

    const setVip = useCallback((vip: boolean) => viewerStore.update(() => ({ vip })), [])

    const addTokens = useCallback((count: number) => viewerStore.update((current) => ({ tokens: current.tokens + count })), [])

    const setPrefs = useCallback((prefs: Partial<PlaybackPrefs>) => viewerStore.update((current) => ({ prefs: { ...current.prefs, ...prefs } })), [])

    const signIn = useCallback((user: ViewerUser) => viewerStore.update(() => ({ user })), [])

    const signOut = useCallback(() => viewerStore.update(() => ({ user: null })), [])

    return {
        viewer,
        canWatch,
        unlock,
        saveProgress,
        toggleSaved,
        toggleLiked,
        addComment,
        setVip,
        addTokens,
        setPrefs,
        signIn,
        signOut,
        reset: viewerStore.reset,
    }
}
