import Link from 'next/link'
import { SITE } from '@/constants'
import { cn } from '@/lib'

export function LogoMark({ className, inverse }: { className?: string; inverse?: boolean }) {
    return (
        <svg viewBox="0 0 64 64" aria-hidden className={cn('size-8 shrink-0', className)}>
            <rect width="64" height="64" rx="18" className={inverse ? 'fill-white' : 'fill-[#141414]'} />

            <rect x="13" y="16" width="20" height="32" rx="6" className="fill-gold" transform="rotate(-14 23 32)" />

            <rect x="21" y="14" width="20" height="34" rx="6" className="fill-[#ff9a7f]" transform="rotate(-4 31 31)" />

            <rect x="29" y="13" width="22" height="38" rx="6" className="fill-[#ff5a3c]" />

            <path d="M36 25v14l11-7z" className="fill-white" />
        </svg>
    )
}

export function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
    const dark = tone === 'dark'

    return (
        <Link href="/" aria-label={SITE.name} className="group flex items-center gap-2.5 sm:gap-3">
            <LogoMark inverse={dark} className="size-7 transition-transform duration-500 group-hover:-rotate-6 sm:size-8" />

            <span className={cn('text-xl font-bold tracking-[-0.055em] sm:text-2xl', dark ? 'text-white' : 'text-ink')}>
                feel<span className="font-normal opacity-55">reels</span>
            </span>
        </Link>
    )
}
