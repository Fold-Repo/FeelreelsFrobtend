'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star } from 'lucide-react'
import { ButtonLink, Container, DownloadAppButton, SplitText } from '@/components'
import { HOME } from '@/data'
import { EASE } from '@/lib'
import { HeroVisual } from '../components/HeroVisual'
import { PosterMarquee } from '../components/PosterMarquee'

export function Hero() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [0, 120])
    const { rating, ratingNote, title, accent, text, primary, secondary, stats } = HOME.hero

    return (
        <section ref={ref} className="px-2 pt-2 sm:px-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-b from-surface via-surface to-mint/70 lg:rounded-[2.5rem]">
                <Container className="grid items-center gap-12 pt-14 pb-10 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
                    <div>
                        <Reveal delay={0}>
                            <div className="inline-flex items-center gap-3">
                                <span className="flex size-9 items-center justify-center rounded-full bg-primary">
                                    <Star className="size-4 fill-gold text-gold" />
                                </span>

                                <span className="text-sm leading-tight">
                                    <span className="block font-semibold">{rating}</span>

                                    <span className="text-muted">{ratingNote}</span>
                                </span>
                            </div>
                        </Reveal>

                        <h1 className="mt-8 text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[4.75rem]">
                            <SplitText text={title} delay={0.1} className="block" />

                            <SplitText text={accent} delay={0.3} className="block text-muted/60" />
                        </h1>

                        <Reveal delay={0.16}>
                            <p className="mt-6 max-w-md border-t border-line pt-6 text-base leading-relaxed text-muted sm:text-lg">{text}</p>
                        </Reveal>

                        <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
                            <ButtonLink href={primary.href} size="lg" className="px-7">
                                {primary.label}
                            </ButtonLink>

                            <DownloadAppButton size="lg" variant="outline" label={secondary.label} className="bg-surface px-7" />
                        </Reveal>

                        <Reveal delay={0.32} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-2xl font-semibold tracking-[-0.03em]">{stat.value}</p>

                                    <p className="text-sm text-muted">{stat.label}</p>
                                </div>
                            ))}
                        </Reveal>
                    </div>

                    <motion.div style={{ y }}>
                        <HeroVisual />
                    </motion.div>
                </Container>

                <PosterMarquee />
            </div>
        </section>
    )
}

function Reveal({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
    return (
        <motion.div className={className} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay }}>
            {children}
        </motion.div>
    )
}
