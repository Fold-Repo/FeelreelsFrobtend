import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AUTH } from '@/data'
import { ForgotPasswordView } from '@/views'

export const metadata: Metadata = {
    title: AUTH.forgotPassword.title,
    robots: { index: false },
}

export default function Page() {
    return (
        <Suspense>
            <ForgotPasswordView />
        </Suspense>
    )
}
