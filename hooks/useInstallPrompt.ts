'use client'

import { useCallback, useEffect, useState } from 'react'

export type InstallEvent = Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallWindow = Window & { __installEvent?: InstallEvent }

export const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true

export function useInstallPrompt() {
    const [event, setEvent] = useState<InstallEvent | null>(null)
    const [installed, setInstalled] = useState(false)

    useEffect(() => {
        const sync = () => setEvent((window as InstallWindow).__installEvent ?? null)

        const onInstalled = () => {
            setInstalled(true)
            setEvent(null)
        }

        const init = window.setTimeout(() => {
            sync()
            setInstalled(isStandalone())
        }, 0)

        window.addEventListener('installready', sync)
        window.addEventListener('appinstalled', onInstalled)

        return () => {
            window.clearTimeout(init)
            window.removeEventListener('installready', sync)
            window.removeEventListener('appinstalled', onInstalled)
        }
    }, [])

    const install = useCallback(async () => {
        if (!event) return false

        await event.prompt()

        const { outcome } = await event.userChoice

        ;(window as InstallWindow).__installEvent = undefined
        setEvent(null)

        return outcome === 'accepted'
    }, [event])

    return { canInstall: Boolean(event), installed, install }
}
