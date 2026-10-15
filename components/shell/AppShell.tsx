'use client'

import { type ReactNode, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_SHELL } from '@/data'
import { cn, EASE } from '@/lib'
import { Sidebar } from './Sidebar'
import { SidebarDownload } from './SidebarDownload'
import { SidebarHeader } from './SidebarHeader'
import { TopBar } from './TopBar'

export function AppShell({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)
    const [drawer, setDrawer] = useState(false)

    return (
        <div className="flex min-h-dvh flex-1 bg-surface">
            <aside
                className={cn(
                    'sticky top-0 hidden h-dvh shrink-0 flex-col self-start overflow-hidden border-r border-line transition-[width] duration-500 ease-out lg:flex',
                    collapsed ? 'w-[5.25rem]' : 'w-64',
                )}>
                <SidebarHeader collapsed={collapsed} onMenu={() => setCollapsed((value) => !value)} />

                <Suspense>
                    <Sidebar collapsed={collapsed} />
                </Suspense>

                <SidebarDownload collapsed={collapsed} />
            </aside>

            <AnimatePresence>
                {drawer && (
                    <>
                        <motion.button
                            type="button"
                            aria-label={APP_SHELL.menu}
                            className="fixed inset-0 z-60 bg-ink/30 backdrop-blur-sm lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawer(false)}
                        />

                        <motion.aside
                            className="fixed inset-y-0 left-0 z-60 flex w-72 max-w-[85vw] flex-col bg-surface shadow-2xl lg:hidden"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.45, ease: EASE }}>
                            <SidebarHeader collapsed={false} onMenu={() => setDrawer(false)} />

                            <Suspense>
                                <Sidebar collapsed={false} onNavigate={() => setDrawer(false)} />
                            </Suspense>

                            <SidebarDownload collapsed={false} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex min-w-0 flex-1 flex-col">
                <TopBar onMenu={() => setDrawer(true)} />

                <main id="main-content" className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
