import type { ReactNode } from 'react'
import { Logo } from '@/components'
import { AuthPanel } from './components/AuthPanel'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="grid w-full gap-2 rounded-[2rem] bg-surface p-2 ring-[6px] ring-surface/50 lg:grid-cols-2 lg:rounded-[2.5rem]">
            <AuthPanel />

            <div className="flex flex-col px-4 py-8 sm:px-10">
                <div className="lg:hidden">
                    <Logo />
                </div>

                <div className="flex flex-1 items-center justify-center py-10">
                    <div className="w-full max-w-sm">{children}</div>
                </div>
            </div>
        </div>
    )
}
