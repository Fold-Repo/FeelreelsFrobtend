'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

export function useScrollLock(locked: boolean) {
    const lenis = useLenis()

    useEffect(() => {
        if (!locked) return

        const { overflow } = document.documentElement.style

        lenis?.stop()
        document.documentElement.style.overflow = 'hidden'

        return () => {
            document.documentElement.style.overflow = overflow
            lenis?.start()
        }
    }, [locked, lenis])
}
