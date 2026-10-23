'use client'

import { useSyncExternalStore } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStream } from '@/lib/api'
import { viewerStore } from '@/lib/viewer-store'

export function useEpisodeStream(movieId: string, episodeNumber: number, enabled: boolean) {
    const guestId = useSyncExternalStore(viewerStore.subscribe, () => viewerStore.getSnapshot().guestId, () => '')

    return useQuery({
        queryKey: ['stream', movieId, episodeNumber],
        queryFn: () => getStream(movieId, episodeNumber),
        enabled: enabled && guestId.length >= 8,
        retry: false,
        staleTime: 1000 * 60 * 30,
    })
}
