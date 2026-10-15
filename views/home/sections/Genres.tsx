import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ButtonLink, Container, SectionHeader } from '@/components'
import { HOME } from '@/data'
import { ALL_SERIES, CATEGORIES, cn, interpolate } from '@/lib'
import { GenreReveal } from '../components/GenreReveal'

const FEATURED = [...CATEGORIES]
    .map((category) => ({ ...category, count: ALL_SERIES.filter((series) => series.category === category.slug).length }))
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 9)

const TINTS = ['bg-blush', 'bg-butter', 'bg-mint', 'bg-sky', 'bg-blush', 'bg-butter', 'bg-mint']

export function Genres() {
    const { eyebrow, title, accent, cta } = HOME.genres

    return (
        <section id="genres" className="scroll-mt-28 py-20 sm:py-28">
            <Container>
                <SectionHeader
                    eyebrow={eyebrow}
                    title={title}
                    accent={accent}
                    className="mb-12"
                    action={
                        <ButtonLink href="/browse" variant="outline" className="bg-surface">
                            {cta}
                        </ButtonLink>
                    }
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {FEATURED.map((category, index) => {
                        const covers = ALL_SERIES.filter((series) => series.category === category.slug).slice(0, 2)
                        const { count } = category

                        return (
                            <GenreReveal key={category.slug} index={index} className={cn(index === 0 && 'col-span-2 row-span-2')}>
                                <Link
                                    href={`/browse?category=${category.slug}`}
                                    className={cn(
                                        'group relative flex h-full min-h-44 flex-col overflow-hidden rounded-[1.75rem] p-5',
                                        TINTS[index],
                                        index === 0 && 'min-h-80 sm:min-h-[22rem]',
                                    )}>
                                    <span className="relative z-10 text-lg font-semibold tracking-[-0.02em]">{category.label}</span>

                                    <span className="relative z-10 text-sm text-ink/60">{interpolate(HOME.genres.count, { count })}</span>

                                    <span className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-surface transition-transform duration-500 group-hover:rotate-45">
                                        <ArrowUpRight className="size-4" />
                                    </span>

                                    <div className="absolute -right-4 -bottom-6 flex gap-2">
                                        {covers.map((series, item) => (
                                            <div
                                                key={series.slug}
                                                className={cn(
                                                    'relative aspect-[2/3] overflow-hidden rounded-2xl shadow-lg transition-transform duration-700 group-hover:-translate-y-2',
                                                    index === 0 ? 'w-36 sm:w-44' : 'w-20',
                                                    item === 0 ? '-rotate-6' : 'rotate-3',
                                                )}>
                                                <Image src={series.poster} alt="" fill sizes="180px" className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </Link>
                            </GenreReveal>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
