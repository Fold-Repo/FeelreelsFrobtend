import Link from 'next/link'
import { FOOTER, SITE } from '@/constants'
import { DownloadAppButton } from '../reusable'
import { Container } from '../ui'
import { Logo } from './Logo'

export function Footer() {
    return (
        <footer className="px-2 pb-2 sm:px-4 sm:pb-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-night pt-16 text-white lg:rounded-[2.5rem]">
                <Container className="relative z-10">
                    <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr_1.2fr]">
                        <div>
                            <Logo tone="dark" />

                            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{FOOTER.tagline}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            {FOOTER.columns.map((column) => (
                                <div key={column.title}>
                                    <p className="text-sm font-medium">{column.title}</p>

                                    <ul className="mt-4 space-y-3">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className="text-sm font-medium">{FOOTER.installTitle}</p>

                            <p className="mt-4 text-sm leading-relaxed text-white/55">{FOOTER.installText}</p>

                            <DownloadAppButton variant="secondary" className="mt-5" />
                        </div>
                    </div>

                    <p className="mt-16 border-t border-white/10 py-6 text-xs text-white/40">{FOOTER.copyright}</p>
                </Container>

                <p
                    aria-hidden
                    className="pointer-events-none -mb-[0.22em] text-center text-[22vw] leading-none font-semibold tracking-[-0.07em] text-white/[0.04] select-none">
                    {SITE.name.toLowerCase()}
                </p>
            </div>
        </footer>
    )
}
