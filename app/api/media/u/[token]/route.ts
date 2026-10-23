import { proxyMedia, decodeMediaToken } from '@/lib/media-proxy'

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
    const { token } = await context.params

    let target: string

    try {
        target = decodeMediaToken(token)
    } catch {
        return new Response('Invalid url', { status: 400 })
    }

    return proxyMedia(target)
}
