'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Logo } from '@/components'
import { AUTH } from '@/data'
import { useCatalog } from '@/hooks'
import { EASE } from '@/lib'
import type { Series } from '@/types'

export function AuthPanel() {
    const { data: series = [] } = useCatalog()
    const columns = posterColumns(series)
    const { title, text } = AUTH.panel

    return (
        <div className="relative hidden min-h-[40rem] overflow-hidden rounded-[1.6rem] bg-night lg:block lg:rounded-[2rem]">
            <div className="absolute inset-0 grid -rotate-6 grid-cols-3 gap-3 [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)] opacity-70">
                {columns.map((column, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col gap-3"
                        animate={{ y: index % 2 ? ['-30%', '0%'] : ['0%', '-30%'] }}
                        transition={{ duration: 30, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}>
                        {[...column, ...column].map((series, item) => (
                            <div key={`${series.slug}-${item}`} className="relative aspect-[2/3] overflow-hidden rounded-2xl">
                                <Image src={series.poster} alt="" fill sizes="200px" className="object-cover" />
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>

            <div className="absolute top-8 left-8">
                <Logo tone="dark" />
            </div>

            <motion.div
                className="absolute inset-x-8 bottom-10 text-white"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
                <h2 className="max-w-sm text-4xl leading-[1.05] font-semibold tracking-[-0.035em]">{title}</h2>

                <p className="mt-4 max-w-sm text-white/65">{text}</p>
            </motion.div>
        </div>
    )
}

function posterColumns(series: Series[]) {
    if (!series.length) return []

    const loop = [...series, ...series, ...series]
    const size = Math.max(1, Math.ceil(loop.length / 3))

    return [0, 1, 2].map((index) => loop.slice(index * size, (index + 1) * size))
}
