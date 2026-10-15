import type { ReactNode } from 'react'
import { cn } from '@/lib'

type PlayerButtonProps = {
    label: string
    onClick: () => void
    active?: boolean
    className?: string
    children: ReactNode
}

export function PlayerButton({ label, onClick, active, className, children }: PlayerButtonProps) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-full transition-all hover:bg-white/15 active:scale-90 [&_svg]:size-4',
                active && 'bg-white text-ink hover:bg-white',
                className,
            )}>
            {children}
        </button>
    )
}
