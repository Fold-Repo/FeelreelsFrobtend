import { FaApple, FaGooglePlay } from 'react-icons/fa'

const ICONS = {
    apple: <FaApple className="size-7 shrink-0" />,
    play: <FaGooglePlay className="size-6 shrink-0" />,
}

type StoreBadgeProps = {
    store: keyof typeof ICONS
    label: string
    name: string
    href: string
}

export function StoreBadge({ store, label, name, href }: StoreBadgeProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 min-w-0 items-center justify-center gap-2.5 rounded-2xl bg-primary px-4 text-on-primary transition-transform hover:scale-[0.98]">
            {ICONS[store]}

            <span className="min-w-0 text-left leading-tight whitespace-nowrap">
                <span className="block text-[0.65rem] opacity-70">{label}</span>

                <span className="block text-[0.95rem] font-semibold tracking-[-0.02em]">{name}</span>
            </span>
        </a>
    )
}
