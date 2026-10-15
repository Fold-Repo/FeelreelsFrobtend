import type { MetadataRoute } from 'next'
import { SITE } from '@/constants'

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        name: SITE.name,
        short_name: SITE.name,
        description: SITE.description,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        orientation: 'any',
        background_color: '#f6f5f1',
        theme_color: '#141414',
        categories: ['entertainment', 'video'],
        icons: [
            { src: '/icons/192', sizes: '192x192', type: 'image/png' },
            { src: '/icons/512', sizes: '512x512', type: 'image/png' },
            { src: '/icons/maskable', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
    }
}
