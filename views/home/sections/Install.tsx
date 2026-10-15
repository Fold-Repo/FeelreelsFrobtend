import Image from 'next/image'
import { Container, FadeUp, LogoMark, StoreBadge } from '@/components'
import { HOME, INSTALL } from '@/data'
import { ALL_SERIES } from '@/lib'
import { NotificationCard } from '../components/NotificationCard'

export function Install() {
    const { title, accent, text } = HOME.install

    return (
        <section id="app" className="scroll-mt-28 py-24 sm:py-32">
            <Container className="grid items-center gap-14 lg:grid-cols-2">
                <FadeUp>
                    <h2 className="text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">
                        {title}

                        <span className="block text-muted/70">{accent}</span>
                    </h2>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{text}</p>

                    <NotificationCard />

                    <div className="mt-10 grid max-w-md grid-cols-2 gap-3 [&_a]:px-3">
                        <StoreBadge store="apple" {...INSTALL.store.appStore} />

                        <StoreBadge store="play" {...INSTALL.store.playStore} />
                    </div>
                </FadeUp>

                <FadeUp delay={0.15}>
                    <div className="rounded-[2rem] bg-linear-to-br from-sky via-surface to-blush p-4 sm:p-8">
                        <div className="overflow-hidden rounded-2xl bg-surface shadow-[0_30px_60px_-25px_rgba(20,20,20,0.35)]">
                            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                                <span className="size-2.5 rounded-full bg-line" />

                                <span className="size-2.5 rounded-full bg-line" />

                                <span className="size-2.5 rounded-full bg-line" />

                                <LogoMark className="ml-3 size-5" />
                            </div>

                            <div className="grid grid-cols-4 gap-2 p-3">
                                {ALL_SERIES.slice(10, 18).map((series) => (
                                    <div key={series.slug} className="relative aspect-[2/3] overflow-hidden rounded-xl">
                                        <Image src={series.poster} alt="" fill sizes="120px" className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeUp>
            </Container>
        </section>
    )
}
