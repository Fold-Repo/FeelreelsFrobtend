'use client'

import { useCallback, useEffect, useRef } from 'react'

type Options = {
    onLoadMore: () => void
    hasMore: boolean
    loading: boolean
    rootMargin?: string
    disabled?: boolean
}

export function useInfiniteScroll({ onLoadMore, hasMore, loading, rootMargin = '600px', disabled = false }: Options) {
    const observer = useRef<IntersectionObserver | null>(null)
    const latest = useRef({ onLoadMore, hasMore, loading, disabled })

    useEffect(() => {
        latest.current = { onLoadMore, hasMore, loading, disabled }
    })

    useEffect(() => () => observer.current?.disconnect(), [])

    return useCallback(
        (node: Element | null) => {
            observer.current?.disconnect()
            if (!node || typeof IntersectionObserver === 'undefined') return

            observer.current = new IntersectionObserver(
                (entries) => {
                    const { onLoadMore, hasMore, loading, disabled } = latest.current

                    if (entries.some((entry) => entry.isIntersecting) && hasMore && !loading && !disabled) onLoadMore()
                },
                { rootMargin },
            )
            observer.current.observe(node)
        },
        [rootMargin],
    )
}
