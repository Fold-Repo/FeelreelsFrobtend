'use client'

import { createContext, type ReactNode } from 'react'
import type { Series } from '@/types'

export const CatalogSeedContext = createContext<Series[]>([])

export function CatalogSeedProvider({ series, children }: { series: Series[]; children: ReactNode }) {
    return <CatalogSeedContext.Provider value={series}>{children}</CatalogSeedContext.Provider>
}
