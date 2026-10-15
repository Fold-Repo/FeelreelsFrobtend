import { Fragment, type ReactNode } from 'react'
import { Download, EllipsisVertical, Share, SquarePlus } from 'lucide-react'

const ICONS: Record<string, ReactNode> = {
    '{share}': <Share className="mx-0.5 inline size-4 -translate-y-px text-accent" />,
    '{add}': <SquarePlus className="mx-0.5 inline size-4 -translate-y-px text-accent" />,
    '{menu}': <EllipsisVertical className="mx-0.5 inline size-4 -translate-y-px text-accent" />,
    '{install}': <Download className="mx-0.5 inline size-4 -translate-y-px text-accent" />,
}

export function InstallSteps({ steps, name }: { steps: string[]; name: string }) {
    return (
        <ol className="mt-4 space-y-3 text-sm">
            {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-2.5">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-background text-xs font-semibold">{index + 1}</span>

                    <span className="pt-0.5">
                        {step
                            .replace('{name}', name)
                            .split(/(\{share\}|\{add\}|\{menu\}|\{install\})/)
                            .map((part, key) => (
                                <Fragment key={key}>{ICONS[part] ?? part}</Fragment>
                            ))}
                    </span>
                </li>
            ))}
        </ol>
    )
}
