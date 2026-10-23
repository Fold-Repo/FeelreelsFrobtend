'use client'

import Image from 'next/image'
import type { MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, Play } from 'lucide-react'
import { HOME } from '@/data'
import { useCatalog, useMovie } from '@/hooks'
import { EASE } from '@/lib'
import { playbackSrc } from '@/lib/media-src'
import { Float } from './Float'
import { PhoneMockup } from './PhoneMockup'

export function HeroVisual() {
    const { data: series = [] } = useCatalog()
    const main = series[0]
    const nextSeries = series[Math.min(4, series.length - 1)]
    const thumb = series[Math.min(9, series.length - 1)]
    const movie = useMovie(main?.slug)
    const preview = movie.data?.episodes.find((episode) => episode.isFree && episode.src)?.src
    const previewSrc = preview ? playbackSrc(preview) : undefined
    const { unlocked, continue: continueLabel, progress, viewers, next } = HOME.hero.chips
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 })
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 })

    const onMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()

        x.set((event.clientX - rect.left) / rect.width - 0.5)
        y.set((event.clientY - rect.top) / rect.height - 0.5)
    }

    const onLeave = () => {
        x.set(0)
        y.set(0)
    }

    if (!main) return null

    return (
        <div onMouseMove={onMove} onMouseLeave={onLeave} className="relative mx-auto w-full max-w-md py-6 [perspective:1400px]">
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 80, rotateZ: -6 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
                className="relative mx-auto w-[58%] max-w-[17.5rem] sm:w-[64%]">
                <PhoneMockup series={main} previewSrc={previewSrc} />

                <Float delay={0.6} depth={60} className="top-[8%] -left-[38%] origin-left scale-[0.8] sm:-left-[45%] sm:scale-100">
                    <div className="flex items-center gap-2.5 rounded-full bg-butter py-2 pr-5 pl-2 text-sm font-medium whitespace-nowrap shadow-lg">
                        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-on-primary">
                            <Check className="size-3.5" />
                        </span>

                        {unlocked}
                    </div>
                </Float>

                <Float delay={0.8} depth={90} className="top-[34%] -right-[40%] hidden w-28 sm:block sm:w-32" slow>
                    <div className="overflow-hidden rounded-3xl border-4 border-surface bg-surface shadow-xl">
                        <div className="relative aspect-[3/4]">
                            <Image src={nextSeries?.poster || main.poster} alt="" fill sizes="130px" className="object-cover" />
                        </div>

                        <p className="px-2 py-1.5 text-[0.65rem] font-medium">{next}</p>
                    </div>
                </Float>

                <Float delay={1} depth={70} className="bottom-[18%] -left-[55%] hidden sm:block">
                    <div className="flex w-60 items-center gap-3 rounded-2xl bg-surface p-2.5 shadow-xl">
                        <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-xl">
                            <Image src={thumb?.poster || main.poster} alt="" fill sizes="44px" className="object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted">{continueLabel}</p>

                            <p className="truncate text-sm font-semibold">{thumb?.title || main.title}</p>

                            <p className="text-xs text-muted">{progress}</p>
                        </div>

                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                            <Play className="ml-0.5 size-3 fill-current" />
                        </span>
                    </div>
                </Float>

                <Float
                    delay={1.2}
                    depth={40}
                    className="-bottom-[4%] left-1/2 origin-bottom -translate-x-1/2 scale-[0.8] sm:-right-[30%] sm:bottom-[6%] sm:left-auto sm:translate-x-0 sm:scale-100"
                    slow>
                    <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm whitespace-nowrap shadow-lg">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />

                            <span className="relative inline-flex size-2 rounded-full bg-accent" />
                        </span>

                        {viewers}
                    </div>
                </Float>
            </motion.div>
        </div>
    )
}
