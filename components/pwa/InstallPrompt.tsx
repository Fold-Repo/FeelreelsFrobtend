'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SITE } from '@/constants'
import { INSTALL } from '@/data'
import { isStandalone, useInstallPrompt } from '@/hooks'
import { detectInstallGuide, EASE, type InstallGuide } from '@/lib'
import { LogoMark } from '../layout/Logo'
import { Button } from '../ui'
import { InstallSteps } from './InstallSteps'

const DISMISS_KEY = 'feelreels.install-dismissed-at'
const DISMISS_DAYS = 3
const SHOW_AFTER_MS = 4000
const HIDDEN_ON = ['/login']

const dismissedRecently = () => {
    try {
        const at = Number(window.localStorage.getItem(DISMISS_KEY))

        return Boolean(at) && Date.now() - at < DISMISS_DAYS * 86_400_000
    } catch {
        return false
    }
}

export function InstallPrompt() {
    const pathname = usePathname() ?? ''
    const { canInstall, install } = useInstallPrompt()
    const [guide, setGuide] = useState<InstallGuide | null>(null)
    const [eligible, setEligible] = useState(false)
    const [open, setOpen] = useState(false)
    const [showSteps, setShowSteps] = useState(false)
    const canShow = eligible && !HIDDEN_ON.includes(pathname) && (canInstall || Boolean(guide))
    const name = SITE.name

    useEffect(() => {
        const id = window.setTimeout(() => {
            setGuide(detectInstallGuide())
            setEligible(!isStandalone() && !dismissedRecently())
        }, 0)

        return () => window.clearTimeout(id)
    }, [])

    useEffect(() => {
        if (!canShow) return

        const id = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS)

        return () => window.clearTimeout(id)
    }, [canShow])

    const dismiss = () => {
        try {
            window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
        } catch {}

        setOpen(false)
    }

    const onInstall = async () => ((await install()) ? setOpen(false) : dismiss())

    return (
        <AnimatePresence>
            {open && canShow && (
                <motion.div
                    role="dialog"
                    aria-label={INSTALL.title.replace('{name}', name)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="fixed inset-x-3 bottom-3 z-70 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm">
                    <div className="relative rounded-3xl border border-line bg-surface p-5 shadow-[0_18px_40px_-16px_rgba(20,20,20,0.3)]">
                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label={INSTALL.close}
                            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full text-muted hover:bg-background">
                            <X className="size-4" />
                        </button>

                        <div className="flex items-start gap-3 pr-8">
                            <LogoMark className="size-10 shrink-0" />

                            <div>
                                <p className="text-sm font-semibold">{(showSteps ? INSTALL.guideTitle : INSTALL.title).replace('{name}', name)}</p>

                                {!showSteps && <p className="mt-1 text-sm leading-relaxed text-muted">{INSTALL.body}</p>}
                            </div>
                        </div>

                        {showSteps && guide && <InstallSteps steps={INSTALL.guides[guide]} name={name} />}

                        <div className="mt-4 flex items-center gap-2">
                            {canInstall ? (
                                <Button size="sm" onPress={onInstall}>
                                    {INSTALL.install}
                                </Button>
                            ) : (
                                <Button size="sm" onPress={showSteps ? dismiss : () => setShowSteps(true)}>
                                    {showSteps ? INSTALL.done : INSTALL.howTo}
                                </Button>
                            )}

                            {!showSteps && (
                                <Button size="sm" variant="ghost" onPress={dismiss}>
                                    {INSTALL.later}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
