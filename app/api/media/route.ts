const ALLOWED_HOSTS = new Set([
    'video.dfoldlab.co.uk',
    'res.cloudinary.com',
    'pub-b075de78ad1c43b79ba8de2613270916.r2.dev',
    'localhost',
    '127.0.0.1',
])

export async function GET(request: Request) {
    const target = new URL(request.url).searchParams.get('url')

    if (!target) return new Response('Missing url', { status: 400 })

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
                'Cache-Control': 'public, max-age=60',
            },
        })
    }

    const body = rewritePlaylist(await upstream.text(), upstreamUrl)

    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': 'no-store',
        },
    })
}

function rewritePlaylist(body: string, playlistUrl: URL) {
    return body
        .split('\n')
        .map((line) => {
            const rewritten = line.replace(/URI="([^"]+)"/g, (_, uri: string) => `URI="${proxied(resolveMedia(playlistUrl, uri))}"`)
            const trimmed = rewritten.trim()

            if (!trimmed || trimmed.startsWith('#')) return rewritten

            return proxied(resolveMedia(playlistUrl, trimmed))
        })
        .join('\n')
}

function resolveMedia(base: URL, value: string) {
    return new URL(value, base).toString()
}

function proxied(url: string) {
    return `/api/media?url=${encodeURIComponent(url)}`
}
