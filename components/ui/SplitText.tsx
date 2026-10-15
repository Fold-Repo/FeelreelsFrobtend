'use client'

import { motion, type Variants } from 'framer-motion'
import { EASE } from '@/lib'

type SplitTextProps = {
    text: string
    delay?: number
    className?: string
    inView?: boolean
}

const WORD: Variants = {
    hidden: { y: '110%', rotate: 6 },
    shown: (index: number) => ({ y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE, delay: index * 0.06 } }),
}

export function SplitText({ text, delay = 0, className, inView }: SplitTextProps) {
    const words = text.split(' ')
    const trigger = inView ? { whileInView: 'shown', viewport: { once: true, amount: 0.2 } } : { animate: 'shown' }

    return (
        <motion.span className={className} aria-label={text} initial="hidden" {...trigger} transition={{ delayChildren: delay }}>
            {words.map((word, index) => (
                <span key={`${word}-${index}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span className="inline-block" variants={WORD} custom={index + delay / 0.06}>
                        {word}

                        {index < words.length - 1 && ' '}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    )
}
