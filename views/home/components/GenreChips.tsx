import Link from 'next/link'
import { ScrollRow } from '@/components'
import { HOME } from '@/data'
import { CATEGORIES } from '@/lib'

export function GenreChips() {
    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{HOME.shelves.genres}</h2>

            <ScrollRow wheelScroll={false} trackClassName="-mx-4 px-4 sm:mx-0 sm:px-0">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/browse?category=${category.slug}`}
                        className="flex h-10 shrink-0 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:bg-primary hover:text-on-primary">
                        {category.label}
                    </Link>
                ))}
            </ScrollRow>
        </div>
    )
}
