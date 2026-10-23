'use client'

import { Container } from '@/components'
import { HOME } from '@/data'
import { useCatalog } from '@/hooks'
import type { Series } from '@/types'
import { GenreChips } from '../components/GenreChips'
import { Shelf } from '../components/Shelf'

type ShelfRule = (typeof HOME.shelves.rows)[number]

const SORTS: Record<string, (a: Series, b: Series) => number> = {
    newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    popular: (a, b) => b.views - a.views || b.publishedAt.localeCompare(a.publishedAt),
}

const FILTERS: Record<string, (series: Series) => boolean> = {
    free: (series) => series.freeEpisodes > 0,
    completed: (series) => series.completed,
}

export function Shelves() {
    const { data: series = [] } = useCatalog()
    const shelves = HOME.shelves.rows.map((rule) => ({ ...rule, items: pick(series, rule) })).filter((shelf) => shelf.items.length > 0)

    return (
        <section id="genres" className="scroll-mt-28 pb-16 sm:pb-24">
            <Container className="space-y-12 sm:space-y-16">
                <GenreChips />

                {shelves.map((shelf) => (
                    <Shelf key={shelf.title} title={shelf.title} href={shelf.href} items={shelf.items} ranked={shelf.ranked} />
                ))}
            </Container>
        </section>
    )
}

function pick(series: Series[], { categories, filter, sort }: ShelfRule) {
    const items = series.filter((item) => (!categories || categories.includes(item.category)) && (!filter || FILTERS[filter](item)))

    return (sort ? [...items].sort(SORTS[sort]) : items).slice(0, 10)
}
