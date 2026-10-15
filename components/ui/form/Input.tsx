'use client'

import { type InputHTMLAttributes, type ReactNode, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { LABELS } from '@/constants'
import { cn } from '@/lib'
import { FIELD_RADIUS, FIELD_SIZES, type FieldRadius, type FieldSize } from './constants'
import { FormField, type FormFieldProps } from './FormField'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'name'> &
    FormFieldProps & {
        startContent?: ReactNode
        endContent?: ReactNode
        inputSize?: FieldSize
        radius?: FieldRadius
        formGroupClass?: string
    }

export function Input({
    name,
    label,
    required,
    error,
    labelClassName,
    formGroupClass,
    startContent,
    endContent,
    inputSize = 'md',
    radius = 'lg',
    type = 'text',
    className,
    ...props
}: InputProps) {
    const [visible, setVisible] = useState(false)
    const isPassword = type === 'password'
    const end = endContent ?? (isPassword && <PasswordToggle visible={visible} onToggle={() => setVisible((value) => !value)} />)

    return (
        <FormField name={name} label={label} required={required} error={error} labelClassName={labelClassName} className={formGroupClass}>
            <div className="relative w-full">
                {startContent && <div className="absolute inset-y-0 left-3 flex items-center">{startContent}</div>}

                <input
                    id={name}
                    name={name}
                    type={isPassword && visible ? 'text' : type}
                    required={required}
                    aria-invalid={Boolean(error)}
                    className={cn('form-control', FIELD_SIZES[inputSize], FIELD_RADIUS[radius], startContent && 'pl-9', end && 'pr-9', className)}
                    {...props}
                />

                {end && <div className="absolute inset-y-0 right-3 flex items-center">{end}</div>}
            </div>
        </FormField>
    )
}

function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
    const Icon = visible ? EyeOff : Eye

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={visible ? LABELS.hidePassword : LABELS.showPassword}
            className="text-muted transition-colors hover:text-ink">
            <Icon className="size-4" />
        </button>
    )
}
