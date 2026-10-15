'use client'

import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { Button, Input } from '@/components'
import { AUTH } from '@/data'
import { isEmail } from '@/lib'
import { AuthHeader } from './AuthHeader'

export function ForgotForm() {
    const router = useRouter()
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState(false)
    const copy = AUTH.forgotPassword

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const email = String(new FormData(event.currentTarget).get('email') ?? '')

        if (!isEmail(email)) return setError(AUTH.errors.email)

        setError(undefined)
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 600))
        router.push(`/verify?flow=reset&email=${encodeURIComponent(email)}`)
    }

    return (
        <>
            <AuthHeader title={copy.title} text={copy.text} back={{ href: '/login', label: copy.back }} />

            <form onSubmit={onSubmit} noValidate>
                <Input
                    name="email"
                    type="email"
                    label={AUTH.fields.email.label}
                    placeholder={AUTH.fields.email.placeholder}
                    error={error}
                    autoComplete="email"
                    autoFocus
                />

                <Button type="submit" size="lg" className="mt-3 w-full" loading={loading}>
                    {copy.submit}
                </Button>
            </form>
        </>
    )
}
