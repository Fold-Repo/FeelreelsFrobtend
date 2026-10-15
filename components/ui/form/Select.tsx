import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib'
import { FIELD_RADIUS, FIELD_SIZES, type FieldRadius, type FieldSize } from './constants'
import { FormField, type FormFieldProps } from './FormField'

export type SelectOption = {
    label: string
    value: string
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'name'> &
    FormFieldProps & {
        options: SelectOption[]
        placeholder?: string
        inputSize?: FieldSize
        radius?: FieldRadius
        formGroupClass?: string
    }

export function Select({
    name,
    label,
    required,
    error,
    labelClassName,
    formGroupClass,
    options,
    placeholder,
    inputSize = 'md',
    radius = 'lg',
    className,
    ...props
}: SelectProps) {
    return (
        <FormField name={name} label={label} required={required} error={error} labelClassName={labelClassName} className={formGroupClass}>
            <div className="relative w-full">
                <select
                    id={name}
                    name={name}
                    required={required}
                    aria-invalid={Boolean(error)}
                    className={cn('form-control appearance-none pr-9', FIELD_SIZES[inputSize], FIELD_RADIUS[radius], className)}
                    {...props}>
                    {placeholder && <option value="">{placeholder}</option>}

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
            </div>
        </FormField>
    )
}
