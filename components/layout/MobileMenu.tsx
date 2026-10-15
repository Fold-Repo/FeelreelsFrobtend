'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { NAV_ACTIONS, NAV_LINKS } from '@/constants'
import { EASE } from '@/lib'
import { ButtonLink } from '../ui'
import { Logo } from './Logo'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="fixed inset-2 z-60 flex flex-col rounded-[2rem] bg-surface p-5 shadow-2xl lg:hidden">
                    <div className="flex items-center justify-between">
                        <Logo />

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={NAV_ACTIONS.closeMenu}
                            className="flex size-10 items-center justify-center rounded-full border border-line">
                            <X className="size-4" />
                        </button>
                    </div>

                    <ul className="mt-10 flex flex-col gap-1">
                        {NAV_LINKS.map((link, index) => (
                            <motion.li
                                key={link.label}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index + 0.1 }}>
                                <Link href={link.href} onClick={onClose} className="block py-3 text-3xl font-semibold tracking-[-0.03em]">
                                    {link.label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-auto grid gap-2">
                        <ButtonLink href="/login" variant="outline" size="lg" onClick={onClose}>
                            {NAV_ACTIONS.signIn}
                        </ButtonLink>

                        <ButtonLink href="/browse" size="lg" onClick={onClose}>
                            {NAV_ACTIONS.start}
                        </ButtonLink>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
