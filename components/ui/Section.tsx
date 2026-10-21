import type { ReactNode } from 'react'
import { cn } from '@/lib'

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
    return (
        <section id={id} className={cn('scroll-mt-20 py-16 sm:py-24', className)}>
            {children}
        </section>
    )
}
