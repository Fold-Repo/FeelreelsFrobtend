import { Container } from '@/components'
import { SETTINGS } from '@/data'
import { Account, Device, Membership, Playback } from './sections'

export default function SettingsView() {
    return (
        <Container className="max-w-5xl py-8 sm:py-20">
            <h1 className="text-[2rem] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl">{SETTINGS.title}</h1>

            <p className="mt-3 text-muted">{SETTINGS.text}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
                <Account />

                <Membership />

                <Playback />

                <Device />
            </div>
        </Container>
    )
}
