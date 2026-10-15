'use client'

import { FilterTabs } from '@/components'
import { BROWSE } from '@/data'
import { CATEGORIES } from '@/lib'
import { FilterMenu } from '../components/FilterMenu'
import { SortSelect } from '../components/SortSelect'
import { useBrowseQuery } from '../hooks'

const OPTIONS = [{ label: BROWSE.all, value: '' }, ...CATEGORIES.map((category) => ({ label: category.label, value: category.slug }))]

export function FilterBar() {
    const { category, update } = useBrowseQuery()

    return (
        <div className="sticky top-16 z-30 -mx-4 flex flex-col gap-3 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur-xl sm:top-[4.5rem] sm:-mx-6 sm:px-6 lg:flex-row lg:items-center">
            <FilterTabs
                id="genre"
                label={BROWSE.genresLabel}
                options={OPTIONS}
                value={category}
                onChange={(value) => update({ category: value })}
                className="min-w-0 flex-1"
            />

            <div className="flex shrink-0 items-center gap-2">
                <FilterMenu />

                <SortSelect />
            </div>
        </div>
    )
}
