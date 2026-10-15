import { SITE, SOCIAL_LINKS } from '@/constants'

export function buildOrganizationSchema(origin: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: SITE.name,
        url: origin,
        logo: `${origin}/icons/icon-512.png`,
        description: SITE.description,
        sameAs: SOCIAL_LINKS.map((social) => social.href).filter((href) => href !== '#'),
    }
}

export function buildWebSiteSchema(origin: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: SITE.name,
        url: origin,
        publisher: { '@id': `${origin}/#organization` },
    }
}
