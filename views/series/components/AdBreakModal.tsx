'use client'

import { useEffect, useState } from 'react'
import { Button, PopupModal } from '@/components'
import { WATCH } from '@/data'
import { interpolate } from '@/lib'

const AD_SECONDS = 5

type AdBreakModalProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onComplete: () => void
}

export function AdBreakModal({ isOpen, onOpenChange, onComplete }: AdBreakModalProps) {
    return (
        <PopupModal isOpen={isOpen} onOpenChange={onOpenChange} title={WATCH.ad.title} isDismissable={false} showCloseButton={false} size="md">
            {isOpen && (
                <AdCountdown
                    onDone={() => {
                        onComplete()
                        onOpenChange(false)
                    }}
                />
            )}
        </PopupModal>
    )
}

function AdCountdown({ onDone }: { onDone: () => void }) {
    const [left, setLeft] = useState(AD_SECONDS)

    useEffect(() => {
        if (left <= 0) return

        const timer = setTimeout(() => setLeft((value) => value - 1), 1000)

        return () => clearTimeout(timer)
    }, [left])

    return (
        <div>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-sky via-blush to-butter">
                <span className="absolute top-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-xs">{WATCH.ad.sponsor}</span>

                <p className="text-sm text-ink/60">{WATCH.ad.placeholder}</p>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                    <div
                        className="h-full bg-accent transition-[width] duration-1000 ease-linear"
                        style={{ width: `${((AD_SECONDS - left) / AD_SECONDS) * 100}%` }}
                    />
                </div>
            </div>

            <Button className="mt-4 w-full" size="lg" isDisabled={left > 0} onPress={onDone}>
                {left > 0 ? interpolate(WATCH.ad.countdown, { seconds: left }) : WATCH.ad.done}
            </Button>
        </div>
    )
}
