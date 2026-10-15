import type { ReactNode } from 'react'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AUTH } from '@/data'

export function SocialButtons() {
    return (
        <>
            <div className="my-6 flex items-center gap-4 text-xs text-muted">
                <span className="h-px flex-1 bg-line" />

                {AUTH.or}

                <span className="h-px flex-1 bg-line" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <SocialButton label={AUTH.google} icon={<FcGoogle className="size-5" />} />

                <SocialButton label={AUTH.apple} icon={<FaApple className="size-5" />} />
            </div>
        </>
    )
}

function SocialButton({ label, icon }: { label: string; icon: ReactNode }) {
    return (
        <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface text-sm font-medium transition-colors hover:bg-background">
            {icon}

            {label}
        </button>
    )
}
