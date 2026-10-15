import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@/components'
import { StructuredData } from '@/components/seo/StructuredData'
import { APP_KEYWORDS, APP_OPEN_GRAPH, APP_ROBOTS, APP_THEME_COLOR, APP_TWITTER, LABELS, SEO_DESCRIPTION, SEO_TITLE, SITE } from '@/constants'
import { INSTALL_CAPTURE_SCRIPT, jakarta } from '@/lib'
import { getOrigin } from '@/lib/seo'
import { Providers } from '@/providers'
import './globals.css'

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL(await getOrigin()),
        title: { template: `%s | ${SITE.name}`, default: SEO_TITLE },
        description: SEO_DESCRIPTION,
        applicationName: SITE.name,
        keywords: APP_KEYWORDS,
        creator: SITE.name,
        alternates: { canonical: '/' },
        openGraph: APP_OPEN_GRAPH,
        twitter: APP_TWITTER,
        robots: APP_ROBOTS,
        formatDetection: { telephone: false },
        appleWebApp: { capable: true, title: SITE.name, statusBarStyle: 'default' },
        icons: { apple: '/icons/192' },
        ...(googleVerification ? { verification: { google: googleVerification } } : {}),
    }
}

export const viewport: Viewport = {
    themeColor: APP_THEME_COLOR,
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={`${jakarta.variable} h-full`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: INSTALL_CAPTURE_SCRIPT }} />
            </head>

            <body className="flex min-h-full flex-col font-sans antialiased">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm">
                    {LABELS.skipToContent}
                </a>

                <StructuredData />

                <GoogleAnalytics />

                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
