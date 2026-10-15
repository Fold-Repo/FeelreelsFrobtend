'use client'

import { ListFilter } from 'lucide-react'
import { WATCH } from '@/data'
import { cn } from '@/lib'

export function SortMenu({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const copy = WATCH.commentsPanel

    return (
        <div role="group" aria-label={copy.sortBy} className="flex items-center gap-1.5">
            <ListFilter className="mr-1 size-4 text-muted" />

            {copy.sorts.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    aria-pressed={value === option.value}
                    onClick={() => onChange(option.value)}
                    className={cn(
                        'h-8 rounded-full px-3 text-xs font-medium transition-colors',
                        value === option.value ? 'bg-ink text-surface' : 'bg-background text-ink/70 hover:text-ink',
                    )}>
                    {option.label}
                </button>
            ))}
        </div>
    )
}
