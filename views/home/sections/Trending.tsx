'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ButtonLink, SeriesCard, SplitText } from '@/components'
import { HOME } from '@/data'
import { useMediaQuery } from '@/hooks'
import { cn, getTopSeries } from '@/lib'

const ITEMS = getTopSeries(10)

export function Trending() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
    const x = useTransform(progress, [0, 1], ['0%', '-62%'])
    const bar = useTransform(progress, [0, 1], ['0%', '100%'])
    const pinned = useMediaQuery('(min-width: 1024px)')
    const { eyebrow, title, cta } = HOME.trending

    return (
        <section ref={ref} className="relative px-2 py-6 sm:px-4 lg:h-[260vh] lg:py-0">
            <div className="flex items-center overflow-hidden lg:sticky lg:top-0 lg:h-screen">
                <div className="w-full rounded-[2rem] bg-night py-10 text-white sm:py-14 lg:rounded-[2.5rem]">
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

                    <motion.div
                        style={pinned ? { x } : undefined}
                        data-lenis-prevent={pinned ? undefined : true}
                        className={cn(
                            'flex gap-4 px-4 sm:gap-5 sm:px-6 lg:pr-0 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]',
                            pinned ? 'will-change-transform' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain py-2 [-webkit-overflow-scrolling:touch]',
                        )}>
                        {ITEMS.map((series, index) => (
                            <div key={series.slug} className="w-40 shrink-0 snap-start sm:w-56 lg:w-64 [&_h3]:text-white [&_p]:text-white/55">
                                <SeriesCard series={series} rank={index + 1} priority={index < 3} />
                            </div>
                        ))}
                    </motion.div>

                    <div className="mx-auto mt-10 hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
                        <div className="h-px bg-white/10">
                            <motion.div style={{ width: bar }} className="h-px bg-accent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
