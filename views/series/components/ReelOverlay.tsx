'use client'

import { useState } from 'react'
import { Bookmark, Heart, Layers, MessageCircle, Play, Send } from 'lucide-react'
import { WATCH } from '@/data'
import { useEngagement, useShareSeries } from '@/hooks'
import { cn, formatCount, interpolate } from '@/lib'
import type { Episode, Series } from '@/types'
import { OPEN_COMMENTS_EVENT } from './comments/CommentsSection'
import { EpisodeSheet } from './EpisodeSheet'
import { ReelAction } from './ReelAction'

type ReelOverlayProps = {
    series: Series
    episodes: Episode[]
    current: number
    progress: number
    onSelect: (number: number) => void
    onNext?: () => void
}

export function ReelOverlay({ series, episodes, current, progress, onSelect, onNext }: ReelOverlayProps) {
    const { liked, saved, likeCount, toggleLike, toggleSave } = useEngagement(series.slug)
    const [sheetOpen, setSheetOpen] = useState(false)
    const share = useShareSeries(series, current)
    const { title, synopsis, tags, comments } = series
    const copy = WATCH.reel

    return (
        <>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

            <div className="pointer-events-auto absolute right-3 bottom-32 flex flex-col items-center gap-4 text-white">
                <ReelAction
                    label={formatCount(likeCount)}
                    title={WATCH.like}
                    active={liked}
                    onClick={toggleLike}
                    icon={<Heart className={cn('size-5', liked && 'fill-accent text-accent')} />}
                />

                <ReelAction
                    label={formatCount(comments)}
                    title={WATCH.comments}
                    onClick={() => window.dispatchEvent(new Event(OPEN_COMMENTS_EVENT))}
                    icon={<MessageCircle className="size-5" />}
                />

                <ReelAction
                    label={copy.save}
                    title={WATCH.follow}
                    active={saved}
                    onClick={toggleSave}
                    icon={<Bookmark className={cn('size-5', saved && 'fill-current')} />}
                />

                <ReelAction label={WATCH.share} title={WATCH.share} onClick={share} icon={<Send className="size-5" />} />
            </div>

            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-white">
                <div className="pr-16">
                    <p className="font-semibold tracking-[-0.02em]">{title}</p>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75">{synopsis}</p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-white/15 px-2 py-0.5 text-[0.65rem]">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/25">
                    <div className="h-full bg-accent transition-[width] duration-300 ease-linear" style={{ width: `${progress * 100}%` }} />
                </div>

                <div className="pointer-events-auto mt-3 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setSheetOpen(true)}
                        className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl bg-white/15 px-3 text-sm">
                        <Layers className="size-4 shrink-0" />

                        <span className="truncate">{interpolate(copy.episodes, { total: episodes.length })}</span>

                        <span className="ml-auto shrink-0 text-white/60">{interpolate(copy.current, { number: current })}</span>
                    </button>

                    {onNext && (
                        <button
                            type="button"
                            onClick={onNext}
                            className="flex h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-white/15 px-4 text-sm font-semibold">
                            {copy.next}

                            <Play className="size-3 fill-current" />
                        </button>
                    )}
                </div>
            </div>

            <EpisodeSheet open={sheetOpen} onClose={() => setSheetOpen(false)} series={series} episodes={episodes} current={current} onSelect={onSelect} />
        </>
    )
}
