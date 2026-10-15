import Link from 'next/link'
import type { ComponentProps } from 'react'
import { buttonVariants } from '@heroui/styles'
import { cn } from '@/lib'

type ButtonLinkProps = ComponentProps<typeof Link> & {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
}

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
    return (
        <Link
            className={cn(buttonVariants({ variant, size }), 'rounded-full font-medium', variant === 'primary' && 'bg-primary text-on-primary', className)}
            {...props}
        />
    )
}
