'use client'

import { type MouseEvent, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FastForward, Pause, Play, Rewind } from 'lucide-react'
import { PLAYER } from '@/data'
import { interpolate } from '@/lib'

type Flash = { id: number; kind: 'play' | 'pause' | 'back' | 'forward' }

type TapLayerProps = {
    playing: boolean
    onToggle: () => void
    onSeekBy: (seconds: number) => void
    onActivity: () => void
}

export function TapLayer({ playing, onToggle, onSeekBy, onActivity }: TapLayerProps) {
    const [flash, setFlash] = useState<Flash | null>(null)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const show = (kind: Flash['kind']) => setFlash({ id: Date.now(), kind })

    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const zone = (event.clientX - rect.left) / rect.width

        onActivity()

        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = null

            if (zone < 0.35) {
                onSeekBy(-10)
                show('back')
            } else if (zone > 0.65) {
                onSeekBy(10)
                show('forward')
            }

            return
        }

        timer.current = setTimeout(() => {
            timer.current = null
            onToggle()
            show(playing ? 'pause' : 'play')
        }, 220)
    }

    const Icon = { play: Play, pause: Pause, back: Rewind, forward: FastForward }[flash?.kind ?? 'play']
    const side = flash?.kind === 'back' ? 'left-[12%]' : flash?.kind === 'forward' ? 'right-[12%]' : 'left-1/2 -translate-x-1/2'

    return (
        <>
            <button
                type="button"
                aria-label={playing ? PLAYER.pause : PLAYER.play}
                onClick={onClick}
                onMouseMove={onActivity}
                className="absolute inset-0 z-10 cursor-default"
            />

            <AnimatePresence>
                {flash && (
                    <motion.div
                        key={flash.id}
                        initial={{ opacity: 0.9, scale: 0.6 }}
                        animate={{ opacity: 0, scale: 1.4 }}
                        transition={{ duration: 0.6 }}
                        onAnimationComplete={() => setFlash(null)}
                        className={`pointer-events-none absolute top-1/2 z-20 flex size-20 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-black/45 text-white backdrop-blur-sm ${side}`}>
                        <Icon className="size-7 fill-current" />

                        {(flash.kind === 'back' || flash.kind === 'forward') && (
                            <span className="text-[0.65rem] font-semibold">{interpolate(PLAYER.seconds, { count: 10 })}</span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
