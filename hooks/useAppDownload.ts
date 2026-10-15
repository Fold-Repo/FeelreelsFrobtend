'use client'

import { useSyncExternalStore } from 'react'
import { downloadStore } from '@/lib'

export function useAppDownload() {
    const open = useSyncExternalStore(downloadStore.subscribe, downloadStore.get, () => false)

    return { open, show: () => downloadStore.set(true), setOpen: downloadStore.set }
}
