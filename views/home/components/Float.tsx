'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn, EASE } from '@/lib'

type FloatProps = {
    children: ReactNode
    className: string
    delay: number
    depth: number
    slow?: boolean
}

export function Float({ children, className, delay, depth, slow }: FloatProps) {
    return (
        <motion.div
            className={cn('absolute z-10', className)}
            style={{ translateZ: depth }}
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay }}>
            <div className="animate-float" style={{ animationDelay: `${delay}s`, animationDuration: slow ? '8s' : '6s' }}>
                {children}
            </div>
        </motion.div>
    )
}
