'use client'

import type { ReactNode } from 'react'
import { Button } from '@heroui/react'
import { LABELS } from '@/constants'
import { useInfiniteScroll } from '@/hooks'

type InfiniteScrollFooterProps = {
    onLoadMore: () => void
    hasMore: boolean
    loading: boolean
    error?: boolean
    loader?: ReactNode
    endMessage?: ReactNode
}

export function InfiniteScrollFooter({ onLoadMore, hasMore, loading, error, loader, endMessage }: InfiniteScrollFooterProps) {
    const sentinel = useInfiniteScroll({ onLoadMore, hasMore, loading, disabled: error })

    if (error && hasMore && !loading) {
        return (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
                <p className="text-sm text-muted">{LABELS.loadMoreError}</p>

                <Button variant="outline" size="sm" onPress={onLoadMore}>
                    {LABELS.retry}
                </Button>
            </div>
        )
    }

    if (hasMore) {
        return (
            <div ref={sentinel} aria-busy={loading} aria-label={LABELS.loadMore}>
                {loader}
            </div>
        )
    }

    return endMessage ? <p className="py-6 text-center text-sm text-muted">{endMessage}</p> : null
}
