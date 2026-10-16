'use client'

import { useMemo, useState } from 'react'
import { WATCH } from '@/data'
import { useViewer } from '@/hooks'
import type { Series } from '@/types'
import type { CommentData } from './types'

export function useComments(series: Series) {
    
    const { viewer, addComment } = useViewer()
    const [sort, setSort] = useState('top')
    const copy = WATCH.commentsPanel
    const mine = useMemo(() => viewer.comments[series.slug] ?? [], [viewer.comments, series.slug])
    const name = viewer.user?.name ?? copy.guest
    const handle = `@${(viewer.user?.email.split('@')[0] ?? viewer.guestId.slice(6, 14)) || 'guest'}`

    const comments = useMemo(() => {
        const toComment = (comment: (typeof mine)[number]): CommentData => ({
            id: comment.id,
            name,
            handle,
            time: copy.justNow,
            text: comment.text,
            likes: 0,
            own: true,
            replies: [],
        })
        const replies = (id: string) => mine.filter((comment) => comment.parent === id).map(toComment)
        const samples: CommentData[] = copy.samples.map((sample) => ({
            ...sample,
            replies: [...sample.replies.map((reply) => ({ ...reply, replies: [] })), ...replies(sample.id)],
        }))
        const own = mine.filter((comment) => !comment.parent).map((comment) => ({ ...toComment(comment), replies: replies(comment.id) }))
        const ordered = sort === 'top' ? [...samples].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || b.likes - a.likes) : samples

        return [...own, ...ordered]
    }, [mine, name, handle, copy, sort])

    return {
        comments,
        total: series.comments + mine.length,
        sort,
        setSort,
        author: { name, handle },
        post: (text: string, parent?: string) => addComment(series.slug, text, parent),
    }
}
