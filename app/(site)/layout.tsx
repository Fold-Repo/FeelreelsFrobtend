import { Footer, Navbar, ScrollProgress } from '@/components'

export default function SiteLayout({ children }: LayoutProps<'/'>) {
    return (
        <>
            <ScrollProgress />

            <Navbar />

            <main id="main-content" className="flex-1">
                {children}
            </main>

            <Footer />
        </>
    )
}
