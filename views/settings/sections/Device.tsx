'use client'

import { Button, DownloadAppButton } from '@/components'
import { SETTINGS } from '@/data'
import { useToast, useViewer } from '@/hooks'
import { SettingsCard } from '../components/SettingsCard'

export function Device() {
    const { reset } = useViewer()
    const { showSuccess } = useToast()
    const { app, device } = SETTINGS

    return (
        <div className="grid min-w-0 gap-4">
            <SettingsCard title={app.title} delay={0.15}>
                <p className="mb-5 text-sm text-muted">{app.text}</p>

                <DownloadAppButton />
            </SettingsCard>

            <SettingsCard title={device.title} delay={0.2}>
                <p className="mb-5 text-sm text-muted">{device.text}</p>

                <Button
                    variant="danger-soft"
                    onPress={() => {
                        reset()
                        showSuccess(device.toast)
                    }}>
                    {device.reset}
                </Button>
            </SettingsCard>
        </div>
    )
}
