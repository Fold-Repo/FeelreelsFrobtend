import type { ReactNode } from 'react'
import { cn } from '@/lib'

type ReelActionProps = {
    icon: ReactNode
    label: string
    title: string
    active?: boolean
    onClick: () => void
}

export function ReelAction({ icon, label, title, active, onClick }: ReelActionProps) {
    return (
        <button type="button" onClick={onClick} aria-label={title} aria-pressed={active} className="flex flex-col items-center gap-1 active:scale-90">
            <span className={cn('flex size-11 items-center justify-center rounded-full bg-white/15', active && 'bg-white/25')}>{icon}</span>

            <span className="text-[0.7rem] font-medium">{label}</span>
        </button>
    )
}
