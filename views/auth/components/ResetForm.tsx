'use client'

import { type FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, ButtonLink, Input, PasswordRequirements } from '@/components'
import { AUTH } from '@/data'
import { checkPassword, EASE } from '@/lib'
import { AuthHeader } from './AuthHeader'

export function ResetForm() {
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const copy = AUTH.reset

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const confirm = String(new FormData(event.currentTarget).get('confirm') ?? '')
        const strong = checkPassword(password, AUTH.passwordRules).every((rule) => rule.ok)
        const next = { password: strong ? undefined : copy.weak, confirm: confirm === password ? undefined : copy.mismatch }

        setErrors(next)

        if (next.password || next.confirm) return

        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 700))
        setDone(true)
    }

    return (
        <AnimatePresence mode="wait">
            {done ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}>
                    <AuthHeader title={AUTH.done.reset.title} text={AUTH.done.reset.text} />

                    <ButtonLink href="/login" size="lg" className="w-full">
                        {AUTH.done.reset.cta}
                    </ButtonLink>
                </motion.div>
            ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -12 }}>
                    <AuthHeader title={copy.title} text={copy.text} />

                    <form onSubmit={onSubmit} noValidate>
                        <Input
                            name="password"
                            type="password"
                            label={copy.password.label}
                            placeholder={copy.password.placeholder}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                        />

                        <PasswordRequirements password={password} rules={AUTH.passwordRules} className="mb-5" />

                        <Input
                            name="confirm"
                            type="password"
                            label={copy.confirm.label}
                            placeholder={copy.confirm.placeholder}
                            error={errors.confirm}
                            autoComplete="new-password"
                        />

                        <Button type="submit" size="lg" className="mt-3 w-full" loading={loading}>
                            {copy.submit}
                        </Button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
