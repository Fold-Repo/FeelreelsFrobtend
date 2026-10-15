'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib'

export function GenreReveal({ children, index, className }: { children: ReactNode; index: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: EASE, delay: (index % 4) * 0.08 }}>
            {children}
        </motion.div>
    )
}
