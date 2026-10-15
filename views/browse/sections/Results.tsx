'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Button, InfiniteScrollFooter, VideoCard } from '@/components'
import { BROWSE } from '@/data'
import { usePaginatedQuery, useViewer } from '@/hooks'
import { EASE, interpolate, listSeries } from '@/lib'
import { GridSkeleton } from '../components/GridSkeleton'
import { useBrowseQuery } from '../hooks'

const GRID = 'grid gap-x-3 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'

export function Results() {
    const { category, studio, sort, q, list, filters, reset } = useBrowseQuery()
    const { viewer } = useViewer()
    const only = list === 'saved' ? viewer.saved : list === 'continue' ? Object.keys(viewer.progress) : undefined
    const key = [category, studio, sort, q, list, filters.join(','), only?.join(',')]

    const { items, isPending, isError, hasMore, loadMore, loadingMore, data } = usePaginatedQuery({
        queryKey: ['browse', ...key],
        queryFn: (page) => listSeries({ category: category || undefined, studio: studio || undefined, sort, q, filters, only, page }),
    })

    const total = data?.pages[0]?.totalItems ?? 0
    const heading = q
        ? interpolate(BROWSE.titles.search, { q })
        : studio
          ? interpolate(BROWSE.titles.studio, { studio })
          : (BROWSE.titles[(list || sort) as keyof typeof BROWSE.titles] ?? BROWSE.title)

    return (
        <section className="pt-6 pb-16">
            <div className="mb-5 flex items-baseline justify-between gap-4">
                <h1 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{heading}</h1>

                {!isPending && <p className="text-sm text-muted">{interpolate(BROWSE.results, { count: total })}</p>}
            </div>

            {isPending ? (
                <GridSkeleton className={GRID} count={8} />
            ) : items.length ? (
                <div className={GRID}>
                    <AnimatePresence mode="popLayout">
                        {items.map((series, index) => (
                            <motion.div
                                key={`${key.join('|')}-${series.slug}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE, delay: (index % 12) * 0.03 }}>
                                <VideoCard series={series} priority={index < 4} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 rounded-3xl bg-background py-20 text-center">
                    <p className="max-w-xs text-sm text-muted">{list ? BROWSE.emptyList : BROWSE.empty}</p>

                    <Button variant="outline" size="sm" onPress={reset}>
                        {BROWSE.clear}
                    </Button>
                </div>
            )}

            <InfiniteScrollFooter
                onLoadMore={loadMore}
                hasMore={hasMore}
                loading={loadingMore}
                error={isError}
                loader={<GridSkeleton className={`${GRID} mt-5`} count={4} />}
                endMessage={!isPending && items.length > 0 && BROWSE.end}
            />
        </section>
    )
}
