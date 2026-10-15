'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { LABELS } from '@/constants'
import { EASE } from '@/lib'
import type { Series } from '@/types'
import { SeriesCard } from './SeriesCard'

type SeriesRailProps = {
    items: Series[]
    ranked?: boolean
}

export function SeriesRail({ items, ranked }: SeriesRailProps) {
    const trackRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 1 | -1) => {
        const track = trackRef.current

        track?.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
    }

    return (
        <div className="relative">
            <div ref={trackRef} data-lenis-prevent className="-mx-4 no-scrollbar flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                {items.map((series, index) => (
                    <motion.div
                        key={series.slug}
                        className="w-[44vw] shrink-0 snap-start sm:w-56 lg:w-60"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: EASE, delay: Math.min(index, 6) * 0.06 }}>
                        <SeriesCard series={series} rank={ranked ? index + 1 : undefined} />
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <RailButton label={LABELS.scrollLeft} onClick={() => scroll(-1)}>
                    <ArrowLeft className="size-4" />
                </RailButton>

                <RailButton label={LABELS.scrollRight} onClick={() => scroll(1)}>
                    <ArrowRight className="size-4" />
                </RailButton>
            </div>
        </div>
    )
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="flex size-11 items-center justify-center rounded-full border border-line bg-surface transition-colors hover:bg-primary hover:text-on-primary">
            {children}
        </button>
    )
}
