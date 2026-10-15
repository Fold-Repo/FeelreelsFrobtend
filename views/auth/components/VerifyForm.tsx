'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { type FormEvent, useEffect, useState } from 'react'
import { Button, ErrorMessage, OtpInput } from '@/components'
import { AUTH } from '@/data'
import { useToast, useViewer } from '@/hooks'
import { interpolate } from '@/lib'
import { AuthHeader } from './AuthHeader'

const RESEND_SECONDS = 30

export function VerifyForm() {
    const router = useRouter()
    const params = useSearchParams()
    const { signIn } = useViewer()
    const { showSuccess } = useToast()
    const [code, setCode] = useState('')
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [left, setLeft] = useState(RESEND_SECONDS)
    const email = params.get('email') ?? ''
    const flow = params.get('flow') ?? 'signup'
    const copy = AUTH.verify

    useEffect(() => {
        if (left <= 0) return

        const timer = setTimeout(() => setLeft((value) => value - 1), 1000)

        return () => clearTimeout(timer)
    }, [left])

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (code.length < 6) return setError(copy.error)

        setError(undefined)
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 700))

        if (flow === 'reset') return router.push(`/reset-password?email=${encodeURIComponent(email)}`)

        signIn({ name: params.get('name') || email.split('@')[0], email })
        showSuccess(AUTH.signedIn)
        router.push('/browse')
    }

    const resend = () => {
        setLeft(RESEND_SECONDS)
        showSuccess(copy.resent)
    }

    return (
        <>
            <AuthHeader
                title={copy.title}
                text={interpolate(copy.text, { email: email || '—' })}

                back={{ href: flow === 'reset' ? '/forgot-password' : '/login', label: copy.wrongEmail }}
            />

            <form onSubmit={onSubmit} noValidate>
                <OtpInput value={code} onChange={setCode} label={copy.label} invalid={Boolean(error)} />

                <ErrorMessage error={error} />

                <p className="mt-3 text-xs text-muted">{copy.hint}</p>

                <Button type="submit" size="lg" className="mt-6 w-full" loading={loading} isDisabled={code.length < 6}>
                    {copy.submit}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                {left > 0 ? (
                    <span className="text-muted tabular-nums">{interpolate(copy.resendIn, { seconds: left })}</span>
                ) : (
                    <button type="button" onClick={resend} className="font-medium underline-offset-4 hover:underline">
                        {copy.resend}
                    </button>
                )}
            </div>

            <Link href="/login" className="sr-only">
                {AUTH.forgotPassword.back}
            </Link>
        </>
    )
}
