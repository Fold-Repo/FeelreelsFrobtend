import { AnimatePresence, motion } from 'framer-motion'

export function CaptionTrack({ lines, current, raised }: { lines: string[]; current: number; raised: boolean }) {
    const index = Math.floor(current / 3) % lines.length
    const line = lines[index]

    return (
        <div
            className={`pointer-events-none absolute inset-x-0 z-20 flex justify-center px-6 transition-[bottom] duration-500 ${raised ? 'bottom-24' : 'bottom-8'}`}>
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-2xl rounded-xl bg-black/70 px-3 py-1.5 text-center text-sm font-medium text-white sm:text-base">
                    {line}
                </motion.p>
            </AnimatePresence>
        </div>
    )
}
