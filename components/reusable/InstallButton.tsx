'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { LABELS, SITE } from '@/constants'
import { INSTALL } from '@/data'
import { useInstallPrompt } from '@/hooks'
import { detectInstallGuide, type InstallGuide } from '@/lib'
import { InstallSteps } from '../pwa/InstallSteps'
import { Button, type ButtonProps } from '../ui'

export function InstallButton({
    className,
    buttonClassName,
    ...props
}: Omit<ButtonProps, 'onPress' | 'children' | 'className'> & { className?: string; buttonClassName?: string }) {
    const { canInstall, installed, install } = useInstallPrompt()
    const [guide, setGuide] = useState<InstallGuide | null>(null)
    const [asked, setAsked] = useState(false)

    const onPress = async () => {
        if (canInstall) await install()
        else {
            setGuide(detectInstallGuide())
            setAsked(true)
        }
    }

    return (
        <div className={className}>
            <Button isDisabled={installed} startContent={<Download className="size-4" />} onPress={onPress} className={buttonClassName ?? 'w-full'} {...props}>
                {installed ? LABELS.installed : LABELS.install}
            </Button>

            {asked &&
                (guide ? (
                    <div className="text-left">
                        <InstallSteps steps={INSTALL.guides[guide]} name={SITE.name} />
                    </div>
                ) : (
                    <p className="mt-3 text-xs text-muted">{LABELS.installHint}</p>
                ))}
        </div>
    )
}
