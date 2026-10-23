'use client'

import Image from 'next/image'
import { useCatalog } from '@/hooks'

export function PosterMarquee() {
    const { data: series = [] } = useCatalog()
    const items = series.length ? [...series, ...series] : []

    if (!items.length) return null

    return (
        <div aria-hidden className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] pb-6">
            <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
                {items.map((series, index) => (
                    <div key={`${series.slug}-${index}`} className="relative h-28 w-20 shrink-0 overflow-hidden rounded-2xl opacity-90">
                        <Image src={series.poster} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}
