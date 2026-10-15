import Image from 'next/image'
import { ALL_SERIES } from '@/lib'

export function PosterMarquee() {
    const items = [...ALL_SERIES, ...ALL_SERIES]

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
