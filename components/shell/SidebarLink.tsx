'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib'

type SidebarLinkProps = {
    href: string
    label: string
    icon: ReactNode
    active: boolean
    collapsed: boolean
    onNavigate?: () => void
}

export function SidebarLink({ href, label, icon, active, collapsed, onNavigate }: SidebarLinkProps) {
    return (
        <Link
            href={href}
            title={collapsed ? label : undefined}
            onClick={onNavigate}
            className={cn(
                'flex h-10 shrink-0 items-center gap-3.5 rounded-2xl px-3.5 text-sm transition-colors',
                active ? 'bg-background font-semibold text-ink' : 'text-ink/70 hover:bg-background/70 hover:text-ink',
                collapsed && 'justify-center px-0',
            )}>
            <span className="shrink-0 [&_svg]:size-[1.15rem]">{icon}</span>

            {!collapsed && <span className="truncate">{label}</span>}
        </Link>
    )
}
