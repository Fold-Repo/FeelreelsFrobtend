import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AUTH } from '@/data'
import { ResetPasswordView } from '@/views'

export const metadata: Metadata = {
    title: AUTH.reset.title,
    robots: { index: false },
}

export default function Page() {
    return (
        <Suspense>
            <ResetPasswordView />
        </Suspense>
    )
}
