'use client'

import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { WATCH } from '@/data'
import { EASE, formatCount } from '@/lib'
import type { Series } from '@/types'
import { CommentComposer } from './CommentComposer'
import { CommentList } from './CommentList'
import { SortMenu } from './SortMenu'
import type { useComments } from './useComments'

type CommentsSheetProps = {
    open: boolean
    onClose: () => void
    series: Series
    state: ReturnType<typeof useComments>
}

export function CommentsSheet({ open, onClose, series, state }: CommentsSheetProps) {
    const copy = WATCH.commentsPanel

    if (typeof document === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    <motion.button
                        type="button"
                        aria-label={copy.close}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.section
                        role="dialog"
                        aria-label={copy.title}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.45, ease: EASE }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.6 }}
                        onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
                        className="fixed inset-x-0 bottom-0 z-[71] flex h-[78dvh] flex-col rounded-t-[1.75rem] bg-surface md:hidden">
                        <span className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line" />

                        <header className="flex shrink-0 items-center justify-between px-4 pt-3 pb-2">
                            <h2 className="text-lg font-semibold tracking-[-0.02em]">
                                {copy.title} <span className="font-normal text-muted">{formatCount(state.total)}</span>
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label={copy.close}
                                className="flex size-9 items-center justify-center rounded-full hover:bg-background">
                                <X className="size-5" />
                            </button>
                        </header>

                        <div className="shrink-0 border-b border-line px-4 pb-3">
                            <SortMenu value={state.sort} onChange={state.setSort} />
                        </div>

                        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                            <CommentList
                                comments={state.comments}
                                studio={series.studio}
                                author={state.author.name}
                                onReply={(id, text) => state.post(text, id)}
                            />
                        </div>

                        <div className="shrink-0 border-t border-line px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                            <CommentComposer
                                variant="bar"
                                compact
                                author={state.author.name}
                                placeholder={copy.placeholder}
                                submitLabel={copy.post}
                                onSubmit={(text) => state.post(text)}
                            />
                        </div>
                    </motion.section>
                </>
            )}
        </AnimatePresence>,
        document.body,
    )
}
