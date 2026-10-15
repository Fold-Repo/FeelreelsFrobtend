'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function ServiceWorker() {
    const pathname = usePathname()

    useEffect(() => {
        if (!('serviceWorker' in navigator)) return

        if (process.env.NODE_ENV !== 'production') {
            void navigator.serviceWorker.getRegistrations().then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))

            return
        }

        navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }, [])

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator) || !navigator.onLine) return

        const id = window.setTimeout(() => {
            void navigator.serviceWorker.ready.then((registration) =>
                registration.active?.postMessage({ type: 'save-page', url: window.location.pathname + window.location.search }),
            )
        }, 1500)

        return () => window.clearTimeout(id)
    }, [pathname])

    return null
}
