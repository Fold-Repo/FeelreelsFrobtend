'use client'

import { type ClipboardEvent, type KeyboardEvent, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib'

type OtpInputProps = {
    value: string
    onChange: (value: string) => void
    length?: number
    label: string
    invalid?: boolean
}

export function OtpInput({ value, onChange, length = 6, label, invalid }: OtpInputProps) {
    const refs = useRef<(HTMLInputElement | null)[]>([])
    const digits = Array.from({ length }, (_, index) => value[index] ?? '')

    const focus = (index: number) => refs.current[Math.max(0, Math.min(length - 1, index))]?.focus()

    const set = (index: number, digit: string) => {
        const next = digits.slice()

        next[index] = digit
        onChange(next.join('').slice(0, length))
    }

    const onKey = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !digits[index]) focus(index - 1)
        if (event.key === 'ArrowLeft') focus(index - 1)
        if (event.key === 'ArrowRight') focus(index + 1)
    }

    const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)

        if (!pasted) return

        event.preventDefault()
        onChange(pasted)
        focus(pasted.length)
    }

    return (
        <motion.div
            role="group"
            aria-label={label}
            className="flex gap-2"
            animate={invalid ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}>
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(node) => {
                        refs.current[index] = node
                    }}
                    inputMode="numeric"
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    maxLength={1}
                    value={digit}
                    aria-label={`${label} ${index + 1}`}
                    onPaste={onPaste}
                    onKeyDown={(event) => onKey(index, event)}
                    onChange={(event) => {
                        const next = event.target.value.replace(/\D/g, '').slice(-1)

                        set(index, next)

                        if (next) focus(index + 1)
                    }}
                    className={cn(
                        'h-14 w-full min-w-0 rounded-2xl border bg-field text-center text-xl font-semibold tabular-nums transition-all outline-none focus:border-ink/40 focus:ring-4 focus:ring-ink/5',
                        digit ? 'border-ink/30' : 'border-line',
                        invalid && 'border-danger',
                    )}
                />
            ))}
        </motion.div>
    )
}
