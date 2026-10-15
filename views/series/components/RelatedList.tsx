'use client'

import { motion } from 'framer-motion'
import { VideoCard } from '@/components'
import { WATCH } from '@/data'
import { EASE, getRelatedSeries } from '@/lib'
import type { Series } from '@/types'

export function RelatedList({ series }: { series: Series }) {
    const items = getRelatedSeries(series, 10)

    return (
        <aside
            className="no-scrollbar xl:sticky xl:top-24 xl:max-h-[calc(100dvh-7rem)] xl:self-start xl:overflow-y-auto xl:overscroll-contain xl:pr-1"
            data-lenis-prevent>
            <h2 className="mb-4 text-lg font-semibold tracking-[-0.02em]">{WATCH.related}</h2>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}>
                        <VideoCard series={item} layout="row" />
                    </motion.div>
                ))}
            </div>
        </aside>
    )
}
