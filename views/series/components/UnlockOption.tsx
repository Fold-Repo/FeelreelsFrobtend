import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib'

type UnlockOptionProps = {
    icon: ReactNode
    title: string
    note?: string
    tone: string
    disabled?: boolean
    onClick: () => void
}

export function UnlockOption({ icon, title, note, tone, disabled, onClick }: UnlockOptionProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn('group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-transform hover:scale-[0.99] disabled:opacity-50', tone)}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-ink">{icon}</span>

            <span className="flex-1">
                <span className="block text-sm font-semibold">{title}</span>

                {note && <span className="block text-xs opacity-60">{note}</span>}
            </span>

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
    )
}
