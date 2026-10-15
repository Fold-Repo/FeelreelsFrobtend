'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ButtonLink, SeriesCard, SplitText } from '@/components'
import { HOME } from '@/data'
import { getTopSeries } from '@/lib'

const ITEMS = getTopSeries(10)

export function Trending() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
    const x = useTransform(progress, [0, 1], ['0%', '-62%'])
    const bar = useTransform(progress, [0, 1], ['0%', '100%'])
    const { eyebrow, title, cta } = HOME.trending

    return (
        <section ref={ref} className="relative h-[260vh] px-2 sm:px-4">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="w-full rounded-[2rem] bg-night py-14 text-white lg:rounded-[2.5rem]">
                    <div className="mx-auto mb-10 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
                        <div>
                            <p className="mb-4 inline-flex items-center gap-2 text-sm text-white/60">
                                <span className="size-1.5 rounded-full bg-accent" />

                                {eyebrow}
                            </p>

                            <h2 className="text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">
                                <SplitText text={title} inView />
                            </h2>
                        </div>

                        <ButtonLink href="/browse?sort=popular" variant="secondary">
                            {cta}
                        </ButtonLink>
                    </div>

                    <motion.div style={{ x }} className="flex gap-5 pl-4 will-change-transform sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
                        {ITEMS.map((series, index) => (
                            <div key={series.slug} className="w-48 shrink-0 sm:w-56 lg:w-64 [&_h3]:text-white [&_p]:text-white/55">
                                <SeriesCard series={series} rank={index + 1} priority={index < 3} />
                            </div>
                        ))}
                    </motion.div>

                    <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="h-px bg-white/10">
                            <motion.div style={{ width: bar }} className="h-px bg-accent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
