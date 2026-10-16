'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useViewer } from '@/hooks'
import { cn, EASE, getEpisodes } from '@/lib'
import type { Series } from '@/types'
import { CommentsSection } from '../components/comments/CommentsSection'
import { EpisodePanel } from '../components/EpisodePanel'
import { Player } from '../components/Player'
import { RelatedList } from '../components/RelatedList'
import { WatchInfo } from '../components/WatchInfo'

export function Watch({ series }: { series: Series }) {
    const [episodes] = useState(() => getEpisodes(series))
    const params = useSearchParams()
    const [current, setCurrent] = useState(() => Math.min(Math.max(Number(params.get('ep')) || 1, 1), series.episodes))
    const [theater, setTheater] = useState(false)
    const { saveProgress } = useViewer()

    const select = useCallback((number: number) => setCurrent(number), [])

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
        />
    )

    return (
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

                        <EpisodePanel series={series} episodes={episodes} current={current} onSelect={select} dark={false} />

                        <CommentsSection series={series} />
                    </div>
                </div>

                <div className="px-4 sm:px-0">
                    <RelatedList series={series} />
                </div>
            </div>
        </div>
    )
}
