import { Container, ScrollRow, SectionHeader } from '@/components'
import { HOME } from '@/data'
import { ALL_SERIES } from '@/lib'
import { SpotlightCard } from '../components/SpotlightCard'

const ITEMS = [...ALL_SERIES].sort((a, b) => b.rating - a.rating).slice(0, 6)

export function Spotlight() {
    const { eyebrow, title, accent } = HOME.spotlight

    return (
        <section className="py-16 sm:py-24">
            <Container>
                <SectionHeader eyebrow={eyebrow} title={title} accent={accent} className="mb-10" />

                <ScrollRow wheelScroll={false} trackClassName="snap-x snap-mandatory gap-4 pb-2">
                    {ITEMS.map((series, index) => (
                        <SpotlightCard key={series.slug} series={series} priority={index < 2} />
                    ))}
                </ScrollRow>
            </Container>
        </section>
    )
}
