'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Copy, Share } from 'lucide-react'
import { WATCH } from '@/data'
import { useShare } from '@/hooks'
import { shareLink } from '@/lib'
import { PopupModal } from '../ui'
import { SHARE_ICONS } from './ShareIcons'

export function ShareModal() {
    const { payload, close } = useShare()
    const [copied, setCopied] = useState(false)
    const copy = WATCH.shareModal

    const copyLink = async () => {
        if (!payload) return

        await navigator.clipboard?.writeText(payload.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }

    const nativeShare = () => payload && navigator.share?.({ title: payload.title, text: payload.text, url: payload.url }).catch(() => undefined)

    return (
        <PopupModal isOpen={Boolean(payload)} onOpenChange={(open) => !open && close()} title={copy.title} description={copy.text} size="sm" backdrop="blur">
            {payload && (
                <div>
                    <div className="flex items-center gap-3 rounded-2xl bg-background p-2">
                        {payload.image && (
                            <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-xl">
                                <Image src={payload.image} alt="" fill sizes="96px" className="object-cover" />
                            </span>
                        )}

                        <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{payload.title}</span>

                            <span className="block truncate text-xs text-muted">{payload.url.replace(/^https?:\/\//, '')}</span>
                        </span>
                    </div>

                    <div className="mt-5 grid grid-cols-4 gap-3">
                        {copy.targets.map((target) => (
                            <a
                                key={target}
                                href={shareLink(target, payload)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-2 text-xs">
                                <span
                                    className={`flex size-12 items-center justify-center rounded-full transition-transform group-hover:-translate-y-1 ${SHARE_ICONS[target].tone}`}>
                                    {SHARE_ICONS[target].icon}
                                </span>

                                {copy.labels[target as keyof typeof copy.labels]}
                            </a>
                        ))}

                        {typeof navigator !== 'undefined' && 'share' in navigator && (
                            <button type="button" onClick={nativeShare} className="group flex flex-col items-center gap-2 text-xs">
                                <span className="flex size-12 items-center justify-center rounded-full bg-background transition-transform group-hover:-translate-y-1">
                                    <Share className="size-5" />
                                </span>

                                {copy.more}
                            </button>
                        )}
                    </div>

                    <div className="mt-6 flex items-center gap-2 rounded-full border border-line p-1.5 pl-4">
                        <span className="min-w-0 flex-1 truncate text-sm text-muted">{payload.url}</span>

                        <button
                            type="button"
                            onClick={copyLink}
                            className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-on-primary">
                            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}

                            {copied ? copy.copied : copy.copy}
                        </button>
                    </div>
                </div>
            )}
        </PopupModal>
    )
}
