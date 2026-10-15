import type { ReactNode } from 'react'
import { cn } from '@/lib'

type LabelProps = {
    htmlFor?: string
    label: ReactNode
    required?: boolean
    className?: string
}

export function Label({ htmlFor, label, required, className }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={cn('form-label', className)}>
            {label}

            {required && <span className="text-danger"> *</span>}
        </label>
    )
}
