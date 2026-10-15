'use client'

import { Coins, Crown } from 'lucide-react'
import { Button, RollingNumber } from '@/components'
import { SETTINGS } from '@/data'
import { useToast, useViewer } from '@/hooks'
import { cn } from '@/lib'
import { SettingsCard } from '../components/SettingsCard'

export function Membership() {
    const { viewer, setVip, addTokens } = useViewer()
    const { showSuccess } = useToast()
    const copy = SETTINGS.membership
    const unlocked = Object.values(viewer.unlocked).reduce((total, list) => total + list.length, 0)

    const toggleVip = () => {
        setVip(!viewer.vip)
        showSuccess(viewer.vip ? copy.toastCancel : copy.toastVip)
    }

    return (
        <SettingsCard title={copy.title} delay={0.05}>
            <div className={cn('relative overflow-hidden rounded-2xl p-5 transition-colors duration-500', viewer.vip ? 'bg-night text-white' : 'bg-butter')}>
                <Crown className={cn('absolute -top-3 -right-3 size-24 rotate-12', viewer.vip ? 'text-gold/30' : 'text-ink/10')} />

                <p className="text-sm opacity-70">{viewer.vip ? copy.vipActive : copy.vipInactive}</p>

                <p className="mt-1 max-w-[16rem] text-lg font-semibold tracking-[-0.02em]">{copy.vipText}</p>

                <Button size="sm" variant={viewer.vip ? 'secondary' : 'primary'} className="mt-4" onPress={toggleVip}>
                    {viewer.vip ? copy.cancelVip : copy.goVip}
                </Button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
                <Stat label={copy.tokens} value={viewer.tokens} icon={<Coins className="size-4 text-gold" />} />

                <Stat label={copy.unlocked} value={unlocked} />
            </div>

            <Button
                variant="outline"
                className="mt-4 w-full"
                onPress={() => {
                    addTokens(10)
                    showSuccess(copy.toastTokens)
                }}>
                {copy.topUp}
            </Button>
        </SettingsCard>
    )
}

function Stat({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
    return (
        <div className="rounded-2xl bg-background p-4">
            <p className="flex items-center gap-1.5 text-2xl font-semibold tracking-[-0.03em]">
                {icon}

                <RollingNumber value={value} />
            </p>

            <p className="mt-1 text-xs text-muted">{label}</p>
        </div>
    )
}
