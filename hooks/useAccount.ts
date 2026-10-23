'use client'

import { useSyncExternalStore } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addToWatchlist, getBalance, getEngagement, likeMovie, removeFromWatchlist, unlikeMovie } from '@/lib/api'
import type { Engagement } from '@/lib/api/types'
import { viewerStore } from '@/lib/viewer-store'
import { useToast } from './useToast'

export function useWallet() {
    const guestId = useSyncExternalStore(viewerStore.subscribe, () => viewerStore.getSnapshot().guestId, () => '')

    return useQuery({
        queryKey: ['wallet'],
        enabled: guestId.length >= 8,
        queryFn: async () => {
            const balance = await getBalance()

            viewerStore.update(() => ({ tokens: balance.coinBalance, vip: balance.vipActive }))

            return balance
        },
    })
}

export function useEngagement(movieId: string) {
    const client = useQueryClient()
    const { showError } = useToast()
    const guestId = useSyncExternalStore(viewerStore.subscribe, () => viewerStore.getSnapshot().guestId, () => '')
    const query = useQuery({
        queryKey: ['engagement', movieId],
        queryFn: () => getEngagement(movieId),
        enabled: Boolean(movieId) && guestId.length >= 8,
    })
    const fail = (error: Error) => showError(error.message || 'Could not update this series.')

    const like = useMutation({
        mutationFn: async () => (query.data?.likedByMe ? unlikeMovie(movieId) : likeMovie(movieId)),
        onSuccess: (engagement) => client.setQueryData<Engagement>(['engagement', movieId], engagement),
        onError: fail,
    })

    const save = useMutation({
        mutationFn: async () => {
            if (query.data?.savedByMe) {
                await removeFromWatchlist(movieId)
                viewerStore.update((current) => ({ saved: current.saved.filter((item) => item !== movieId) }))

                return false
            }

            await addToWatchlist(movieId)
            viewerStore.update((current) => ({ saved: current.saved.includes(movieId) ? current.saved : [...current.saved, movieId] }))

            return true
        },
        onSuccess: (savedByMe) => {
            client.setQueryData<Engagement>(['engagement', movieId], (current) =>
                current
                    ? {
                          ...current,
                          savedByMe,
                          saveCount: Math.max(0, current.saveCount + (savedByMe ? 1 : -1)),
                      }
                    : current,
            )
        },
        onError: fail,
    })

    return {
        liked: query.data?.likedByMe ?? false,
        saved: query.data?.savedByMe ?? false,
        likeCount: query.data?.likeCount ?? 0,
        toggleLike: () => {
            if (query.isSuccess) like.mutate()
        },
        toggleSave: () => {
            if (query.isSuccess) save.mutate()
        },
    }
}
