export function isHlsUrl(src: string) {
    return /\.m3u8(\?|$)/i.test(src)
}

/** Same-origin playlist URL. The video CDN does not send CORS headers, so the browser cannot fetch HLS directly. */
export function playbackSrc(src: string) {
    if (!src || !isHlsUrl(src)) return src

    return mediaProxyPath(src)
}

export function mediaProxyPath(url: string) {
    return `/api/media/u/${encodeMediaToken(url)}`
}

function encodeMediaToken(url: string) {
    const bytes = new TextEncoder().encode(url)
    let binary = ''

    for (const byte of bytes) binary += String.fromCharCode(byte)

    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function isPlaylistSrc(src: string) {
    return src.startsWith('/api/media') || isHlsUrl(src)
}
