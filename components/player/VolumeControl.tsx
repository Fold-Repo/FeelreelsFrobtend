'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { PLAYER } from '@/data'
import { PlayerButton } from './PlayerButton'

type VolumeControlProps = {
    volume: number
    muted: boolean
    onVolume: (value: number) => void
    onMute: () => void
}

export function VolumeControl({ volume, muted, onVolume, onMute }: VolumeControlProps) {
    const level = muted ? 0 : volume
    const Icon = level === 0 ? VolumeX : level < 0.5 ? Volume1 : Volume2

    return (
        <div className="group/volume flex items-center">
            <PlayerButton label={muted ? PLAYER.unmute : PLAYER.mute} onClick={onMute}>
                <Icon />
            </PlayerButton>

            <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={level}
                aria-label={PLAYER.volume}
                onChange={(event) => onVolume(Number(event.target.value))}
                style={{ background: `linear-gradient(90deg, #fff ${level * 100}%, rgba(255,255,255,0.25) ${level * 100}%)` }}
                className="hidden h-1 w-0 cursor-pointer appearance-none rounded-full opacity-0 transition-all duration-300 group-hover/volume:mr-2 group-hover/volume:w-20 group-hover/volume:opacity-100 focus:mr-2 focus:w-20 focus:opacity-100 sm:block [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
        </div>
    )
}
