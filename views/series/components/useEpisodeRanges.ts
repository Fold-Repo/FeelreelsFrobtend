import { useState } from 'react'
import type { Episode } from '@/types'

const RANGE = 30

export function useEpisodeRanges(episodes: Episode[], current: number) {
    const ranges = Array.from({ length: Math.ceil(episodes.length / RANGE) }, (_, index) => {
        const start = index * RANGE + 1

        return { label: `${start}–${Math.min(start + RANGE - 1, episodes.length)}`, value: String(index) }
    })
    const [range, setRange] = useState(String(Math.floor((current - 1) / RANGE)))
    const visible = episodes.slice(Number(range) * RANGE, Number(range) * RANGE + RANGE)

    return { ranges, range, setRange, visible }
}
