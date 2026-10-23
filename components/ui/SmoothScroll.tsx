'use client'

import { type ReactNode, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import { onNavigate } from '@/lib/on-navigate'

export function SmoothScroll({ children }: { children: ReactNode }) {
    const reduce = useReducedMotion()

    if (reduce) return children

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.14,
                wheelMultiplier: 1,
                touchMultiplier: 1.4,
                anchors: { offset: -96 },
                prevent: (node) => node.closest('[data-lenis-prevent], [role="dialog"]') !== null,
            }}>
            <ScrollReset />

            {children}
        </ReactLenis>
    )
}

function ScrollReset() {
    const lenis = useLenis()

    useEffect(() => {
        if (!lenis) return

        const reset = () => lenis.scrollTo(0, { immediate: true })

        reset()

        return onNavigate(reset)
    }, [lenis])

    return null
}
