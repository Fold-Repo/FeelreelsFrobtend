'use client'

import Link from 'next/link'
import { Crown, Plus } from 'lucide-react'
import { NAV_ACTIONS } from '@/constants'
import { useWallet } from '@/hooks'
import { cn } from '@/lib'

export function TokenChip({ className }: { className?: string }) {
    const { data } = useWallet()

    if (data?.vipActive) {
        return (
            <Link href="/settings" className={cn('flex h-10 items-center gap-2 rounded-full bg-night pr-4 pl-1.5 text-sm font-semibold text-white', className)}>
                <span className="flex size-7 items-center justify-center rounded-full bg-gold text-ink">
                    <Crown className="size-3.5" />
                </span>

                {NAV_ACTIONS.vip}
            </Link>
        )
    }

    return (
        <Link
            href="/settings"
            aria-label={NAV_ACTIONS.settings}
            className={cn('group flex h-10 items-center gap-2 rounded-full border border-line bg-surface pr-3 pl-1.5 text-sm sm:pr-1.5', className)}>
            <span className="flex size-7 items-center justify-center rounded-full bg-linear-to-br from-gold to-[#e8952a] text-[0.7rem] font-bold text-white shadow-inner">
                ¢
            </span>

            <span className="font-semibold tabular-nums">{data?.coinBalance ?? 0}</span>

            <span className="hidden size-7 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-primary group-hover:text-on-primary sm:flex">
                <Plus className="size-3.5" />
            </span>
        </Link>
    )
}
