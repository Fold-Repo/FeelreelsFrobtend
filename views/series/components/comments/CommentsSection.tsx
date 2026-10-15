'use client'

import { useEffect, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { WATCH } from '@/data'
import { formatCount, interpolate } from '@/lib'
import type { Series } from '@/types'
import { CommentComposer } from './CommentComposer'
import { CommentList } from './CommentList'
import { CommentsSheet } from './CommentsSheet'
import { SortMenu } from './SortMenu'
import { avatarTone } from './types'
import { useComments } from './useComments'

export const OPEN_COMMENTS_EVENT = 'feelreels:open-comments'

export function CommentsSection({ series }: { series: Series }) {
    const state = useComments(series)
    const [sheetOpen, setSheetOpen] = useState(false)
    const copy = WATCH.commentsPanel
    const preview = state.comments[0]

    useEffect(() => {
        const open = () => {
            if (window.matchMedia('(min-width: 768px)').matches) document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            else setSheetOpen(true)
        }

        window.addEventListener(OPEN_COMMENTS_EVENT, open)

        return () => window.removeEventListener(OPEN_COMMENTS_EVENT, open)
    }, [])

    return (
        <section id="comments" className="scroll-mt-24">
            <button type="button" onClick={() => setSheetOpen(true)} className="w-full rounded-3xl bg-background p-4 text-left md:hidden">
                <span className="flex items-center justify-between text-sm font-semibold">
                    <span>
                        {copy.title} <span className="font-normal text-muted">{formatCount(state.total)}</span>
                    </span>

                    <ChevronsUpDown className="size-4 text-muted" />
                </span>

                {preview && (
                    <span className="mt-3 flex items-start gap-2.5">
                        <span
                            className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold ${avatarTone(preview.name)}`}>
                            {preview.name.charAt(0)}
                        </span>

                        <span className="line-clamp-2 text-sm">{preview.text}</span>
                    </span>
                )}
            </button>

            <div className="hidden md:block">
                <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <h2 className="text-xl font-semibold tracking-[-0.02em]">{interpolate(copy.count, { count: formatCount(state.total) })}</h2>

                    <SortMenu value={state.sort} onChange={state.setSort} />
                </div>

                <CommentComposer author={state.author.name} placeholder={copy.placeholder} submitLabel={copy.post} onSubmit={(text) => state.post(text)} />

                <div className="mt-8">
                    <CommentList comments={state.comments} studio={series.studio} author={state.author.name} onReply={(id, text) => state.post(text, id)} />
                </div>
            </div>

            <CommentsSheet open={sheetOpen} onClose={() => setSheetOpen(false)} series={series} state={state} />
        </section>
    )
}
