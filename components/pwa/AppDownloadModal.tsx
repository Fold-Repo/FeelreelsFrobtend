'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { INSTALL } from '@/data'
import { useAppDownload } from '@/hooks'
import { ALL_SERIES } from '@/lib'
import { LogoMark } from '../layout/Logo'
import { PopupModal } from '../ui'
import { StoreBadge } from './StoreBadge'
import { WebInstall } from './WebInstall'

const POSTERS = ALL_SERIES.slice(0, 5)

export function AppDownloadModal() {
    const { open, setOpen } = useAppDownload()
    const { store } = INSTALL

    return (
        <PopupModal isOpen={open} onOpenChange={setOpen} size="md" backdrop="blur" className="rounded-[2rem]" bodyClassName="p-0">
            <div className="relative h-36 overflow-hidden bg-night">
                <div className="absolute inset-x-0 -bottom-8 flex justify-center gap-2">
                    {POSTERS.map((series, index) => (
                        <div
                            key={series.slug}
                            className="relative h-36 w-24 shrink-0 overflow-hidden rounded-2xl"
                            style={{ transform: `translateY(${Math.abs(index - 2) * 14}px) rotate(${(index - 2) * 4}deg)` }}>
                            <Image src={series.poster} alt="" fill sizes="96px" className="object-cover" />
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-linear-to-b from-transparent to-surface" />
            </div>

            <div className="px-6 pb-6 text-center">
                <LogoMark className="mx-auto -mt-6 size-12 rounded-2xl ring-4 ring-surface" />

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{store.title}</h2>

                <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{store.text}</p>

                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                    <Star className="size-4 fill-gold text-gold" />

                    {store.rating}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                    <StoreBadge store="apple" {...store.appStore} />

                    <StoreBadge store="play" {...store.playStore} />
                </div>

                <div className="my-5 flex items-center gap-4 text-xs text-muted">
                    <span className="h-px flex-1 bg-line" />

                    {store.or}

                    <span className="h-px flex-1 bg-line" />
                </div>

                <WebInstall />
            </div>
        </PopupModal>
    )
}
