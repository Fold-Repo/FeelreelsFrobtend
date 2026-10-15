'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Pin, ThumbsDown, ThumbsUp } from 'lucide-react'
import { WATCH } from '@/data'
import { cn, EASE, formatCount, interpolate } from '@/lib'
import { CommentComposer } from './CommentComposer'
import { avatarTone, type CommentData } from './types'

type CommentItemProps = {
    comment: CommentData
    studio: string
    author: string
    nested?: boolean
    onReply?: (text: string) => void
}

export function CommentItem({ comment, studio, author, nested, onReply }: CommentItemProps) {
    const copy = WATCH.commentsPanel
    const [vote, setVote] = useState<'up' | 'down' | null>(null)
    const [expanded, setExpanded] = useState(false)
    const [replying, setReplying] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const long = comment.text.length > 180
    const likes = comment.likes + (vote === 'up' ? 1 : 0)
    const replyCount = comment.replies.length

    return (
        <div className="flex gap-3">
            <span
                className={cn(
                    'flex shrink-0 items-center justify-center rounded-full font-semibold',
                    nested ? 'size-7 text-xs' : 'size-10 text-sm',
                    avatarTone(comment.name),
                )}>
                {comment.name.charAt(0)}
            </span>

            <div className="min-w-0 flex-1">
                {comment.pinned && (
                    <p className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                        <Pin className="size-3" />

                        {interpolate(copy.pinned, { studio })}
                    </p>
                )}

                <p className="flex flex-wrap items-baseline gap-x-1.5 text-[0.8rem]">
                    <span className={cn('font-semibold', comment.own && 'rounded-full bg-primary px-2 text-on-primary')}>{comment.handle}</span>

                    <span className="text-xs text-muted">{comment.time}</span>
                </p>

                <p className={cn('mt-1 text-sm leading-relaxed break-words whitespace-pre-line', long && !expanded && 'line-clamp-3')}>{comment.text}</p>

                {long && (
                    <button type="button" onClick={() => setExpanded(!expanded)} className="mt-1 text-xs font-semibold text-muted hover:text-ink">
                        {expanded ? copy.showLess : copy.readMore}
                    </button>
                )}

                <div className="mt-1.5 -ml-2 flex items-center gap-1 text-xs text-muted">
                    <VoteButton label={copy.like} active={vote === 'up'} onClick={() => setVote(vote === 'up' ? null : 'up')}>
                        <ThumbsUp className={cn('size-4', vote === 'up' && 'fill-current')} />
                    </VoteButton>

                    {likes > 0 && <span className="mr-1 tabular-nums">{formatCount(likes)}</span>}

                    <VoteButton label={copy.dislike} active={vote === 'down'} onClick={() => setVote(vote === 'down' ? null : 'down')}>
                        <ThumbsDown className={cn('size-4', vote === 'down' && 'fill-current')} />
                    </VoteButton>

                    {comment.heart && (
                        <span
                            title={copy.creatorHeart}
                            className="relative mx-1 flex size-6 items-center justify-center rounded-full bg-night text-[0.55rem] font-bold text-white">
                            {studio.charAt(0)}

                            <Heart className="absolute -right-1 -bottom-1 size-3 fill-accent text-accent" />
                        </span>
                    )}

                    {onReply && (
                        <button
                            type="button"
                            onClick={() => setReplying(true)}
                            className="ml-1 h-8 rounded-full px-3 font-semibold text-ink hover:bg-background">
                            {copy.reply}
                        </button>
                    )}
                </div>

                {replying && onReply && (
                    <div className="mt-2">
                        <CommentComposer
                            compact
                            autoFocus
                            author={author}
                            placeholder={copy.replyPlaceholder}
                            submitLabel={copy.reply}
                            onCancel={() => setReplying(false)}
                            onSubmit={(text) => {
                                onReply(text)
                                setReplying(false)
                                setShowReplies(true)
                            }}
                        />
                    </div>
                )}

                {replyCount > 0 && (
                    <button
                        type="button"
                        onClick={() => setShowReplies(!showReplies)}
                        className="mt-1 -ml-3 flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-[#2f6fde] hover:bg-[#2f6fde]/10">
                        <ChevronDown className={cn('size-4 transition-transform', showReplies && 'rotate-180')} />

                        {showReplies ? copy.hideReplies : replyCount === 1 ? copy.oneReply : interpolate(copy.replies, { count: replyCount })}
                    </button>
                )}

                <AnimatePresence initial={false}>
                    {showReplies && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden">
                            <div className="space-y-4 pt-3">
                                {comment.replies.map((reply) => (
                                    <CommentItem key={reply.id} comment={reply} studio={studio} author={author} nested />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

function VoteButton({ label, active, onClick, children }: { label: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={cn('flex size-8 items-center justify-center rounded-full transition-colors hover:bg-background active:scale-90', active && 'text-ink')}>
            {children}
        </button>
    )
}
