'use client'

import Image from 'next/image'
import { type ReactNode, useCallback, useMemo, useRef } from 'react'
import { Spinner, VERTICAL_STAGE, VideoPlayer } from '@/components'
import { useEpisodeStream, useViewer } from '@/hooks'
import { cn, isPlayable } from '@/lib'
import { ApiError, savePlaybackProgress } from '@/lib/api'
import { playbackSrc } from '@/lib/media-src'
import type { Episode, Series } from '@/types'
import { EpisodeStrip } from './EpisodeStrip'
import { LockedOverlay } from './LockedOverlay'
import { PlayerRail } from './PlayerRail'
import { ReelOverlay } from './ReelOverlay'

type PlayerProps = {
    series: Series
    episodes: Episode[]
    current: number
    theater: boolean
    onSelect: (number: number) => void
    onToggleTheater: () => void
}

export function Player({ series, episodes, current, theater, onSelect, onToggleTheater }: PlayerProps) {
    const { viewer } = useViewer()
    const episode = episodes[current - 1]
    const following = episodes[current]
    const playable = Boolean(episode) && isPlayable(viewer, series.slug, episode)
    const stream = useEpisodeStream(series.slug, episode?.number ?? 0, playable)
    const sentAt = useRef(0)

    const next = useMemo(
        () => (following ? { title: `${series.title} · ${following.title}`, poster: series.poster, onPlay: () => onSelect(following.number) } : undefined),
        [following, series, onSelect],
    )

    const report = useCallback(
        (position: number, duration: number) => {
            if (!episode || duration <= 0) return

            const now = Date.now()
            const ending = position >= duration - 1

            if (!ending && now - sentAt.current < 10_000) return

            sentAt.current = now
            void savePlaybackProgress(series.slug, episode.number, Math.floor(position), Math.max(1, Math.floor(duration))).catch(() => undefined)
        },
        [episode, series.slug],
    )

    if (!episode) {
        return <Stage theater={theater} message="This episode is not available." />
    }

    if (!playable) {
        return (
            <div className={cn('relative overflow-hidden bg-black', theater ? 'h-[min(86vh,60rem)] w-full' : VERTICAL_STAGE)}>
                <LockedOverlay series={series} episode={episode} />
            </div>
        )
    }

    if (stream.isPending) {
        return (
            <Stage theater={theater}>
                <Spinner className="size-10 border-2 text-white" />
            </Stage>
        )
    }

    const src = playbackSrc(stream.data?.streamUrl ?? '')

    if (stream.isError) {
        const message = stream.error instanceof ApiError ? stream.error.message : 'This episode could not be played.'

        return <Stage theater={theater} message={message} poster={series.poster} />
    }

    if (!src) {
        return <Stage theater={theater} message="This episode does not have a video yet." poster={series.poster} />
    }

    return (
        <VideoPlayer
            src={src}
            poster={episode.thumbnail || series.thumbnail}
            title={episode.title}
            eyebrow={series.title}
            theater={theater}
            defaultCaptions={viewer.prefs.subtitles}
            autoNext={viewer.prefs.autoplay}
            next={next}
            onTheater={onToggleTheater}
            onProgress={report}
            side={<PlayerRail series={series} episode={current} />}
            mobileOverlay={(progress) => (
                <ReelOverlay series={series} episodes={episodes} current={current} progress={progress} onSelect={onSelect} onNext={next?.onPlay} />
            )}
            drawer={<EpisodeStrip series={series} episodes={episodes} current={current} onSelect={onSelect} />}
        />
    )
}

function Stage({ theater, message, poster, children }: { theater: boolean; message?: string; poster?: string; children?: ReactNode }) {
    return (
        <div className={cn('relative flex items-center justify-center overflow-hidden bg-black', theater ? 'h-[min(86vh,60rem)] w-full' : VERTICAL_STAGE)}>
            {poster && <Image src={poster} alt="" fill sizes="800px" className="object-cover opacity-40 blur-2xl" />}

            {children}

            {message && <p className="relative max-w-sm px-6 text-center text-sm text-white/80">{message}</p>}
        </div>
    )
}
