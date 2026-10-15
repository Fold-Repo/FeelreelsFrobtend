import type { Metadata } from 'next'
import { AUTH } from '@/data'
import { LoginView } from '@/views'

export const metadata: Metadata = {
    title: AUTH.signIn.submit,
    robots: { index: false },
}

export default function LoginPage() {
    return <LoginView />
}
