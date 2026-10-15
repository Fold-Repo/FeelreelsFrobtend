import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BROWSE } from '@/data'
import { BrowseView } from '@/views'

export const metadata: Metadata = {
    title: BROWSE.title,
    alternates: { canonical: '/browse' },
}

export default function BrowsePage() {
    return (
        <Suspense>
            <BrowseView />
        </Suspense>
    )
}
