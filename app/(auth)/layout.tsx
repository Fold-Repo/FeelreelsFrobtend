import { AuthLayout } from '@/views'

export default function Layout({ children }: LayoutProps<'/'>) {
    return (
        <main id="main-content" className="flex min-h-screen flex-1 p-2 sm:p-4">
            <AuthLayout>{children}</AuthLayout>
        </main>
    )
}
