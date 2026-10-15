'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { PLAYER } from '@/data'
import { EASE, interpolate } from '@/lib'

const SECONDS = 6

export type NextUp = {
    title: string
    poster: string
    onPlay: () => void
}

export function NextUpCard({ next, onCancel }: { next: NextUp; onCancel: () => void }) {
    const [left, setLeft] = useState(SECONDS)
    const { onPlay } = next

    useEffect(() => {
        if (left <= 0) {
            onPlay()

            return
        }

        const timer = setTimeout(() => setLeft((value) => value - 1), 1000)

        return () => clearTimeout(timer)
    }, [left, onPlay])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute bottom-24 left-1/2 z-40 flex w-[min(26rem,calc(100%-2rem))] -translate-x-1/2 items-center gap-3 rounded-full bg-white p-2 pr-2 text-ink shadow-2xl">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <Image src={next.poster} alt="" fill sizes="48px" className="object-cover" />
            </span>

            <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted">{interpolate(PLAYER.upNext.countdown, { seconds: left })}</span>

                <span className="block truncate text-sm font-semibold">{next.title}</span>
            </span>

            <button
                type="button"
                onClick={onCancel}
                aria-label={PLAYER.upNext.cancel}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                <X className="size-4" />
            </button>

            <button
                type="button"
                onClick={onPlay}
                aria-label={PLAYER.upNext.playNow}
                className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
                    <motion.circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: SECONDS, ease: 'linear' }}
                    />
                </svg>

                <Play className="ml-0.5 size-4 fill-current" />
            </button>
        </motion.div>
    )
}
