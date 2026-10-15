import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AUTH } from '@/data'
import { VerifyView } from '@/views'

export const metadata: Metadata = {
    title: AUTH.verify.title,
    robots: { index: false },
}

export default function Page() {
    return (
        <Suspense>
            <VerifyView />
        </Suspense>
    )
}
