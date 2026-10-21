'use client'

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LABELS } from '@/constants'
import { cn } from '@/lib'

type ScrollRowProps = {
    children: ReactNode
    className?: string
    trackClassName?: string
    activeKey?: string
    wheelScroll?: boolean
}

export function ScrollRow({ children, className, trackClassName, activeKey, wheelScroll = true }: ScrollRowProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [edges, setEdges] = useState({ start: false, end: false })

    const measure = useCallback(() => {
        const node = ref.current

        if (!node) return

        setEdges({ start: node.scrollLeft > 4, end: node.scrollLeft + node.clientWidth < node.scrollWidth - 4 })
    }, [])

    useEffect(() => {
        const node = ref.current

        if (!node) return

        measure()

        const observer = new ResizeObserver(measure)

        observer.observe(node)

        const onWheel = (event: WheelEvent) => {
            if (!wheelScroll || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || node.scrollWidth <= node.clientWidth) return

            event.preventDefault()
            node.scrollLeft += event.deltaY
        }

        node.addEventListener('wheel', onWheel, { passive: false })

        return () => {
            observer.disconnect()
            node.removeEventListener('wheel', onWheel)
        }
    }, [measure, wheelScroll])

    useEffect(() => {
        const node = ref.current
        const active = node?.querySelector<HTMLElement>('[aria-selected="true"], [aria-pressed="true"]')

        if (node && active) node.scrollTo({ left: active.offsetLeft - node.clientWidth / 2 + active.offsetWidth / 2, behavior: 'smooth' })
    }, [activeKey])

    const scroll = (direction: 1 | -1) => ref.current?.scrollBy({ left: direction * ref.current.clientWidth * 0.7, behavior: 'smooth' })

    return (
        <div className={cn('relative min-w-0', className)}>
            <div
                ref={ref}
                onScroll={measure}
                data-lenis-prevent={wheelScroll || undefined}
                className={cn(
                    'no-scrollbar flex gap-2 overflow-x-auto scroll-smooth',
                    edges.start && edges.end && '[mask-image:linear-gradient(90deg,transparent,black_48px,black_calc(100%-48px),transparent)]',
                    edges.start && !edges.end && '[mask-image:linear-gradient(90deg,transparent,black_48px)]',
                    !edges.start && edges.end && '[mask-image:linear-gradient(90deg,black_calc(100%-48px),transparent)]',
                    trackClassName,
                )}>
                {children}
            </div>

            {edges.start && <EdgeButton side="start" label={LABELS.scrollLeft} onClick={() => scroll(-1)} />}

            {edges.end && <EdgeButton side="end" label={LABELS.scrollRight} onClick={() => scroll(1)} />}
        </div>
    )
}

function EdgeButton({ side, label, onClick }: { side: 'start' | 'end'; label: string; onClick: () => void }) {
    const Icon = side === 'start' ? ChevronLeft : ChevronRight

    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(
                'absolute top-1/2 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface shadow-sm transition-colors hover:bg-primary hover:text-on-primary sm:flex',
                side === 'start' ? 'left-0' : 'right-0',
            )}>
            <Icon className="size-4" />
        </button>
    )
}
