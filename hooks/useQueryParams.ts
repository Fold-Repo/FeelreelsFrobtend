'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type QueryValue = string | number | boolean | null | undefined
type QueryUpdates = Record<string, QueryValue>

export const useQueryParams = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const updateQueryParams = useCallback(
        (newParams: QueryUpdates = {}, options?: { clearAll?: boolean }) => {
            const currentParams = options?.clearAll ? new URLSearchParams() : new URLSearchParams(searchParams.toString())

            let changed = false

            Object.entries(newParams).forEach(([key, value]) => {
                if (value === null || value === undefined || value === '') {
                    if (currentParams.has(key)) {
                        currentParams.delete(key)
                        changed = true
                    }
                } else {
                    const stringValue = String(value)

                    if (currentParams.get(key) !== stringValue) {
                        currentParams.set(key, stringValue)
                        changed = true
                    }
                }
            })

            const newQuery = currentParams.toString()
            const newPath = newQuery ? `${pathname}?${newQuery}` : pathname

            if (changed || options?.clearAll) {
                router.push(newPath, { scroll: false })
            }
        },
        [searchParams, pathname, router],
    )

    const removeQueryParams = useCallback(
        (keys: string | string[]) => {
            const currentParams = new URLSearchParams(searchParams.toString())
            const keysToRemove = Array.isArray(keys) ? keys : [keys]

            let changed = false

            keysToRemove.forEach((key) => {
                if (currentParams.has(key)) {
                    currentParams.delete(key)
                    changed = true
                }
            })

            const newQuery = currentParams.toString()
            const newPath = newQuery ? `${pathname}?${newQuery}` : pathname

            if (changed) {
                router.push(newPath, { scroll: false })
            }
        },
        [searchParams, pathname, router],
    )

    const resetQueryParams = useCallback(() => {
        router.push(pathname, { scroll: false })
    }, [pathname, router])

    return {
        searchParams,
        updateQueryParams,
        removeQueryParams,
        resetQueryParams,
    }
}
