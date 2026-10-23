import { proxyMedia } from '@/lib/media-proxy'

export async function GET(request: Request) {
    const target = new URL(request.url).searchParams.get('url')

    if (!target) return new Response('Missing url', { status: 400 })

    const response = await proxyMedia(target)

    response.headers.set('Cache-Control', 'private, no-store')
    response.headers.set('Netlify-CDN-Cache-Control', 'no-store')

    return response
}
