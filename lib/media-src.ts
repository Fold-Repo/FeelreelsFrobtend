export function isHlsUrl(src: string) {
    return /\.m3u8(\?|$)/i.test(src)
}

/** Same-origin playlist URL. The video CDN does not send CORS headers, so the browser cannot fetch HLS directly. */
export function playbackSrc(src: string) {
    if (!src || !isHlsUrl(src)) return src

    return `/api/media?url=${encodeURIComponent(src)}`
}

export function isPlaylistSrc(src: string) {
    return src.startsWith('/api/media') || isHlsUrl(src)
}
