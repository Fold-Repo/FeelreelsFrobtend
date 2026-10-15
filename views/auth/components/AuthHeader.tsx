'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { EASE } from '@/lib'

type AuthHeaderProps = {
    title: string
    text: ReactNode
    back?: { href: string; label: string }
}

export function AuthHeader({ title, text, back }: AuthHeaderProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mb-8">
            {back && (
                <Link href={back.href} className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                    <ArrowLeft className="size-4" />

                    {back.label}
                </Link>
            )}

            <h1 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h1>

            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
        </motion.div>
    )
}
