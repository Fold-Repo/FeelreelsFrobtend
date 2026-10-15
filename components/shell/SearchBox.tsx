'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Search, X } from 'lucide-react'
import { APP_SHELL } from '@/data'
import { EASE } from '@/lib'

export function SearchBox() {
    const router = useRouter()
    const params = useSearchParams()
    const [value, setValue] = useState(params.get('q') ?? '')
    const [open, setOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) inputRef.current?.focus()
    }, [open])

    const submit = (event: FormEvent) => {
        event.preventDefault()

        const next = new URLSearchParams(params.toString())

        if (value.trim()) next.set('q', value.trim())
        else next.delete('q')

        setOpen(false)
        router.push(`/browse${next.size ? `?${next.toString()}` : ''}`)
    }

    const field = (
        <form role="search" onSubmit={submit} className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />

            <input
                ref={inputRef}
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-label={APP_SHELL.search.label}
                placeholder={APP_SHELL.search.placeholder}
                className="h-11 w-full rounded-full bg-background pr-10 pl-11 text-sm transition-shadow outline-none placeholder:text-muted focus:bg-surface focus:ring-2 focus:ring-line [&::-webkit-search-cancel-button]:hidden"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => setValue('')}
                    aria-label={APP_SHELL.search.clear}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted">
                    <X className="size-4" />
                </button>
            )}
        </form>
    )

    return (
        <>
            <div className="hidden w-full max-w-xl md:block">{field}</div>

            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={APP_SHELL.search.label}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background md:hidden">
                <Search className="size-4" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="absolute inset-0 z-10 flex items-center gap-2 bg-surface px-3 md:hidden">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label={APP_SHELL.search.close}
                            className="flex size-10 shrink-0 items-center justify-center rounded-full">
                            <ArrowLeft className="size-4" />
                        </button>

                        {field}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
