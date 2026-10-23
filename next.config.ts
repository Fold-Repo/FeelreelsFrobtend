import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        // Catalog covers are served by the local API (localhost:3005). The optimizer
        // otherwise rejects that host because it resolves to a private IP.
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost', pathname: '/**' },
            { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
            { protocol: 'https', hostname: 'video.dfoldlab.co.uk', pathname: '/**' },
            { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
            { protocol: 'https', hostname: 'pub-b075de78ad1c43b79ba8de2613270916.r2.dev', pathname: '/**' },
        ],
    },
    experimental: {
        agentFeedback: true,
    },
    cacheComponents: true,
    partialPrefetching: true,
    turbopack: {
        root: process.cwd(),
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
}

export default nextConfig
