'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { WATCH } from '@/data'
import { useViewer } from '@/hooks'
import { cn, EASE, interpolate } from '@/lib'
import type { Episode, Series } from '@/types'
import { CommentsSection } from '../components/comments/CommentsSection'
import { EpisodeSheet } from '../components/EpisodeSheet'
import { Player } from '../components/Player'
import { RelatedList } from '../components/RelatedList'
import { WatchInfo } from '../components/WatchInfo'

export function Watch({ series, episodes }: { series: Series; episodes: Episode[] }) {
    const params = useSearchParams()
    const total = Math.max(episodes.length, 1)
    const [current, setCurrent] = useState(() => Math.min(Math.max(Number(params.get('ep')) || 1, 1), total))
    const [theater, setTheater] = useState(false)
    const [episodesOpen, setEpisodesOpen] = useState(false)
    const { saveProgress } = useViewer()

    const select = useCallback((number: number) => setCurrent(number), [])
    const toggleEpisodes = useCallback(() => setEpisodesOpen((open) => !open), [])

    useEffect(() => {
        saveProgress(series.slug, current)
    }, [saveProgress, series.slug, current])

    const player = (
        <Player
            series={series}
            episodes={episodes}
            current={current}
            theater={theater}
            onSelect={select}
            onToggleTheater={() => setTheater((value) => !value)}
            onOpenEpisodes={toggleEpisodes}
            episodesOpen={episodesOpen}
        />
    )

    return (
        <>
        <div className={cn('pb-16', !theater && 'sm:px-6 sm:pt-6')}>
            {theater && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE }} className="bg-black">
                    {player}
                </motion.div>
            )}

            <div className={cn('grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]', theater && 'pt-6 sm:px-6')}>
                <div className="min-w-0 space-y-6">
                    {!theater && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}>
                            {player}
                        </motion.div>
                    )}

                    <div className="space-y-6 px-4 sm:px-0">
                        <WatchInfo series={series} episode={current} />

                        <CommentsSection series={series} />
                    </div>
                </div>

                <div className="px-4 sm:px-0">
                    <RelatedList series={series} />
                </div>
            </div>
        </div>

        {!episodesOpen && (
            <button
                type="button"
                onClick={toggleEpisodes}
                className="fixed right-6 bottom-6 z-40 hidden h-12 items-center gap-2 rounded-full bg-night px-4 text-sm font-semibold text-white shadow-lg sm:flex">
                <Layers className="size-4" />

                {WATCH.episodes}

                <span className="text-white/60">{interpolate(WATCH.episode, { number: current })}</span>
            </button>
        )}

        <EpisodeSheet open={episodesOpen} onClose={() => setEpisodesOpen(false)} series={series} episodes={episodes} current={current} onSelect={select} />
        </>
    )
}
