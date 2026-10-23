'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchAllMovies, fetchMovie } from '@/lib/api'

export function useCatalog() {
    return useQuery({
        queryKey: ['catalog', 'movies'],
        queryFn: fetchAllMovies,
    })
}

export function useMovie(id?: string) {
    return useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovie(id!),
        enabled: Boolean(id),
    })
}
