import type { ReactNode } from 'react'
import { FadeUp } from '@/components'
import { cn } from '@/lib'

type SettingsCardProps = {
    title: string
    children: ReactNode
    delay?: number
    className?: string
}

export function SettingsCard({ title, children, delay = 0, className }: SettingsCardProps) {
    return (
        <FadeUp delay={delay} className={cn('min-w-0 rounded-[1.75rem] border border-line bg-surface p-5 sm:p-7', className)}>
            <h2 className="mb-4 text-lg font-semibold tracking-[-0.02em]">{title}</h2>

            {children}
        </FadeUp>
    )
}
