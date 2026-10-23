'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Lock } from 'lucide-react'
import { useViewer } from '@/hooks'
import { cn, isPlayable } from '@/lib'
import type { Episode, Series } from '@/types'

type EpisodeStripProps = {
    series: Series
    episodes: Episode[]
    current: number
    onSelect: (number: number) => void
}

export function EpisodeStrip({ series, episodes, current, onSelect }: EpisodeStripProps) {
    const { viewer } = useViewer()
    const trackRef = useRef<HTMLDivElement>(null)
    const activeRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const track = trackRef.current
        const active = activeRef.current

        if (track && active) track.scrollTo({ left: active.offsetLeft - track.clientWidth / 2 + active.offsetWidth / 2, behavior: 'smooth' })
    }, [current])

    return (
        <div ref={trackRef} data-lenis-prevent className="relative no-scrollbar flex gap-1.5 overflow-x-auto rounded-2xl bg-black/60 p-1.5 backdrop-blur-xl">
            {episodes.map((episode) => {
                const active = episode.number === current
                const locked = !isPlayable(viewer, series.slug, episode)

                return (
                    <button
                        key={episode.number}
                        ref={active ? activeRef : undefined}
                        type="button"
                        onClick={() => onSelect(episode.number)}
                        className={cn(
                            'group relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition-all',
                            active ? 'ring-accent' : 'ring-transparent hover:ring-white/40',
                        )}>
                        <Image
                            src={episode.thumbnail}
                            alt=""
                            fill
                            sizes="96px"
                            className={cn('object-cover transition-transform duration-500 group-hover:scale-110', locked && 'opacity-40 grayscale')}
                        />

                        <span className="absolute inset-x-1 bottom-1 flex items-center justify-between text-[0.65rem] font-semibold">
                            <span className="rounded-md bg-black/60 px-1.5 py-0.5">{episode.number}</span>

                            {locked && <Lock className="size-3" />}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
