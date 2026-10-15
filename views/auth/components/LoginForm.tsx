'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button, CheckBox, Input } from '@/components'
import { AUTH } from '@/data'
import { useToast, useViewer } from '@/hooks'
import { EASE, isEmail } from '@/lib'
import { SocialButtons } from './SocialButtons'

type Errors = Partial<Record<'name' | 'email' | 'password', string>>

export function LoginForm() {
    const router = useRouter()
    const { signIn } = useViewer()
    const { showSuccess } = useToast()
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')
    const [errors, setErrors] = useState<Errors>({})
    const [loading, setLoading] = useState(false)
    const copy = AUTH[mode]
    const { fields } = AUTH

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>
        const next = validate(data, mode === 'signUp')

        setErrors(next)

        if (Object.keys(next).length) return

        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 600))
        if (mode === 'signUp') {
            router.push(`/verify?flow=signup&email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}`)

            return
        }

        signIn({ name: data.email.split('@')[0], email: data.email })
        showSuccess(AUTH.signedIn)
        router.push('/browse')
    }

    return (
        <div className="w-full max-w-sm">
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}>
                    <h1 className="text-3xl font-semibold tracking-[-0.03em]">{copy.title}</h1>

                    <p className="mt-2 text-sm text-muted">{copy.text}</p>
                </motion.div>
            </AnimatePresence>

            <form onSubmit={onSubmit} noValidate className="mt-8">
                {mode === 'signUp' && (
                    <Input name="name" label={fields.name.label} placeholder={fields.name.placeholder} error={errors.name} autoComplete="name" />
                )}

                <Input name="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} error={errors.email} autoComplete="email" />

                <Input
                    name="password"
                    type="password"
                    label={fields.password.label}
                    placeholder={fields.password.placeholder}
                    error={errors.password}
                    autoComplete="current-password"
                />

                <div className="mb-6 flex items-center justify-between">
                    <CheckBox name="remember" label={AUTH.remember} formGroupClass="mb-0" defaultChecked />

                    {mode === 'signIn' && (
                        <Link href="/forgot-password" className="text-sm text-muted hover:text-ink">
                            {AUTH.forgot}
                        </Link>
                    )}
                </div>

                <Button type="submit" size="lg" className="w-full" loading={loading}>
                    {copy.submit}
                </Button>
            </form>

            <SocialButtons />

            <p className="mt-6 text-center text-sm text-muted">
                {copy.switchText}{' '}
                <button
                    type="button"
                    onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
                    className="font-medium text-ink underline-offset-4 hover:underline">
                    {copy.switchCta}
                </button>
            </p>

            <Link href="/" className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-background p-4 transition-colors hover:bg-line/60">
                <span>
                    <span className="block text-sm font-medium">{AUTH.guest}</span>

                    <span className="mt-0.5 block text-xs text-muted">{AUTH.guestHint}</span>
                </span>

                <ArrowRight className="size-4 shrink-0" />
            </Link>
        </div>
    )
}

function validate(data: Record<string, string>, needsName: boolean): Errors {
    const errors: Errors = {}

    if (needsName && !data.name?.trim()) errors.name = AUTH.errors.name
    if (!isEmail(data.email ?? '')) errors.email = AUTH.errors.email
    if ((data.password ?? '').length < 8) errors.password = AUTH.errors.password

    return errors
}
