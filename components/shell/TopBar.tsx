'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { Download, Menu } from 'lucide-react'
import { APP_SHELL } from '@/data'
import { useAppDownload } from '@/hooks'
import { LogoMark } from '../layout/Logo'
import { SearchBox } from './SearchBox'
import { TokenChip } from './TokenChip'
import { UserButton } from './UserButton'

export function TopBar({ onMenu }: { onMenu: () => void }) {
    const { show } = useAppDownload()

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-line bg-surface/85 px-3 backdrop-blur-xl sm:h-[4.5rem] sm:gap-3 sm:px-6">
            <button
                type="button"
                onClick={onMenu}
                aria-label={APP_SHELL.menu}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background lg:hidden">
                <Menu className="size-4" />
            </button>

            <Link href="/" aria-label={APP_SHELL.backToSite} className="shrink-0 lg:hidden">
                <LogoMark className="size-10" />
            </Link>

            <Suspense>
                <SearchBox />
            </Suspense>

            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button
                    type="button"
                    onClick={show}
                    aria-label={APP_SHELL.download}
                    className="hidden h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:bg-background xl:flex">
                    <Download className="size-4" />

                    {APP_SHELL.download}
                </button>

                <TokenChip />

                <UserButton />
            </div>
        </header>
    )
}
