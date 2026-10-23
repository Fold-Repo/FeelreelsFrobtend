'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Coins, Crown, Lock, Play } from 'lucide-react'
import { WATCH } from '@/data'
import { useToast, useViewer, useWallet } from '@/hooks'
import { EASE, interpolate } from '@/lib'
import { ApiError, unlockEpisode } from '@/lib/api'
import type { Episode, Series } from '@/types'
import { UnlockOption } from './UnlockOption'

export function LockedOverlay({ series, episode }: { series: Series; episode: Episode }) {
    const client = useQueryClient()
    const { viewer, unlock } = useViewer()
    const { data: wallet } = useWallet()
    const { showSuccess, showError, showInfo } = useToast()
    const [pending, setPending] = useState(false)
    const labels = WATCH.locked
    const coins = wallet?.coinBalance ?? viewer.tokens
    const cost = episode.coinCost ?? 0

    const payWithCoins = async () => {
        if (pending) return

        setPending(true)

        try {
            await unlockEpisode(series.slug, episode.number, 'coins')
            unlock(series.slug, episode.number)
            await client.invalidateQueries({ queryKey: ['wallet'] })
            showSuccess(WATCH.toasts.unlockedToken)
        } catch (error) {
            showError(error instanceof ApiError ? error.message : 'Could not unlock this episode.')
        } finally {
            setPending(false)
        }
    }

    const goVip = () => {
        showInfo('VIP is purchased from a signed-in account.')
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <Image src={series.poster} alt="" fill sizes="800px" className="scale-110 object-cover opacity-40 blur-2xl" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative max-h-full w-full max-w-sm overflow-y-auto rounded-2xl bg-surface/95 p-3 text-ink shadow-2xl backdrop-blur-xl sm:rounded-[1.75rem] sm:p-5">
                <span className="hidden size-11 items-center justify-center rounded-full bg-primary text-on-primary sm:flex">
                    <Lock className="size-4" />
                </span>

                <h3 className="text-base font-semibold tracking-[-0.02em] sm:mt-4 sm:text-xl">{interpolate(labels.title, { number: episode.number })}</h3>

                <p className="mt-1 hidden text-sm text-muted sm:block">{labels.text}</p>

                <div className="mt-2 space-y-1.5 sm:mt-5 sm:space-y-2">
                    <UnlockOption icon={<Play className="size-4 fill-current" />} title={labels.ad} tone="bg-blush" onClick={() => showInfo('Rewarded ads are not available on the web yet.')} />

                    <UnlockOption
                        icon={<Coins className="size-4" />}
                        title={labels.token}
                        note={coins ? interpolate(labels.tokenBalance, { count: coins }) : labels.noTokens}
                        tone="bg-butter"
                        disabled={pending || coins < cost}
                        onClick={() => void payWithCoins()}
                    />

                    <UnlockOption icon={<Crown className="size-4" />} title={labels.vip} tone="bg-primary text-on-primary" onClick={goVip} />
                </div>

                {!viewer.user && (
                    <Link href="/login" className="mt-4 hidden text-center text-xs text-muted underline-offset-4 hover:underline sm:block">
                        {labels.signIn}
                    </Link>
                )}
            </motion.div>
        </div>
    )
}
