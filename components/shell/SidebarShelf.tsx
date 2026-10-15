'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Play } from 'lucide-react'
import { APP_SHELL } from '@/data'
import { useViewer } from '@/hooks'
import { ALL_SERIES, cn, getTopSeries, interpolate } from '@/lib'

export function SidebarShelf({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname()
    const { viewer } = useViewer()
    const watched = Object.entries(viewer.progress)
        .map(([slug, episode]) => ({ series: ALL_SERIES.find((item) => item.slug === slug), episode }))
        .filter((item) => item.series)
        .slice(-4)
        .reverse()
    const resuming = watched.length > 0
    const items = resuming ? watched : getTopSeries(4).map((series) => ({ series, episode: 0 }))

    return (
        <div className="flex shrink-0 flex-col gap-1.5">
            <div className="flex items-center justify-between px-3.5 pt-1 pb-1.5">
                <p className="text-xs font-medium text-muted">{resuming ? APP_SHELL.continueTitle : APP_SHELL.popularTitle}</p>

                <Link
                    href={resuming ? '/browse?list=continue' : '/browse?sort=popular'}
                    onClick={onNavigate}
                    className="text-xs font-medium text-ink/70 hover:text-ink">
                    {APP_SHELL.seeAll}
                </Link>
            </div>

            {items.map(({ series, episode }) => {
                if (!series) return null

                const active = pathname === `/series/${series.slug}`
                const progress = episode ? (episode / series.episodes) * 100 : 0

                return (
                    <Link
                        key={series.slug}
                        href={`/series/${series.slug}${episode > 1 ? `?ep=${episode}` : ''}`}
                        onClick={onNavigate}
                        className={cn(
                            'group flex shrink-0 items-center gap-3 rounded-2xl p-1.5 transition-colors',
                            active ? 'bg-background' : 'hover:bg-background/70',
                        )}>
                        <span className="relative aspect-video w-[5.5rem] shrink-0 overflow-hidden rounded-xl bg-line">
                            <Image
                                src={series.thumbnail}
                                alt=""
                                fill
                                sizes="88px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                <Play className="size-4 fill-white text-white" />
                            </span>

                            {episode > 0 && (
                                <>
                                    <span className="absolute top-1 left-1 rounded-md bg-black/65 px-1.5 py-px text-[0.6rem] font-semibold text-white">
                                        {interpolate(APP_SHELL.episodeBadge, { number: episode })}
                                    </span>

                                    <span className="absolute inset-x-0 bottom-0 h-1 bg-white/30">
                                        <span className="block h-full bg-accent" style={{ width: `${Math.max(progress, 4)}%` }} />
                                    </span>
                                </>
                            )}
                        </span>

                        <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 text-[0.8rem] leading-snug font-medium">{series.title}</span>

                            <span className="mt-0.5 block truncate text-[0.7rem] text-muted">
                                {episode > 0 ? interpolate(APP_SHELL.remaining, { count: series.episodes - episode }) : series.studio}
                            </span>
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}
