'use client'

import { type PointerEvent, useRef, useState } from 'react'
import { PLAYER } from '@/data'
import { formatTime } from '@/lib'

type ScrubberProps = {
    current: number
    duration: number
    buffered: number
    onSeek: (ratio: number) => void
}

export function Scrubber({ current, duration, buffered, onSeek }: ScrubberProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [hover, setHover] = useState<number | null>(null)
    const [dragging, setDragging] = useState(false)
    const played = duration ? (current / duration) * 100 : 0
    const loaded = duration ? (buffered / duration) * 100 : 0

    const ratioAt = (event: PointerEvent) => {
        const rect = ref.current?.getBoundingClientRect()

        return rect ? Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1) : 0
    }

    return (
        <div
            ref={ref}
            role="slider"
            tabIndex={0}
            aria-label={PLAYER.seek}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            className="group/scrub relative flex h-5 cursor-pointer touch-none items-center"
            onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId)
                setDragging(true)
                onSeek(ratioAt(event))
            }}
            onPointerMove={(event) => {
                setHover(ratioAt(event))

                if (dragging) onSeek(ratioAt(event))
            }}
            onPointerUp={() => setDragging(false)}
            onPointerLeave={() => setHover(null)}>
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 transition-[height] group-hover/scrub:h-1.5">
                <div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: `${loaded}%` }} />

                {hover !== null && <div className="absolute inset-y-0 left-0 bg-white/25" style={{ width: `${hover * 100}%` }} />}

                <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${played}%` }} />
            </div>

            <span
                className="absolute size-3.5 -translate-x-1/2 scale-0 rounded-full bg-white shadow-md transition-transform group-hover/scrub:scale-100"
                style={{ left: `${played}%` }}
            />

            {hover !== null && duration > 0 && (
                <span
                    className="pointer-events-none absolute bottom-6 -translate-x-1/2 rounded-lg bg-black/80 px-2 py-1 text-xs font-medium tabular-nums"
                    style={{ left: `${hover * 100}%` }}>
                    {formatTime(hover * duration)}
                </span>
            )}
        </div>
    )
}
