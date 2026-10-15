'use client'

import type { ReactNode } from 'react'
import { Button as HeroButton, type ButtonProps as HeroButtonProps, Spinner } from '@heroui/react'
import { cn } from '@/lib'

export type ButtonProps = Omit<HeroButtonProps, 'children'> & {
    children?: ReactNode
    loading?: boolean
    startContent?: ReactNode
    endContent?: ReactNode
}

export function Button({
    children,
    loading = false,
    isDisabled,
    startContent,
    endContent,
    variant = 'primary',
    type = 'button',
    className,
    ...props
}: ButtonProps) {
    return (
        <HeroButton
            type={type}
            variant={variant}
            isPending={loading}
            isDisabled={isDisabled || loading}
            className={cn('rounded-full font-medium', variant === 'primary' && 'bg-primary text-on-primary', className)}
            {...props}>
            {loading ? <Spinner color="current" size="sm" /> : startContent}

            {children}

            {!loading && endContent}
        </HeroButton>
    )
}
