'use client'

import { useMemo } from 'react'
import { VideoPlayer } from '@/components'
import { useViewer } from '@/hooks'
import type { Episode, Series } from '@/types'
import { EpisodeStrip } from './EpisodeStrip'
import { LockedOverlay } from './LockedOverlay'
import { PlayerRail } from './PlayerRail'

type PlayerProps = {
    series: Series
    episodes: Episode[]
    current: number
    theater: boolean
    onSelect: (number: number) => void
    onToggleTheater: () => void
}

export function Player({ series, episodes, current, theater, onSelect, onToggleTheater }: PlayerProps) {
    const { viewer, canWatch } = useViewer()
    const episode = episodes[current - 1]
    const following = episodes[current]

    const next = useMemo(
        () => (following ? { title: `${series.title} · ${following.title}`, poster: series.poster, onPlay: () => onSelect(following.number) } : undefined),
        [following, series, onSelect],
    )

    if (!canWatch(series, episode.number)) {
        return (
            <div
                className={
                    theater
                        ? 'relative h-[min(78vh,60rem)] w-full overflow-hidden bg-black'
                        : 'relative aspect-video w-full overflow-hidden rounded-3xl bg-black'
                }>
                <LockedOverlay series={series} episode={episode} />
            </div>
        )
    }

    return (
        <VideoPlayer
            src={episode.src}
            poster={series.thumbnail}
            title={episode.title}
            eyebrow={series.title}
            theater={theater}
            defaultCaptions={viewer.prefs.subtitles}
            autoNext={viewer.prefs.autoplay}
            next={next}
            onTheater={onToggleTheater}
            side={<PlayerRail series={series} episode={current} />}
            drawer={<EpisodeStrip series={series} episodes={episodes} current={current} onSelect={onSelect} />}
        />
    )
}
