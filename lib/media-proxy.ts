import { mediaProxyPath } from '@/lib/media-src'

const ALLOWED_HOSTS = new Set([
    'video.dfoldlab.co.uk',
    'res.cloudinary.com',
    'pub-b075de78ad1c43b79ba8de2613270916.r2.dev',
    'halloreels.com',
    'localhost',
    '127.0.0.1',
])

export function decodeMediaToken(token: string) {
    const pad = token.length % 4 === 0 ? '' : '='.repeat(4 - (token.length % 4))
    const binary = atob(token.replace(/-/g, '+').replace(/_/g, '/') + pad)
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

    return new TextDecoder().decode(bytes)
}

export async function proxyMedia(target: string) {
    let upstreamUrl: URL

    try {
        upstreamUrl = new URL(target)
    } catch {
        return new Response('Invalid url', { status: 400 })
    }

    if (!ALLOWED_HOSTS.has(upstreamUrl.hostname)) return new Response('Forbidden', { status: 403 })

    const upstream = await fetch(upstreamUrl, { cache: 'no-store' })

    if (!upstream.ok) return new Response('Media unavailable', { status: upstream.status })

    const type = upstream.headers.get('content-type') ?? ''
    const playlist = type.includes('mpegurl') || upstreamUrl.pathname.endsWith('.m3u8')

    if (!playlist) {
        return new Response(upstream.body, {
            status: 200,
            headers: {
                'Content-Type': type || 'application/octet-stream',
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    }

    return new Response(rewritePlaylist(await upstream.text(), upstreamUrl), {
        status: 200,
        headers: {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': 'public, max-age=60',
            'Netlify-CDN-Cache-Control': 'public, max-age=60',
        },
    })
}

function rewritePlaylist(body: string, playlistUrl: URL) {
    return body
        .split('\n')
        .map((line) => {
            const rewritten = line.replace(/URI="([^"]+)"/g, (_, uri: string) => `URI="${mediaProxyPath(resolveMedia(playlistUrl, uri))}"`)
            const trimmed = rewritten.trim()

            if (!trimmed || trimmed.startsWith('#')) return rewritten

            return mediaProxyPath(resolveMedia(playlistUrl, trimmed))
        })
        .join('\n')
}

function resolveMedia(base: URL, value: string) {
    return new URL(value, base).toString()
}
