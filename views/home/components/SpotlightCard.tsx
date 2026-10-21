import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { HOME } from '@/data'
import { formatCount, getCategoryLabel, interpolate } from '@/lib'
import type { Series } from '@/types'

export function SpotlightCard({ series, priority }: { series: Series; priority?: boolean }) {
    const { slug, title, poster, category, tags, synopsis, episodes, views } = series
    const { play } = HOME.spotlight

    return (
        <Link
            href={`/series/${slug}`}
            className="group flex w-[85vw] shrink-0 snap-start gap-4 rounded-[1.75rem] border border-line bg-surface p-3 transition-colors hover:border-ink/20 sm:w-[30rem]">
            <div className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-2xl bg-line sm:w-40">
                <Image
                    src={poster}
                    alt={title}
                    fill
                    priority={priority}
                    sizes="160px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
            </div>

            <div className="flex min-w-0 flex-col py-1 pr-1">
                <p className="truncate text-xs text-muted">{[getCategoryLabel(category), ...tags].join(' · ')}</p>

                <h3 className="mt-1 line-clamp-2 text-lg leading-tight font-semibold tracking-[-0.02em]">{title}</h3>

                <p className="mt-2 line-clamp-3 text-sm text-muted">{synopsis}</p>

                <div className="mt-auto flex items-center gap-3 pt-3">
                    <span className="flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-on-primary">
                        <Play className="size-3.5 fill-current" />

                        {play}
                    </span>

                    <span className="truncate text-xs text-muted">
                        {interpolate(HOME.spotlight.episodes, { count: episodes })} · {formatCount(views)}
                    </span>
                </div>
            </div>
        </Link>
    )
}
