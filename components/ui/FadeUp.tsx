'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE, VIEWPORT } from '@/lib'

export type FadeUpProps = {
    children: ReactNode
    delay?: number
    className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay }}>
            {children}
        </motion.div>
    )
}
