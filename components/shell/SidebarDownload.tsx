'use client'

import { Download } from 'lucide-react'
import { APP_SHELL } from '@/data'
import { useAppDownload } from '@/hooks'
import { cn } from '@/lib'

export function SidebarDownload({ collapsed }: { collapsed: boolean }) {
    const { show } = useAppDownload()

    return (
        <div className="shrink-0 border-t border-line p-3">
            <button
                type="button"
                onClick={show}
                title={APP_SHELL.download}
                className={cn(
                    'flex h-12 w-full items-center gap-3 rounded-2xl bg-sky/70 px-4 text-sm font-medium transition-colors hover:bg-sky',
                    collapsed && 'justify-center px-0',
                )}>
                <Download className="size-4" />

                {!collapsed && APP_SHELL.download}
            </button>
        </div>
    )
}
