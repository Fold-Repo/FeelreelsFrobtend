'use client'

import { useState } from 'react'
import { FilterTabs } from '@/components'
import { WATCH } from '@/data'
import { useViewer } from '@/hooks'
import { cn, interpolate } from '@/lib'
import type { Episode, Series } from '@/types'
import { EpisodeTile } from './EpisodeTile'

const RANGE = 30

type EpisodePanelProps = {
    series: Series
    episodes: Episode[]
    current: number
    onSelect: (number: number) => void
    dark: boolean
}

export function EpisodePanel({ series, episodes, current, onSelect, dark }: EpisodePanelProps) {
    const { canWatch } = useViewer()
    const ranges = Array.from({ length: Math.ceil(episodes.length / RANGE) }, (_, index) => {
        const start = index * RANGE + 1

        return { label: `${start}–${Math.min(start + RANGE - 1, episodes.length)}`, value: String(index) }
    })
    const [range, setRange] = useState(String(Math.floor((current - 1) / RANGE)))
    const visible = episodes.slice(Number(range) * RANGE, Number(range) * RANGE + RANGE)

    return (
        <div
            className={cn(
                'flex flex-col rounded-[1.75rem] p-5 transition-colors duration-700',
                dark ? 'bg-night-soft text-white' : 'border border-line bg-surface',
            )}>
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">{WATCH.episodes}</h2>

                <p className={cn('text-xs', dark ? 'text-white/50' : 'text-muted')}>{interpolate(WATCH.freeNote, { count: series.freeEpisodes })}</p>
            </div>

            {ranges.length > 1 && (
                <FilterTabs
                    id="ranges"
                    label={WATCH.episodes}
                    options={ranges}
                    value={range}
                    onChange={setRange}
                    className="mt-4 [&_button]:h-8 [&_button]:text-xs"
                />
            )}

            <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] gap-2">
                {visible.map((episode) => (
                    <EpisodeTile
                        key={episode.number}
                        episode={episode}
                        active={episode.number === current}
                        locked={!canWatch(series, episode.number)}
                        dark={dark}
                        onSelect={() => onSelect(episode.number)}
                    />
                ))}
            </div>
        </div>
    )
}
