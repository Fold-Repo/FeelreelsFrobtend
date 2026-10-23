import Image from 'next/image'
import Link from 'next/link'
import { Crown, Play } from 'lucide-react'
import { LABELS } from '@/constants'
import { cn, formatCount, getCategoryLabel, interpolate } from '@/lib'
import type { Series } from '@/types'

type SeriesCardProps = {
    series: Series
    rank?: number
    priority?: boolean
    className?: string
}

export function SeriesCard({ series, rank, priority, className }: SeriesCardProps) {
    const { slug, title, poster, category, episodes, views, isNew, isVip } = series

    return (
        <Link href={`/series/${slug}`} className={cn('group block', className)}>
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl bg-line">
                <Image
                    src={poster}
                    alt={title}
                    fill
                    priority={priority}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0" />

                <div className="absolute top-3 left-3 flex gap-1.5">
                    {isVip && (
                        <span className="flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-ink">
                            <Crown className="size-3" />

                            {LABELS.vip}
                        </span>
                    )}

                    {isNew && <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">{LABELS.new}</span>}
                </div>

                <span className="absolute right-3 bottom-3 flex size-11 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Play className="ml-0.5 size-4 fill-current" />
                </span>

                <p
                    className={cn(
                        'absolute text-xs font-medium text-white/85',
                        rank ? 'top-3 right-3 rounded-full bg-black/45 px-2 py-0.5 backdrop-blur-sm' : 'bottom-3 left-3',
                    )}>
                    {interpolate(LABELS.episodes, { count: episodes })}
                </p>

                {rank && (
                    <span
                        aria-hidden
                        className="absolute -bottom-3 -left-1 text-[5.5rem] leading-none font-bold tracking-[-0.08em] text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
                        {rank}
                    </span>
                )}
            </div>

            <div className="mt-3 px-1">
                <h3 className="line-clamp-1 font-semibold tracking-[-0.01em]">{title}</h3>

                <p className="mt-0.5 truncate text-sm text-muted">
                    {getCategoryLabel(category)}
                    {views > 0 ? ` · ${interpolate(LABELS.views, { count: formatCount(views) })}` : ''}
                </p>
            </div>
        </Link>
    )
}
