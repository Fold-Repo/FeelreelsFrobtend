'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

export function RollingNumber({ value }: { value: number }) {
    const count = useMotionValue(value)
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())

    useEffect(() => {
        const controls = animate(count, value, { duration: 0.8, ease: 'easeOut' })

        return () => controls.stop()
    }, [count, value])

    return <motion.span className="tabular-nums">{rounded}</motion.span>
}
