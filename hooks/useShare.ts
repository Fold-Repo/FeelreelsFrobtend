'use client'

import { useSyncExternalStore } from 'react'
import { type SharePayload, shareStore } from '@/lib'

export function useShare() {
    const payload = useSyncExternalStore(shareStore.subscribe, shareStore.get, () => null)

    return { payload, open: (next: SharePayload) => shareStore.set(next), close: () => shareStore.set(null) }
}
