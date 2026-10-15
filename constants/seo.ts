import { SITE } from './site'

export const SEO_TITLE = SITE.name

export const SEO_DESCRIPTION = SITE.description

export const APP_KEYWORDS = [SITE.name]

export const APP_OPEN_GRAPH = {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: '/',
    siteName: SITE.name,
    locale: 'en_GB',
    type: 'website' as const,
}

export const APP_TWITTER = {
    card: 'summary_large_image' as const,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    creator: SITE.twitter,
}

export const APP_ROBOTS = {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
        'max-snippet': -1,
    },
}

export const APP_THEME_COLOR = '#f6f5f1'
