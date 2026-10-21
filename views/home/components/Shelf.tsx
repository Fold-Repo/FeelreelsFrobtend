import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ScrollRow, SeriesCard } from '@/components'
import { HOME } from '@/data'
import type { Series } from '@/types'

type ShelfProps = {
    title: string
    href: string
    items: Series[]
    ranked?: boolean
}

export function Shelf({ title, href, items, ranked }: ShelfProps) {
    return (
        <div className="[contain-intrinsic-size:auto_24rem] [content-visibility:auto]">
            <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{title}</h2>

                <Link href={href} className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-muted transition-colors hover:text-ink">
                    {HOME.shelves.viewAll}

                    <ChevronRight className="size-4" />
                </Link>
            </div>

            <ScrollRow wheelScroll={false} trackClassName="-mx-4 snap-x gap-3 px-4 pb-2 sm:mx-0 sm:gap-4 sm:px-0">
                {items.map((series, index) => (
                    <SeriesCard
                        key={series.slug}
                        series={series}
                        rank={ranked ? index + 1 : undefined}
                        className="w-[38vw] shrink-0 snap-start sm:w-48 lg:w-52"
                    />
                ))}
            </ScrollRow>
        </div>
    )
}
