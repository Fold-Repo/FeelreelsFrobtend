'use client'

import { CatalogSeedProvider } from '@/hooks'
import type { Series } from '@/types'
import { GenreMarquee, Hero, Install, Shelves, Spotlight } from './sections'

export default function HomeView({ initialSeries = [] }: { initialSeries?: Series[] }) {
    return (
        <CatalogSeedProvider series={initialSeries}>
            <Hero />

            <GenreMarquee />

            <Spotlight />

            <Shelves />

            <Install />
        </CatalogSeedProvider>
    )
}
