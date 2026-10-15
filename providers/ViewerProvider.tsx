'use client'

import { useEffect } from 'react'
import { viewerStore } from '@/lib'

export function ViewerProvider() {
    useEffect(() => {
        viewerStore.ensureGuest()
    }, [])

    return null
}
