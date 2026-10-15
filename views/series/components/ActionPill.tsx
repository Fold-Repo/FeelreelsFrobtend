import type { ReactNode } from 'react'
import { cn } from '@/lib'

type ActionPillProps = {
    label: string
    icon: ReactNode
    active?: boolean
    onClick?: () => void
    children: ReactNode
}

export function ActionPill({ label, icon, active, onClick, children }: ActionPillProps) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                active ? 'bg-ink text-surface' : 'bg-background hover:bg-line',
            )}>
            {icon}

            {children}
        </button>
    )
}
