import { Lock } from 'lucide-react'
import { LABELS } from '@/constants'
import { WATCH } from '@/data'
import { cn, interpolate } from '@/lib'
import type { Episode } from '@/types'

type EpisodeTileProps = {
    episode: Episode
    active: boolean
    locked: boolean
    dark: boolean
    onSelect: () => void
}

export function EpisodeTile({ episode, active, locked, dark, onSelect }: EpisodeTileProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={active ? 'true' : undefined}
            aria-label={interpolate(WATCH.episode, { number: episode.number })}
            className={cn(
                'relative flex h-12 items-center justify-center rounded-xl text-sm font-medium tabular-nums transition-colors',
                dark ? 'bg-white/[0.06] hover:bg-white/15' : 'bg-background hover:bg-line',
                active && 'bg-accent text-white hover:bg-accent',
                locked && !active && 'opacity-55',
            )}>
            <span className={cn('relative', episode.isFree && !active && '-mt-2')}>{episode.number}</span>

            {locked && <Lock className="absolute top-1 right-1 size-2.5" />}

            {episode.isFree && !active && <span className="absolute bottom-0.5 text-[0.55rem] leading-none text-accent">{LABELS.free}</span>}
        </button>
    )
}
