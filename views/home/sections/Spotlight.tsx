'use client'

import { Container, ScrollRow, SectionHeader } from '@/components'
import { HOME } from '@/data'
import { useCatalog } from '@/hooks'
import { SpotlightCard } from '../components/SpotlightCard'

export function Spotlight() {
    const { data: series = [] } = useCatalog()
    const items = [...series].sort((a, b) => b.rating - a.rating).slice(0, 6)
    const { eyebrow, title, accent } = HOME.spotlight

    if (!items.length) return null

    return (
        <section className="py-16 sm:py-24">
            <Container>
                <SectionHeader eyebrow={eyebrow} title={title} accent={accent} className="mb-10" />

                <ScrollRow wheelScroll={false} trackClassName="snap-x snap-mandatory gap-4 pb-2">
                    {items.map((item, index) => (
                        <SpotlightCard key={item.slug} series={item} priority={index < 2} />
                    ))}
                </ScrollRow>
            </Container>
        </section>
    )
}
