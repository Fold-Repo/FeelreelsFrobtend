'use client'

import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { FilterTabs } from '@/components'
import { WATCH } from '@/data'
import { useScrollLock, useViewer } from '@/hooks'
import { EASE, interpolate, isPlayable } from '@/lib'
import type { Episode, Series } from '@/types'
import { EpisodeTile } from './EpisodeTile'
import { useEpisodeRanges } from './useEpisodeRanges'

type EpisodeSheetProps = {
    open: boolean
    onClose: () => void
    series: Series
    episodes: Episode[]
    current: number
    onSelect: (number: number) => void
}

export function EpisodeSheet({ open, onClose, series, episodes, current, onSelect }: EpisodeSheetProps) {
    const { viewer } = useViewer()
    const controls = useDragControls()
    const { ranges, range, setRange, visible } = useEpisodeRanges(episodes, current)

    useScrollLock(open)

    if (typeof document === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    <motion.button
                        type="button"
                        aria-label={WATCH.reel.close}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/20 sm:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.section
                        role="dialog"
                        aria-label={WATCH.episodes}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.4, ease: EASE }}
                        drag="y"
                        dragListener={false}
                        dragControls={controls}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.6 }}
                        onDragEnd={(_, info) => info.offset.y > 100 && onClose()}
                        className="fixed inset-x-0 bottom-0 z-[71] flex h-[45dvh] flex-col rounded-t-[1.75rem] bg-surface sm:hidden">
                        <div onPointerDown={(event) => controls.start(event)} className="shrink-0 cursor-grab touch-none py-2.5">
                            <span className="mx-auto block h-1 w-10 rounded-full bg-line" />
                        </div>

                        <header className="shrink-0 border-b border-line px-4 pt-0 pb-3">
                            <div className="flex items-baseline justify-between gap-3">
                                <h2 className="text-lg font-semibold tracking-[-0.02em]">{WATCH.episodes}</h2>

                                <p className="text-xs text-muted">{interpolate(WATCH.freeNote, { count: series.freeEpisodes })}</p>
                            </div>

                            {ranges.length > 1 && (
                                <FilterTabs
                                    id="sheet-ranges"
                                    label={WATCH.episodes}
                                    options={ranges}
                                    value={range}
                                    onChange={setRange}
                                    className="mt-3 [&_button]:h-8 [&_button]:text-xs"
                                />
                            )}
                        </header>

                        <div
                            data-lenis-prevent
                            className="grid min-h-0 flex-1 auto-rows-[3rem] grid-cols-6 gap-2 overflow-y-auto overscroll-contain px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                            {visible.map((episode) => (
                                <EpisodeTile
                                    key={episode.number}
                                    episode={episode}
                                    active={episode.number === current}
                                    locked={!isPlayable(viewer, series.slug, episode)}
                                    dark={false}
                                    onSelect={() => onSelect(episode.number)}
                                />
                            ))}
                        </div>
                    </motion.section>
                </>
            )}
        </AnimatePresence>,
        document.body,
    )
}
