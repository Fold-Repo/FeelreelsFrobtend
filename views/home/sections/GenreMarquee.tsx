'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion'
import { HOME } from '@/data'

const BASE_SPEED = 3

export function GenreMarquee() {
    const ref = useRef<HTMLDivElement>(null)
    const visible = useInView(ref)
    const offset = useMotionValue(0)
    const direction = useRef(1)
    const { scrollY } = useScroll()
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
    const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false })
    const x = useTransform(offset, (value) => `${wrap(-50, 0, value)}%`)

    useAnimationFrame((_, delta) => {
        if (!visible) return

        const extra = boost.get()

        if (extra < 0) direction.current = -1
        else if (extra > 0) direction.current = 1

        offset.set(offset.get() - direction.current * (BASE_SPEED + Math.abs(extra)) * (delta / 1000))
    })

    const words = [...HOME.marquee, ...HOME.marquee]

    return (
        <div ref={ref} aria-hidden className="overflow-hidden py-6 select-none sm:py-10">
            <motion.div style={{ x }} className="flex w-max gap-10 whitespace-nowrap will-change-transform">
                {[...words, ...words].map((word, index) => (
                    <span key={index} className="flex items-center gap-10 text-[clamp(2.25rem,9vw,8rem)] leading-none font-semibold tracking-[-0.05em]">
                        <span className={index % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]' : ''}>{word}</span>

                        <span className="size-4 rounded-full bg-accent sm:size-6" />
                    </span>
                ))}
            </motion.div>
        </div>
    )
}
