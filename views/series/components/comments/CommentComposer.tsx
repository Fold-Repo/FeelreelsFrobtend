'use client'

import { type FormEvent, type KeyboardEvent, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components'
import { WATCH } from '@/data'
import { cn } from '@/lib'
import { avatarTone } from './types'

const LIMIT = 500

type CommentComposerProps = {
    author: string
    placeholder: string
    submitLabel: string
    variant?: 'box' | 'bar'
    compact?: boolean
    autoFocus?: boolean
    onSubmit: (text: string) => void
    onCancel?: () => void
}

export function CommentComposer({ author, placeholder, submitLabel, variant = 'box', compact, autoFocus, onSubmit, onCancel }: CommentComposerProps) {
    const [text, setText] = useState('')
    const [focused, setFocused] = useState(Boolean(autoFocus))
    const ref = useRef<HTMLTextAreaElement>(null)
    const ready = text.trim().length > 0

    const resize = () => {
        const node = ref.current

        if (!node) return

        node.style.height = 'auto'
        node.style.height = `${Math.min(node.scrollHeight, 160)}px`
    }

    const reset = () => {
        setText('')
        setFocused(false)
        requestAnimationFrame(resize)
    }

    const submit = (event?: FormEvent) => {
        event?.preventDefault()

        if (!ready) return

        onSubmit(text.trim())
        reset()
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey || variant === 'bar') && !event.shiftKey) {
            event.preventDefault()
            submit()
        }

        if (event.key === 'Escape') {
            reset()
            onCancel?.()
        }
    }

    const field = (
        <textarea
            ref={ref}
            rows={1}
            value={text}
            maxLength={LIMIT}
            autoFocus={autoFocus}
            aria-label={placeholder}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onKeyDown={onKeyDown}
            onChange={(event) => {
                setText(event.target.value)
                resize()
            }}
            className="block max-h-40 w-full resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted"
        />
    )

    const avatar = (
        <span
            className={cn(
                'flex shrink-0 items-center justify-center rounded-full font-semibold',
                compact ? 'size-8 text-xs' : 'size-10 text-sm',
                avatarTone(author),
            )}>
            {author.charAt(0).toUpperCase()}
        </span>
    )

    if (variant === 'bar') {
        return (
            <form onSubmit={submit} className="flex items-end gap-2.5">
                {avatar}

                <div className="flex min-w-0 flex-1 items-end gap-2 rounded-3xl bg-background py-1.5 pr-1.5 pl-4 ring-1 ring-transparent transition-shadow focus-within:bg-surface focus-within:ring-line">
                    <div className="min-w-0 flex-1 py-1.5">{field}</div>

                    <button
                        type="submit"
                        disabled={!ready}
                        aria-label={submitLabel}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-all disabled:scale-90 disabled:bg-line disabled:text-muted">
                        <ArrowUp className="size-4" />
                    </button>
                </div>
            </form>
        )
    }

    return (
        <form onSubmit={submit} className="flex gap-3">
            {avatar}

            <div
                className={cn(
                    'min-w-0 flex-1 rounded-2xl border bg-surface transition-all',
                    focused ? 'border-ink/25 shadow-[0_8px_24px_-12px_rgba(20,20,20,0.25)]' : 'border-line',
                )}>
                <div className="px-4 pt-3 pb-2">{field}</div>

                {focused && (
                    <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2">
                        <span className="pl-1 text-xs text-muted tabular-nums">
                            {text.length}/{LIMIT}
                        </span>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => {
                                    reset()
                                    onCancel?.()
                                }}>
                                {WATCH.commentsPanel.cancel}
                            </Button>

                            <Button type="submit" size="sm" isDisabled={!ready}>
                                {submitLabel}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}
