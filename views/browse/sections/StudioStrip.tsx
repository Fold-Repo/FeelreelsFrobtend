'use client'

import { ScrollRow } from '@/components'
import { BROWSE } from '@/data'
import { cn, STUDIOS } from '@/lib'
import { useBrowseQuery } from '../hooks'

const TONES = [
    'from-accent to-gold text-white',
    'from-night to-night-soft text-white',
    'from-sky to-blush text-ink',
    'from-mint to-sky text-ink',
    'from-butter to-gold text-ink',
    'from-blush to-accent text-white',
]

export function StudioStrip() {
    const { studio, update } = useBrowseQuery()

    return (
        <ScrollRow className="pt-4 pb-3 sm:pt-6 sm:pb-4" trackClassName="gap-3 sm:gap-5" activeKey={studio}>
            <div role="group" aria-label={BROWSE.studiosLabel} className="flex gap-3 sm:gap-5">
                {STUDIOS.map((item, index) => {
                    const active = item.name === studio
                    const initials = item.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .slice(0, 2)

                    return (
                        <button
                            key={item.name}
                            type="button"
                            aria-pressed={active}
                            title={item.name}
                            onClick={() => update({ studio: active ? null : item.name })}
                            className="group flex w-16 shrink-0 flex-col items-center gap-1.5 sm:w-20 sm:gap-2">
                            <span
                                className={cn(
                                    'flex size-12 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold tracking-[-0.04em] ring-2 ring-offset-2 ring-offset-surface transition-all duration-300 group-hover:scale-105 sm:size-16 sm:text-lg',
                                    TONES[index % TONES.length],
                                    active ? 'ring-accent' : 'ring-transparent',
                                )}>
                                {initials}
                            </span>

                            <span
                                className={cn(
                                    'line-clamp-2 w-full text-center text-[0.7rem] leading-snug sm:text-xs',
                                    active ? 'font-semibold' : 'text-muted',
                                )}>
                                {item.name}
                            </span>
                        </button>
                    )
                })}
            </div>
        </ScrollRow>
    )
}
