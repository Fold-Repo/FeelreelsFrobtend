'use client'

import { Coins, Crown } from 'lucide-react'
import { Button, RollingNumber } from '@/components'
import { SETTINGS } from '@/data'
import { useToast, useViewer, useWallet } from '@/hooks'
import { cn } from '@/lib'
import { SettingsCard } from '../components/SettingsCard'

export function Membership() {
    const { viewer } = useViewer()
    const { data: wallet } = useWallet()
    const { showInfo } = useToast()
    const copy = SETTINGS.membership
    const vip = wallet?.vipActive ?? viewer.vip
    const coins = wallet?.coinBalance ?? viewer.tokens
    const unlocked = Object.values(viewer.unlocked).reduce((total, list) => total + list.length, 0)

    return (
        <SettingsCard title={copy.title} delay={0.05}>
            <div className={cn('relative overflow-hidden rounded-2xl p-5 transition-colors duration-500', vip ? 'bg-night text-white' : 'bg-butter')}>
                <Crown className={cn('absolute -top-3 -right-3 size-24 rotate-12', vip ? 'text-gold/30' : 'text-ink/10')} />

                <p className="text-sm opacity-70">{vip ? copy.vipActive : copy.vipInactive}</p>

                <p className="mt-1 max-w-[16rem] text-lg font-semibold tracking-[-0.02em]">{copy.vipText}</p>

                <Button size="sm" variant={vip ? 'secondary' : 'primary'} className="mt-4" onPress={() => showInfo('VIP is purchased from a signed-in account.')}>
                    {vip ? copy.cancelVip : copy.goVip}
                </Button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
                <Stat label={copy.tokens} value={coins} icon={<Coins className="size-4 text-gold" />} />

                <Stat label={copy.unlocked} value={unlocked} />
            </div>

            <Button
                variant="outline"
                className="mt-4 w-full"
                onPress={() => showInfo('Coin refill needs a signed-in account.')}>
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
