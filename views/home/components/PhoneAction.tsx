import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function PhoneAction({ icon, label, pulse }: { icon: ReactNode; label: string; pulse?: boolean }) {
    return (
        <span className="flex flex-col items-center gap-1">
            <motion.span
                className="flex size-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md"
                animate={pulse ? { scale: [1, 1.18, 1] } : undefined}
                transition={pulse ? { duration: 1.4, repeat: Infinity, repeatDelay: 1.6 } : undefined}>
                {icon}
            </motion.span>

            <span className="text-[0.6rem] font-medium">{label}</span>
        </span>
    )
}
