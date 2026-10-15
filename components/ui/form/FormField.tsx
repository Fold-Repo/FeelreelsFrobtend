import type { ReactNode } from 'react'
import { cn } from '@/lib'
import { ErrorMessage } from './ErrorMessage'
import { Label } from './Label'

export type FormFieldProps = {
    name: string
    label?: ReactNode
    required?: boolean
    error?: string
    className?: string
    labelClassName?: string
}

export function FormField({ name, label, required, error, className, labelClassName, children }: FormFieldProps & { children: ReactNode }) {
    return (
        <div className={cn('form-group', className)}>
            {label && <Label htmlFor={name} label={label} required={required} className={labelClassName} />}

            {children}

            <ErrorMessage error={error} />
        </div>
    )
}
