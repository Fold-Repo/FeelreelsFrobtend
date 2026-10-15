'use client'

import { cn } from '@/lib'
import { ScrollRow } from './ScrollRow'

export type FilterOption = {
    label: string
    value: string
}

export type FilterTabsProps = {
    options: FilterOption[]
    value: string
    onChange: (value: string) => void
    label: string
    id: string
    className?: string
}

export function FilterTabs({ options, value, onChange, label, id, className }: FilterTabsProps) {
    return (
        <ScrollRow className={className} activeKey={value}>
            <div id={id} role="tablist" aria-label={label} className="flex gap-2">
                {options.map((option) => {
                    const active = option.value === value

                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                'h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-300',
                                active ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface text-muted hover:text-ink',
                            )}>
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </ScrollRow>
    )
}
