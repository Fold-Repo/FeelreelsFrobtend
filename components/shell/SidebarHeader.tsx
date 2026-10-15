import Link from 'next/link'
import { Menu } from 'lucide-react'
import { APP_SHELL } from '@/data'
import { cn } from '@/lib'
import { LogoMark } from '../layout/Logo'

export function SidebarHeader({ collapsed, onMenu }: { collapsed: boolean; onMenu: () => void }) {
    return (
        <div className={cn('flex h-[4.5rem] shrink-0 items-center gap-3 px-5', collapsed && 'justify-center px-0')}>
            <button
                type="button"
                onClick={onMenu}
                aria-label={APP_SHELL.menu}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background transition-colors hover:bg-line">
                <Menu className="size-4" />
            </button>

            {!collapsed && (
                <Link href="/" aria-label={APP_SHELL.backToSite} className="flex items-center gap-2">
                    <LogoMark className="size-9" />

                    <span className="text-xl font-bold tracking-[-0.055em]">
                        feel<span className="font-normal opacity-55">reels</span>
                    </span>
                </Link>
            )}
        </div>
    )
}
