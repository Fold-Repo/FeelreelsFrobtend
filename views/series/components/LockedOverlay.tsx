'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, Crown, Lock, Play } from 'lucide-react'
import { WATCH } from '@/data'
import { useToast, useViewer } from '@/hooks'
import { EASE, interpolate } from '@/lib'
import type { Episode, Series } from '@/types'
import { AdBreakModal } from './AdBreakModal'
import { UnlockOption } from './UnlockOption'

export function LockedOverlay({ series, episode }: { series: Series; episode: Episode }) {
    const { viewer, unlock, setVip } = useViewer()
    const { showSuccess } = useToast()
    const [adOpen, setAdOpen] = useState(false)
    const labels = WATCH.locked

    const payWithToken = () => {
        unlock(series.slug, episode.number, true)
        showSuccess(WATCH.toasts.unlockedToken)
    }

    const goVip = () => {
        setVip(true)
        showSuccess(WATCH.toasts.vip)
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <Image src={series.poster} alt="" fill sizes="800px" className="scale-110 object-cover opacity-40 blur-2xl" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative w-full max-w-sm rounded-[1.75rem] bg-surface/95 p-5 text-ink shadow-2xl backdrop-blur-xl">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-on-primary">
                    <Lock className="size-4" />
                </span>

                <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{interpolate(labels.title, { number: episode.number })}</h3>

                <p className="mt-1 text-sm text-muted">{labels.text}</p>

                <div className="mt-5 space-y-2">
                    <UnlockOption icon={<Play className="size-4 fill-current" />} title={labels.ad} tone="bg-blush" onClick={() => setAdOpen(true)} />

                    <UnlockOption
                        icon={<Coins className="size-4" />}
                        title={labels.token}
                        note={viewer.tokens ? interpolate(labels.tokenBalance, { count: viewer.tokens }) : labels.noTokens}
                        tone="bg-butter"
                        disabled={!viewer.tokens}
                        onClick={payWithToken}
                    />

                    <UnlockOption icon={<Crown className="size-4" />} title={labels.vip} tone="bg-primary text-on-primary" onClick={goVip} />
                </div>

                {!viewer.user && (
                    <Link href="/login" className="mt-4 block text-center text-xs text-muted underline-offset-4 hover:underline">
                        {labels.signIn}
                    </Link>
                )}
            </motion.div>

            <AdBreakModal
                isOpen={adOpen}
                onOpenChange={setAdOpen}
                onComplete={() => {
                    unlock(series.slug, episode.number)
                    showSuccess(WATCH.toasts.unlockedAd)
                }}
            />
        </div>
    )
}
