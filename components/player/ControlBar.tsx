'use client'

import { Captions, Layers, Maximize, Minimize, Pause, Play, RectangleHorizontal, RotateCcw, RotateCw, SkipForward } from 'lucide-react'
import { PLAYER } from '@/data'
import type { PlayerActions, PlayerState } from '@/hooks'
import { cn, formatTime } from '@/lib'
import { PlayerButton } from './PlayerButton'
import { Scrubber } from './Scrubber'
import { SettingsMenu } from './SettingsMenu'
import { VolumeControl } from './VolumeControl'

export type ControlBarProps = {
    state: PlayerState
    actions: PlayerActions
    hidden: boolean
    theater: boolean
    captions: boolean
    quality: string
    episodesOpen?: boolean
    onCaptions: () => void
    onQuality: (value: string) => void
    onTheater?: () => void
    onNext?: () => void
    onEpisodes?: () => void
}

export function ControlBar({
    state,
    actions,
    hidden,
    theater,
    captions,
    quality,
    episodesOpen,
    onCaptions,
    onQuality,
    onTheater,
    onNext,
    onEpisodes,
}: ControlBarProps) {
    return (
        <div
            className={cn(
                'absolute inset-x-0 bottom-0 z-30 bg-linear-to-t from-black/85 via-black/40 to-transparent px-2 pt-12 pb-1 text-white transition-all duration-500 sm:px-5 sm:pt-16 sm:pb-3',
                hidden && 'pointer-events-none translate-y-3 opacity-0',
            )}>
            <Scrubber current={state.current} duration={state.duration} buffered={state.buffered} onSeek={actions.seekTo} />

            <div className="mt-1 flex items-center gap-0.5 sm:gap-1">
                <PlayerButton label={state.playing ? PLAYER.pause : PLAYER.play} onClick={actions.toggle} className="sm:size-10 sm:[&_svg]:size-5">
                    {state.playing ? <Pause className="fill-current" /> : <Play className="fill-current" />}
                </PlayerButton>

                <PlayerButton label={PLAYER.back} onClick={() => actions.seekBy(-10)} className="hidden sm:flex">
                    <RotateCcw />
                </PlayerButton>

                <PlayerButton label={PLAYER.forward} onClick={() => actions.seekBy(10)} className="hidden sm:flex">
                    <RotateCw />
                </PlayerButton>

                {onNext && (
                    <PlayerButton label={PLAYER.next} onClick={onNext}>
                        <SkipForward />
                    </PlayerButton>
                )}

                <VolumeControl volume={state.volume} muted={state.muted} onVolume={actions.setVolume} onMute={actions.toggleMute} />

                <p className="ml-1 text-xs whitespace-nowrap text-white/80 tabular-nums">
                    {formatTime(state.current)} <span className="text-white/40">/ {formatTime(state.duration)}</span>
                </p>

                {state.rate !== 1 && <span className="ml-2 rounded-md bg-white/15 px-1.5 py-0.5 text-[0.65rem] font-semibold">{state.rate}×</span>}

                <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
                    {onEpisodes && (
                        <PlayerButton label={PLAYER.episodes} onClick={onEpisodes} active={episodesOpen} className="hidden sm:flex">
                            <Layers />
                        </PlayerButton>
                    )}

                    <PlayerButton label={PLAYER.captions} onClick={onCaptions} active={captions} className="hidden sm:flex">
                        <Captions />
                    </PlayerButton>

                    <SettingsMenu rate={state.rate} quality={quality} onRate={actions.setRate} onQuality={onQuality} />

                    {onTheater && !state.fullscreen && (
                        <PlayerButton label={theater ? PLAYER.exitTheater : PLAYER.theater} onClick={onTheater} active={theater} className="hidden md:flex">
                            <RectangleHorizontal />
                        </PlayerButton>
                    )}

                    <PlayerButton label={state.fullscreen ? PLAYER.exitFullscreen : PLAYER.fullscreen} onClick={actions.toggleFullscreen}>
                        {state.fullscreen ? <Minimize /> : <Maximize />}
                    </PlayerButton>
                </div>
            </div>
        </div>
    )
}
