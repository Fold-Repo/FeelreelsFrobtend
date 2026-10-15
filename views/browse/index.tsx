'use client'

import { FilterBar, Results, StudioStrip } from './sections'

export default function BrowseView() {
    return (
        <div className="px-4 pb-6 sm:px-6">
            <StudioStrip />

            <FilterBar />

            <Results />
        </div>
    )
}
