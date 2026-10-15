'use client'

import { ArrowUpDown } from 'lucide-react'
import { BROWSE } from '@/data'
import { useBrowseQuery } from '../hooks'

export function SortSelect() {
    const { sort, update } = useBrowseQuery()

    return (
        <label className="relative flex h-10 items-center gap-2 rounded-full bg-background pr-3 pl-4 text-sm">
            <ArrowUpDown className="size-3.5 text-muted" />

            <span className="hidden text-muted sm:inline">{BROWSE.sortLabel}</span>

            <select
                value={sort}
                onChange={(event) => update({ sort: event.target.value })}
                className="cursor-pointer bg-transparent pr-1 font-semibold outline-none">
                {BROWSE.sorts.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}
