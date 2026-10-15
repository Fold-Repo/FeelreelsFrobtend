'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button, ButtonLink } from '@/components'
import { LABELS } from '@/constants'
import { SETTINGS } from '@/data'
import { useViewer } from '@/hooks'
import { SettingsCard } from '../components/SettingsCard'

export function Account() {
    const { viewer, signOut } = useViewer()
    const [copied, setCopied] = useState(false)
    const copy = SETTINGS.account

    const copyId = async () => {
        await navigator.clipboard?.writeText(viewer.guestId)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
    }

    return (
        <SettingsCard title={copy.title}>
            <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blush to-butter text-xl font-semibold">
                    {(viewer.user?.name ?? 'G').charAt(0).toUpperCase()}
                </span>

                <div className="min-w-0">
                    <p className="font-semibold">{viewer.user ? viewer.user.name : copy.guestTitle}</p>

                    <p className="text-sm text-muted sm:truncate">{viewer.user ? `${copy.signedInAs} ${viewer.user.email}` : copy.guestText}</p>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-background p-3 pl-4">
                <div className="min-w-0">
                    <p className="text-xs text-muted">{copy.deviceId}</p>

                    <p className="truncate font-mono text-sm">{viewer.guestId || '—'}</p>
                </div>

                <button
                    type="button"
                    onClick={copyId}
                    aria-label={LABELS.copy}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface">
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
            </div>

            <div className="mt-6">
                {viewer.user ? (
                    <Button variant="outline" onPress={signOut}>
                        {copy.signOut}
                    </Button>
                ) : (
                    <ButtonLink href="/login">{copy.signIn}</ButtonLink>
                )}
            </div>
        </SettingsCard>
    )
}
