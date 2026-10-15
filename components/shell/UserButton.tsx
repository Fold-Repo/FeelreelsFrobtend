'use client'

import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { NAV_ACTIONS } from '@/constants'
import { useViewer } from '@/hooks'

export function UserButton() {
    const { viewer } = useViewer()

    if (viewer.user) {
        return (
            <Link
                href="/settings"
                aria-label={NAV_ACTIONS.settings}
                className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-blush to-butter text-sm font-semibold">
                {viewer.user.name.charAt(0).toUpperCase()}
            </Link>
        )
    }

    return (
        <Link
            href="/login"
            className="flex h-10 items-center gap-2 rounded-full border border-line px-3 text-sm font-medium transition-colors hover:bg-background sm:px-4">
            <UserRound className="size-4" />

            <span className="hidden sm:inline">{NAV_ACTIONS.signIn}</span>
        </Link>
    )
}
