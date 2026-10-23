'use client'

import { FilterTabs } from '@/components'
import { WATCH } from '@/data'
import { useViewer } from '@/hooks'
import { cn, interpolate, isPlayable } from '@/lib'
import type { Episode, Series } from '@/types'
import { EpisodeTile } from './EpisodeTile'
import { useEpisodeRanges } from './useEpisodeRanges'

type EpisodePanelProps = {
    series: Series
    episodes: Episode[]
    current: number
    onSelect: (number: number) => void
    dark: boolean
    className?: string
}

export function EpisodePanel({ series, episodes, current, onSelect, dark, className }: EpisodePanelProps) {
    const { viewer } = useViewer()
    const { ranges, range, setRange, visible } = useEpisodeRanges(episodes, current)

    return (
        <div
            className={cn(
                'flex flex-col rounded-[1.75rem] p-5 transition-colors duration-700',
                dark ? 'bg-night-soft text-white' : 'border border-line bg-surface',
                className,
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
                        locked={!isPlayable(viewer, series.slug, episode)}
                        dark={dark}
                        onSelect={() => onSelect(episode.number)}
                    />
                ))}
            </div>
        </div>
    )
}
