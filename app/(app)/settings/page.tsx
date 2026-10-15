import type { Metadata } from 'next'
import { SETTINGS } from '@/data'
import { SettingsView } from '@/views'

export const metadata: Metadata = {
    title: SETTINGS.title,
    robots: { index: false },
}

export default function SettingsPage() {
    return <SettingsView />
}
