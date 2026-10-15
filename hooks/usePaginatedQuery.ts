'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import type { Paginated } from '@/types'

type Options<T> = {
    queryKey: readonly unknown[]
    queryFn: (page: number) => Promise<Paginated<T>>
    enabled?: boolean
}

export function usePaginatedQuery<T>({ queryKey, queryFn, enabled = true }: Options<T>) {
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => queryFn(pageParam),
        initialPageParam: 1,
        getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
        enabled,
    })

    const items = query.data?.pages.flatMap((page) => page.items) ?? []

    return {
        ...query,
        items,
        loadMore: () => query.fetchNextPage(),
        hasMore: Boolean(query.hasNextPage),
        loadingMore: query.isFetchingNextPage,
    }
}
