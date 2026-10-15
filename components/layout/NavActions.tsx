'use client'

import { Download } from 'lucide-react'
import { NAV_ACTIONS } from '@/constants'
import { useAppDownload } from '@/hooks'
import { UserButton } from '../shell'
import { ButtonLink } from '../ui'

export function NavActions() {
    const { show } = useAppDownload()

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={show}
                aria-label={NAV_ACTIONS.getApp}
                title={NAV_ACTIONS.getApp}
                className="hidden size-10 items-center justify-center rounded-full border border-line transition-colors hover:bg-background sm:flex">
                <Download className="size-4" />
            </button>

            <span className="hidden sm:block">
                <UserButton />
            </span>

            <ButtonLink href="/browse" size="md" className="h-9 px-4 text-sm sm:h-10 sm:px-5">
                {NAV_ACTIONS.start}
            </ButtonLink>
        </div>
    )
}
