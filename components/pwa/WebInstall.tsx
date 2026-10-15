'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { SITE } from '@/constants'
import { INSTALL } from '@/data'
import { useInstallPrompt } from '@/hooks'
import { detectInstallGuide, type InstallGuide } from '@/lib'
import { Button, FilterTabs } from '../ui'
import { InstallSteps } from './InstallSteps'

const PLATFORMS = INSTALL.store.platforms

export function WebInstall() {
    const { canInstall, install } = useInstallPrompt()
    const [platform, setPlatform] = useState<string>(() => {
        if (typeof navigator === 'undefined') return PLATFORMS[0].value

        const guide = detectInstallGuide()

        return guide === 'mac-safari' || guide === 'desktop' ? 'desktop' : guide === 'android' ? 'android' : 'ios-safari'
    })

    return (
        <div className="rounded-3xl bg-background p-4 text-left">
            <p className="text-sm font-semibold">{INSTALL.store.web}</p>

            <p className="mt-0.5 text-xs text-muted">{INSTALL.store.webText}</p>

            <FilterTabs
                id="platform"
                label={INSTALL.store.web}
                options={PLATFORMS}
                value={platform}
                onChange={setPlatform}
                className="mt-4 [&_button]:h-8 [&_button]:text-xs"
            />

            <InstallSteps steps={INSTALL.guides[platform as InstallGuide]} name={SITE.name} />

            {canInstall && (
                <Button size="sm" className="mt-4 w-full" startContent={<Download className="size-4" />} onPress={install}>
                    {INSTALL.store.installNow}
                </Button>
            )}
        </div>
    )
}
