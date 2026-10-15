'use client'

import { useQueryParams } from '@/hooks'

export function useBrowseQuery() {
    const { searchParams, updateQueryParams, resetQueryParams } = useQueryParams()

    return {
        category: searchParams.get('category') ?? '',
        studio: searchParams.get('studio') ?? '',
        sort: searchParams.get('sort') ?? '',
        q: searchParams.get('q') ?? '',
        list: searchParams.get('list') ?? '',
        filters: searchParams.get('filters')?.split(',').filter(Boolean) ?? [],
        update: updateQueryParams,
        reset: resetQueryParams,
    }
}
