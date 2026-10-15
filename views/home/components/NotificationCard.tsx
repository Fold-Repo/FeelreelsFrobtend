'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LogoMark } from '@/components'
import { HOME } from '@/data'
import { ALL_SERIES, EASE } from '@/lib'

const SERIES = ALL_SERIES[0]

export function NotificationCard() {
    const { app, time, title, text } = HOME.install.notification

    return (
        <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-8 flex max-w-md items-start gap-3 rounded-[1.4rem] border border-line bg-surface/80 p-3 shadow-[0_18px_40px_-24px_rgba(20,20,20,0.35)] backdrop-blur-xl">
            <LogoMark className="size-9 rounded-[0.6rem]" />

            <div className="min-w-0 flex-1">
                <p className="flex items-center justify-between text-[0.7rem] text-muted">
                    <span className="font-medium tracking-wide">{app}</span>

                    <span>{time}</span>
                </p>

                <p className="mt-0.5 text-sm font-semibold">{title}</p>

                <p className="text-sm leading-snug text-muted">{text}</p>
            </div>

            <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image src={SERIES.poster} alt="" fill sizes="40px" className="object-cover" />
            </span>
        </motion.div>
    )
}
