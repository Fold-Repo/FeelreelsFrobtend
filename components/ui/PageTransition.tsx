'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib'

export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none', transform: 'none' } }}
            transition={{ duration: 0.7, ease: EASE }}>
            {children}
        </motion.div>
    )
}
