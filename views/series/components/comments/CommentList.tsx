'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib'
import { CommentItem } from './CommentItem'
import type { CommentData } from './types'

type CommentListProps = {
    comments: CommentData[]
    studio: string
    author: string
    onReply: (id: string, text: string) => void
}

export function CommentList({ comments, studio, author, onReply }: CommentListProps) {
    return (
        <div className="space-y-6">
            {comments.map((comment, index) => (
                <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: Math.min(index, 6) * 0.04 }}>
                    <CommentItem comment={comment} studio={studio} author={author} onReply={(text) => onReply(comment.id, text)} />
                </motion.div>
            ))}
        </div>
    )
}
