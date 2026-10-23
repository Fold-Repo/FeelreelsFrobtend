'use client'

import { Bookmark, Heart, Share2 } from 'lucide-react'
import { WATCH } from '@/data'
import { useEngagement, useShareSeries } from '@/hooks'
import { cn, formatCount } from '@/lib'
import type { Series } from '@/types'

export function PlayerRail({ series, episode }: { series: Series; episode: number }) {
    const { liked, saved, likeCount, toggleLike, toggleSave } = useEngagement(series.slug)

    const share = useShareSeries(series, episode)

    const items = [
        {
            label: WATCH.like,
            active: liked,
            onClick: toggleLike,
            icon: <Heart className={cn('size-4', liked && 'fill-current')} />,
            count: formatCount(likeCount),
        },
        { label: WATCH.follow, active: saved, onClick: toggleSave, icon: <Bookmark className={cn('size-4', saved && 'fill-current')} /> },
        { label: WATCH.share, active: false, onClick: share, icon: <Share2 className="size-4" /> },
    ]

    return (
        <div className="flex flex-col items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur-xl">
            {items.map((item) => (
                <button
                    key={item.label}
                    type="button"
                    title={item.label}
                    aria-label={item.label}
                    aria-pressed={item.active}
                    onClick={item.onClick}
                    className={cn(
                        'flex size-11 flex-col items-center justify-center rounded-full transition-all active:scale-90',
                        item.active ? 'bg-accent text-white' : 'bg-white text-ink hover:scale-105',
                    )}>
                    {item.icon}
                </button>
            ))}

            <span className="pb-1 text-[0.6rem] font-semibold">{items[0].count}</span>
        </div>
    )
}
