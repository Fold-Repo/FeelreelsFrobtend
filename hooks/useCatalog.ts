'use client'

import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllMovies, fetchMovie } from '@/lib/api'
import { CatalogSeedContext } from './CatalogSeed'

export function useCatalog() {
    const seeded = useContext(CatalogSeedContext)
    const query = useQuery({
        queryKey: ['catalog', 'movies'],
        queryFn: () => fetchAllMovies(),
    })

    if (query.data) return query
    if (!seeded.length) return query

    return { ...query, data: seeded }
}

export function useMovie(id?: string) {
    return useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovie(id!),
        enabled: Boolean(id),
    })
}
