'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'

export function SmoothScroll({ children }: { children: ReactNode }) {
    const reduce = useReducedMotion()

    if (reduce) return children

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.085,
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
    const pathname = usePathname()

    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true })
    }, [lenis, pathname])

    return null
}
