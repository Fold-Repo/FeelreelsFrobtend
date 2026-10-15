import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib'
import { FIELD_RADIUS, type FieldRadius } from './constants'
import { FormField, type FormFieldProps } from './FormField'

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> &
    FormFieldProps & {
        radius?: FieldRadius
        formGroupClass?: string
    }

export function TextArea({ name, label, required, error, labelClassName, formGroupClass, radius = 'lg', className, ...props }: TextAreaProps) {
    return (
        <FormField name={name} label={label} required={required} error={error} labelClassName={labelClassName} className={formGroupClass}>
            <textarea
                id={name}
                name={name}
                required={required}
                aria-invalid={Boolean(error)}
                className={cn('form-control min-h-30 resize-y', FIELD_RADIUS[radius], className)}
                {...props}
            />
        </FormField>
    )
}
