import { Container } from '@/components'
import { HOME } from '@/data'
import { ALL_SERIES } from '@/lib'
import type { Series } from '@/types'
import { GenreChips } from '../components/GenreChips'
import { Shelf } from '../components/Shelf'

type ShelfRule = (typeof HOME.shelves.rows)[number]

const SORTS: Record<string, (a: Series, b: Series) => number> = {
    newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    popular: (a, b) => b.views - a.views,
}

const FILTERS: Record<string, (series: Series) => boolean> = {
    free: (series) => series.freeEpisodes >= 10,
    completed: (series) => series.completed,
}

const SHELVES = HOME.shelves.rows.map((rule) => ({ ...rule, items: pick(rule) })).filter((shelf) => shelf.items.length > 1)

export function Shelves() {
    return (
        <section id="genres" className="scroll-mt-28 pb-16 sm:pb-24">
            <Container className="space-y-12 sm:space-y-16">
                <GenreChips />

                {SHELVES.map((shelf) => (
                    <Shelf key={shelf.title} title={shelf.title} href={shelf.href} items={shelf.items} ranked={shelf.ranked} />
                ))}
            </Container>
        </section>
    )
}

function pick({ categories, filter, sort }: ShelfRule) {
    const items = ALL_SERIES.filter((series) => (!categories || categories.includes(series.category)) && (!filter || FILTERS[filter](series)))

    return (sort ? [...items].sort(SORTS[sort]) : items).slice(0, 10)
}
