import { Check } from 'lucide-react'
import { checkPassword, cn } from '@/lib'

type PasswordRequirementsProps = {
    password: string
    rules: { id: string; label: string }[]
    className?: string
}

export function PasswordRequirements({ password, rules, className }: PasswordRequirementsProps) {
    const results = checkPassword(password, rules)
    const passed = results.filter((rule) => rule.ok).length

    return (
        <div className={className}>
            <div className="mb-3 grid grid-cols-4 gap-1">
                {results.map((rule, index) => (
                    <span
                        key={rule.id}
                        className={cn(
                            'h-1 rounded-full transition-colors duration-500',
                            index < passed ? (passed === results.length ? 'bg-success' : 'bg-gold') : 'bg-line',
                        )}
                    />
                ))}
            </div>

            <ul className="grid gap-1.5 text-xs sm:grid-cols-2">
                {results.map((rule) => (
                    <li key={rule.id} className={cn('flex items-center gap-2 transition-colors', rule.ok ? 'text-ink' : 'text-muted')}>
                        <span
                            className={cn(
                                'grid size-4 shrink-0 place-items-center rounded-full border transition-colors',
                                rule.ok ? 'border-success bg-success text-white' : 'border-line',
                            )}>
                            {rule.ok && <Check className="size-2.5" strokeWidth={3} />}
                        </span>

                        {rule.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}
