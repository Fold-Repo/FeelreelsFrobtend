'use client'

import { FilterTabs } from '@/components'
import { BROWSE } from '@/data'
import { useCatalog } from '@/hooks'
import { categoriesFrom } from '@/lib'
import { FilterMenu } from '../components/FilterMenu'
import { SortSelect } from '../components/SortSelect'
import { useBrowseQuery } from '../hooks'

export function FilterBar() {
    const { data: series = [] } = useCatalog()
    const options = [{ label: BROWSE.all, value: '' }, ...categoriesFrom(series).map((category) => ({ label: category.label, value: category.slug }))]
    const { category, update } = useBrowseQuery()

    return (
        <div className="sticky top-16 z-30 -mx-4 flex flex-col gap-3 border-b border-line bg-surface px-4 py-3 sm:top-[4.5rem] sm:-mx-6 sm:bg-surface/90 sm:px-6 sm:backdrop-blur-xl lg:flex-row lg:items-center">
            <FilterTabs
                id="genre"
                label={BROWSE.genresLabel}
                options={options}
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
