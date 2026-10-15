import type { InputHTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib'
import { ErrorMessage } from './ErrorMessage'

type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label?: ReactNode
    error?: string
    formGroupClass?: string
}

export function CheckBox({ label, error, formGroupClass, disabled, className, ...props }: CheckBoxProps) {
    return (
        <div className={cn('form-group', formGroupClass)}>
            <label className={cn('inline-flex cursor-pointer items-start gap-2.5', disabled && 'cursor-not-allowed opacity-60')}>
                <span className="relative mt-0.5 shrink-0">
                    <input type="checkbox" disabled={disabled} className="peer sr-only" {...props} />

                    <span
                        aria-hidden
                        className={cn(
                            'flex size-4 items-center justify-center rounded border border-line bg-field text-transparent transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20',
                            className,
                        )}>
                        <Check className="size-3" strokeWidth={3} />
                    </span>
                </span>

                {label && <span className="text-sm leading-snug text-muted">{label}</span>}
            </label>

            <ErrorMessage error={error} />
        </div>
    )
}
