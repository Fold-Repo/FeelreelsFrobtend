'use client'

import { useEffect } from 'react'

export function usePlayerShortcuts(handlers: Record<string, () => void>, enabled = true) {
    useEffect(() => {
        if (!enabled) return

        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement

            if (event.metaKey || event.ctrlKey || event.altKey || target.closest('input, textarea, select, [contenteditable="true"]')) return

            const handler = handlers[event.key.length === 1 ? event.key.toLowerCase() : event.key]

            if (!handler) return

            event.preventDefault()
            handler()
        }

        window.addEventListener('keydown', onKey)

        return () => window.removeEventListener('keydown', onKey)
    }, [handlers, enabled])
}
