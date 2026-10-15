'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu } from 'lucide-react'
import { NAV_ACTIONS, NAV_LINKS } from '@/constants'
import { cn } from '@/lib'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { NavActions } from './NavActions'

export function Navbar() {
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

    return (
        <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
            <motion.nav
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    'relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-[1.25rem] bg-surface px-3 pl-5 ring-[6px] ring-surface/45 transition-shadow duration-500 sm:h-[4.5rem] sm:pl-6',
                    scrolled ? 'shadow-[0_12px_40px_-12px_rgba(20,20,20,0.18)]' : 'shadow-[0_4px_24px_-12px_rgba(20,20,20,0.08)]',
                )}>
                <Logo />

                <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className="block rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-background hover:text-ink">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <NavActions />

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-label={NAV_ACTIONS.menu}
                        className="flex size-10 items-center justify-center rounded-full border border-line bg-surface lg:hidden">
                        <Menu className="size-4" />
                    </button>
                </div>
            </motion.nav>

            <MobileMenu open={open} onClose={() => setOpen(false)} />
        </header>
    )
}
