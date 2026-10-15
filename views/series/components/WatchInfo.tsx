'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Bookmark, BookmarkCheck, Eye, MessageCircle, Share2, Star, ThumbsUp } from 'lucide-react'
import { Button } from '@/components'
import { LABELS } from '@/constants'
import { WATCH } from '@/data'
import { useShareSeries, useViewer } from '@/hooks'
import { CATALOG_UPDATED_AT, cn, formatCount, getCategoryLabel, interpolate, timeAgo } from '@/lib'
import type { Series } from '@/types'
import { ActionPill } from './ActionPill'
import { OPEN_COMMENTS_EVENT } from './comments/CommentsSection'

export function WatchInfo({ series, episode }: { series: Series; episode: number }) {
    const { viewer, toggleSaved, toggleLiked } = useViewer()
    const [expanded, setExpanded] = useState(false)
    const saved = viewer.saved.includes(series.slug)
    const liked = viewer.liked.includes(series.slug)

    const share = useShareSeries(series, episode)

    return (
        <div>
            <h1 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                {series.title} <span className="text-muted">· {interpolate(WATCH.episode, { number: episode })}</span>
            </h1>

            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                    <Eye className="size-4" />

                    {interpolate(WATCH.views, { count: formatCount(series.views) })}
                </span>

                <span>{timeAgo(series.publishedAt, LABELS.timeAgo, CATALOG_UPDATED_AT)}</span>

                <span className="flex items-center gap-1.5">
                    <Star className="size-4 fill-gold text-gold" />

                    {series.rating}
                </span>
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-line">
                        <Image src={series.poster} alt="" fill sizes="44px" className="object-cover" />
                    </span>

                    <div>
                        <p className="text-sm font-semibold">{series.studio}</p>

                        <p className="text-xs text-muted">{interpolate(LABELS.episodes, { count: series.episodes })}</p>
                    </div>

                    <Button
                        size="sm"
                        variant={saved ? 'secondary' : 'primary'}
                        className="ml-2"
                        startContent={saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                        onPress={() => toggleSaved(series.slug)}>
                        {saved ? WATCH.following : WATCH.follow}
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    <ActionPill
                        label={WATCH.like}
                        active={liked}
                        onClick={() => toggleLiked(series.slug)}
                        icon={<ThumbsUp className={cn('size-4', liked && 'fill-current')} />}>
                        {formatCount(series.likes + (liked ? 1 : 0))}
                    </ActionPill>

                    <ActionPill
                        label={WATCH.comments}
                        onClick={() => window.dispatchEvent(new Event(OPEN_COMMENTS_EVENT))}
                        icon={<MessageCircle className="size-4" />}>
                        {formatCount(series.comments + (viewer.comments[series.slug]?.length ?? 0))}
                    </ActionPill>

                    <ActionPill label={WATCH.share} onClick={share} icon={<Share2 className="size-4" />}>
                        {WATCH.share}
                    </ActionPill>
                </div>
            </div>

            <div className="mt-5 rounded-3xl bg-background p-4 text-sm">
                <p className={cn('leading-relaxed', !expanded && 'line-clamp-2')}>{series.synopsis}</p>

                {expanded && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[getCategoryLabel(series.category), ...series.tags].map((tag) => (
                            <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <button type="button" onClick={() => setExpanded((value) => !value)} className="mt-2 text-sm font-semibold">
                    {expanded ? WATCH.showLess : WATCH.showMore}
                </button>
            </div>
        </div>
    )
}
