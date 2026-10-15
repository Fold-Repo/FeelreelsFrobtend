import type { ReactNode } from 'react'
import { cn } from '@/lib'
import { FadeUp } from './FadeUp'
import { SplitText } from './SplitText'

type SectionHeaderProps = {
    eyebrow?: string
    title: string
    accent?: string
    action?: ReactNode
    tone?: 'light' | 'dark'
    className?: string
}

export function SectionHeader({ eyebrow, title, accent, action, tone = 'light', className }: SectionHeaderProps) {
    const dark = tone === 'dark'

    return (
        <FadeUp className={cn('flex flex-wrap items-end justify-between gap-6', className)}>
            <div className="max-w-2xl">
                {eyebrow && (
                    <p className={cn('mb-4 inline-flex items-center gap-2 text-sm', dark ? 'text-white/60' : 'text-muted')}>
                        <span className="size-1.5 rounded-full bg-accent" />

                        {eyebrow}
                    </p>
                )}

                <h2 className="text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">
                    <SplitText text={title} inView className="block" />

                    {accent && <SplitText text={accent} inView delay={0.15} className={cn('block', dark ? 'text-white/45' : 'text-muted/70')} />}
                </h2>
            </div>

            {action}
        </FadeUp>
    )
}
