'use client'

type ToggleProps = {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    description?: string
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
    return (
        <label className="flex cursor-pointer items-center justify-between gap-6 py-4">
            <span>
                <span className="block text-sm font-medium">{label}</span>

                {description && <span className="mt-0.5 block text-sm text-muted">{description}</span>}
            </span>

            <span className="relative shrink-0">
                <input type="checkbox" role="switch" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" />

                <span
                    aria-hidden
                    className="block h-6 w-11 rounded-full bg-line transition-colors peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-ink/10 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-surface after:shadow-sm after:transition-transform peer-checked:after:translate-x-5"
                />
            </span>
        </label>
    )
}
