'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, SlidersHorizontal } from 'lucide-react'
import { BROWSE } from '@/data'
import { useClickOutside } from '@/hooks'
import { cn, EASE } from '@/lib'
import { useBrowseQuery } from '../hooks'

export function FilterMenu() {
    const { filters, update } = useBrowseQuery()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const close = useCallback(() => setOpen(false), [])

    useClickOutside(ref, close)

    const toggle = (value: string) => {
        const next = filters.includes(value) ? filters.filter((item) => item !== value) : [...filters, value]

        update({ filters: next.join(',') })
    }

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className={cn(
                    'flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
                    filters.length ? 'border-ink bg-ink text-surface' : 'border-line hover:bg-background',
                )}>
                <SlidersHorizontal className="size-4" />

                {BROWSE.filtersLabel}

                {filters.length > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-surface text-xs text-ink">{filters.length}</span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="absolute left-0 z-40 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-3xl border border-line bg-surface p-2 shadow-[0_20px_50px_-20px_rgba(20,20,20,0.3)] sm:right-0 sm:left-auto">
                        {BROWSE.filters.map((filter) => {
                            const active = filters.includes(filter.value)

                            return (
                                <button
                                    key={filter.value}
                                    type="button"
                                    role="menuitemcheckbox"
                                    aria-checked={active}
                                    onClick={() => toggle(filter.value)}
                                    className="flex h-11 w-full items-center justify-between rounded-2xl px-3 text-sm transition-colors hover:bg-background">
                                    {filter.label}

                                    <span
                                        className={cn(
                                            'flex size-5 items-center justify-center rounded-md border',
                                            active ? 'border-ink bg-ink text-surface' : 'border-line',
                                        )}>
                                        {active && <Check className="size-3" />}
                                    </span>
                                </button>
                            )
                        })}

                        {filters.length > 0 && (
                            <button
                                type="button"
                                onClick={() => update({ filters: null })}
                                className="mt-1 h-10 w-full rounded-2xl text-sm text-muted hover:bg-background hover:text-ink">
                                {BROWSE.clear}
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
