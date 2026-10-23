'use client'

import { useEffect } from 'react'
import { onNavigate } from '@/lib/on-navigate'

export function ServiceWorker() {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return

        if (process.env.NODE_ENV !== 'production') {
            void navigator.serviceWorker.getRegistrations().then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))

            return
        }

        navigator.serviceWorker.register('/sw.js').catch(() => undefined)

        let timer = 0

        const save = () => {
            window.clearTimeout(timer)

            if (!navigator.onLine) return

            timer = window.setTimeout(() => {
                const url = window.location.pathname + window.location.search

                void navigator.serviceWorker.ready.then((registration) => registration.active?.postMessage({ type: 'save-page', url }))
            }, 1500)
        }

        save()

        const stop = onNavigate(save)

        return () => {
            window.clearTimeout(timer)
            stop()
        }
    }, [])

    return null
}
