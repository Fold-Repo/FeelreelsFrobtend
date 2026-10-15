'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion'
import { HOME } from '@/data'

const BASE_SPEED = 3

export function GenreMarquee() {
    const offset = useMotionValue(0)
    const direction = useRef(1)
    const { scrollY } = useScroll()
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
    const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false })
    const skew = useTransform(velocity, [-2000, 2000], [8, -8])
    const x = useTransform(offset, (value) => `${wrap(-50, 0, value)}%`)

    useAnimationFrame((_, delta) => {
        const extra = boost.get()

        if (extra < 0) direction.current = -1
        else if (extra > 0) direction.current = 1

        offset.set(offset.get() - direction.current * (BASE_SPEED + Math.abs(extra)) * (delta / 1000))
    })

    const words = [...HOME.marquee, ...HOME.marquee]

    return (
        <div aria-hidden className="overflow-hidden py-10 select-none">
            <motion.div style={{ x, skewX: skew }} className="flex w-max gap-10 whitespace-nowrap">
                {[...words, ...words].map((word, index) => (
                    <span key={index} className="flex items-center gap-10 text-[clamp(3rem,9vw,8rem)] leading-none font-semibold tracking-[-0.05em]">
                        <span className={index % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]' : ''}>{word}</span>

                        <span className="size-4 rounded-full bg-accent sm:size-6" />
                    </span>
                ))}
            </motion.div>
        </div>
    )
}
