'use client'

import { type ReactNode, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VolumeX } from 'lucide-react'
import { PLAYER } from '@/data'
import { usePlayerShortcuts, useVideoPlayer } from '@/hooks'
import { cn } from '@/lib'
import { Spinner } from '../ui'
import { CaptionTrack } from './CaptionTrack'
import { ControlBar } from './ControlBar'
import { type NextUp, NextUpCard } from './NextUpCard'
import { ProtectedVideo } from './ProtectedVideo'
import { TapLayer } from './TapLayer'

export type VideoPlayerProps = {
    src: string
    poster: string
    title: string
    eyebrow?: string
    theater?: boolean
    defaultCaptions?: boolean
    next?: NextUp
    autoNext?: boolean
    side?: ReactNode
    drawer?: ReactNode
    onTheater?: () => void
    onEnded?: () => void
}

export function VideoPlayer({
    src,
    poster,
    title,
    eyebrow,
    theater = false,
    defaultCaptions = false,
    next,
    autoNext = true,
    side,
    drawer,
    onTheater,
    onEnded,
}: VideoPlayerProps) {
    const { stageRef, videoProps, state, actions } = useVideoPlayer(src)
    const [captions, setCaptions] = useState(defaultCaptions)
    const [quality, setQuality] = useState(PLAYER.qualities[0])
    const [endedFor, setEndedFor] = useState<string | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const ended = endedFor === src
    const chromeHidden = state.idle && state.playing && !drawerOpen

    const shortcuts = useMemo(
        () => ({
            ' ': actions.toggle,
            k: actions.toggle,
            j: () => actions.seekBy(-10),
            l: () => actions.seekBy(10),
            ArrowLeft: () => actions.seekBy(-5),
            ArrowRight: () => actions.seekBy(5),
            ArrowUp: () => actions.setVolume(state.volume + 0.1),
            ArrowDown: () => actions.setVolume(state.volume - 0.1),
            m: actions.toggleMute,
            f: actions.toggleFullscreen,
            t: () => onTheater?.(),
            c: () => setCaptions((value) => !value),
            n: () => next?.onPlay(),
            '>': () => actions.setRate(Math.min(2, state.rate + 0.25)),
            '<': () => actions.setRate(Math.max(0.5, state.rate - 0.25)),
        }),
        [actions, state.volume, state.rate, onTheater, next],
    )

    usePlayerShortcuts(shortcuts)

    return (
        <div
            ref={stageRef}
            onContextMenu={(event) => event.preventDefault()}
            onMouseLeave={() => state.playing && actions.poke()}
            className={cn(
                'relative isolate overflow-hidden bg-black text-white select-none',
                state.fullscreen ? 'h-screen w-screen' : theater ? 'h-[min(78vh,60rem)] w-full' : 'aspect-video w-full rounded-3xl',
                chromeHidden && 'cursor-none',
            )}>
            <ProtectedVideo
                key={src}
                {...videoProps}
                src={src}
                poster={poster}
                onEnded={() => {
                    setEndedFor(src)
                    onEnded?.()
                }}
                className="absolute inset-0 h-full w-full object-contain"
            />

            <TapLayer playing={state.playing} onToggle={actions.toggle} onSeekBy={actions.seekBy} onActivity={actions.poke} />

            {state.waiting && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    <Spinner className="size-10 border-2 text-white" />
                </div>
            )}

            {state.autoMuted && (
                <button
                    type="button"
                    onClick={actions.toggleMute}
                    className="absolute top-14 left-4 z-40 flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-[1.03] sm:top-16 sm:left-5 sm:h-10">
                    <VolumeX className="size-4" />

                    {PLAYER.tapToUnmute}
                </button>
            )}

            {captions && <CaptionTrack lines={PLAYER.captionLines} current={state.current} raised={!chromeHidden} />}

            <div
                className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 z-30 bg-linear-to-b from-black/70 to-transparent px-4 pt-3 pb-10 transition-opacity duration-500 sm:px-5 sm:pt-4 sm:pb-14',
                    chromeHidden && 'opacity-0',
                )}>
                {eyebrow && <p className="text-[0.7rem] text-white/70 sm:text-xs">{eyebrow}</p>}

                <p className="text-sm font-semibold tracking-[-0.02em] sm:text-xl">{title}</p>
            </div>

            {side && (
                <div
                    className={cn(
                        'absolute top-1/2 right-5 z-30 hidden -translate-y-1/2 transition-all duration-500 md:block',
                        chromeHidden && 'translate-x-4 opacity-0',
                    )}>
                    {side}
                </div>
            )}

            <AnimatePresence>
                {drawerOpen && drawer && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="absolute inset-x-3 bottom-24 z-30 sm:inset-x-5">
                        {drawer}
                    </motion.div>
                )}
            </AnimatePresence>

            <ControlBar
                state={state}
                actions={actions}
                hidden={chromeHidden}
                theater={theater}
                captions={captions}
                quality={quality}
                episodesOpen={drawerOpen}
                onCaptions={() => setCaptions((value) => !value)}
                onQuality={setQuality}
                onTheater={onTheater}
                onNext={next?.onPlay}
                onEpisodes={drawer ? () => setDrawerOpen((value) => !value) : undefined}
            />

            <AnimatePresence>{ended && autoNext && next && <NextUpCard key={src} next={next} onCancel={() => setEndedFor(null)} />}</AnimatePresence>
        </div>
    )
}
