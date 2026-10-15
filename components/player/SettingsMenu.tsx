'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Settings } from 'lucide-react'
import { PLAYER } from '@/data'
import { useClickOutside } from '@/hooks'
import { cn, EASE } from '@/lib'
import { PlayerButton } from './PlayerButton'

type SettingsMenuProps = {
    rate: number
    quality: string
    onRate: (value: number) => void
    onQuality: (value: string) => void
}

export function SettingsMenu({ rate, quality, onRate, onQuality }: SettingsMenuProps) {
    const [open, setOpen] = useState(false)
    const [panel, setPanel] = useState<'main' | 'speed' | 'quality'>('main')
    const ref = useRef<HTMLDivElement>(null)
    const close = useCallback(() => setOpen(false), [])
    const speedLabel = (value: number) => (value === 1 ? PLAYER.normal : `${value}×`)

    useClickOutside(ref, close)

    const options =
        panel === 'speed'
            ? PLAYER.speeds.map((value) => ({ label: speedLabel(value), active: value === rate, pick: () => onRate(value) }))
            : PLAYER.qualities.map((value) => ({ label: value, active: value === quality, pick: () => onQuality(value) }))

    return (
        <div ref={ref} className="relative">
            <PlayerButton
                label={PLAYER.settings}
                active={open}
                onClick={() => {
                    setOpen(!open)
                    setPanel('main')
                }}>
                <Settings className={cn('transition-transform duration-500', open && 'rotate-90')} />
            </PlayerButton>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="absolute right-0 bottom-12 w-48 origin-bottom-right rounded-2xl bg-black/85 p-1.5 text-xs whitespace-nowrap backdrop-blur-xl sm:w-60 sm:text-sm">
                        {panel === 'main' ? (
                            <>
                                <Row label={PLAYER.speed} value={speedLabel(rate)} onClick={() => setPanel('speed')} />

                                <Row label={PLAYER.quality} value={quality} onClick={() => setPanel('quality')} />
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setPanel('main')}
                                    className="flex h-10 w-full items-center gap-2 border-b border-white/10 px-2 font-medium">
                                    <ChevronLeft className="size-4" />

                                    {panel === 'speed' ? PLAYER.speed : PLAYER.quality}
                                </button>

                                {options.map((option) => (
                                    <button
                                        key={option.label}
                                        type="button"
                                        onClick={() => {
                                            option.pick()
                                            setPanel('main')
                                        }}
                                        className="flex h-9 w-full items-center justify-between rounded-xl px-3 hover:bg-white/10">
                                        {option.label}

                                        {option.active && <Check className="size-4 text-accent" />}
                                    </button>
                                ))}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function Row({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} className="flex h-9 w-full items-center justify-between gap-3 rounded-xl px-3 hover:bg-white/10 sm:h-10">
            {label}

            <span className="flex items-center gap-1 text-white/60">
                {value}

                <ChevronRight className="size-4" />
            </span>
        </button>
    )
}
