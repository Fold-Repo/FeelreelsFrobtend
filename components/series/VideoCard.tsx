import Image from 'next/image'
import Link from 'next/link'
import { Clock, Crown, Eye } from 'lucide-react'
import { LABELS } from '@/constants'
import { cn, formatCount, getCategoryLabel, interpolate } from '@/lib'
import { TimeAgo } from './TimeAgo'
import type { Series } from '@/types'

type VideoCardProps = {
    series: Series
    layout?: 'grid' | 'row'
    priority?: boolean
}

export function VideoCard({ series, layout = 'grid', priority }: VideoCardProps) {
    const { slug, title, thumbnail, poster, episodes, views, publishedAt, category, studio, isVip, isNew } = series
    const row = layout === 'row'

    return (
        <Link href={`/series/${slug}`} className={cn('group block rounded-3xl transition-colors', row ? 'flex gap-3' : 'p-1.5 hover:bg-background')}>
            <div className={cn('relative aspect-video shrink-0 overflow-hidden rounded-2xl bg-line', row ? 'w-40 sm:w-44' : 'w-full')}>
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    priority={priority}
                    sizes={row ? '180px' : '(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw'}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <span className="absolute bottom-2 left-2 h-[42%] w-[18%] overflow-hidden rounded-lg ring-2 ring-white/80">
                    <Image src={poster} alt="" fill sizes="60px" className="object-cover" />
                </span>

                <span className="absolute right-2 bottom-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[0.7rem] font-medium text-white tabular-nums">
                    {interpolate(LABELS.episodes, { count: episodes })}
                </span>

                {(isVip || isNew) && (
                    <span
                        className={cn(
                            'absolute top-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold',
                            isVip ? 'bg-gold text-ink' : 'bg-accent text-white',
                        )}>
                        {isVip && <Crown className="size-3" />}

                        {isVip ? LABELS.vip : LABELS.new}
                    </span>
                )}
            </div>

            <div className={cn('min-w-0', row ? 'py-0.5' : 'px-1.5 pt-3 pb-1.5')}>
                {!row && (
                    <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
                        <span className="flex items-center gap-1">
                            <Clock className="size-3" />

                            <TimeAgo date={publishedAt} />
                        </span>

                        {views > 0 && (
                            <span className="flex items-center gap-1">
                                <Eye className="size-3" />

                                {formatCount(views)}
                            </span>
                        )}
                    </div>
                )}

                <h3 className={cn('font-semibold tracking-[-0.01em]', row ? 'line-clamp-2 text-sm' : 'line-clamp-1')}>{title}</h3>

                <p className="mt-1 truncate text-xs text-muted">
                    {getCategoryLabel(category)} · {studio}
                </p>

                {row && (
                    <p className="mt-1 text-xs text-muted">
                        {views > 0 ? `${interpolate(LABELS.views, { count: formatCount(views) })} · ` : ''}
                        <TimeAgo date={publishedAt} />
                    </p>
                )}
            </div>
        </Link>
    )
}
