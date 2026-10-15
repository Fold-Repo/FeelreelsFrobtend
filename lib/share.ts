export type SharePayload = {
    title: string
    text: string
    url: string
    image?: string
}

const listeners = new Set<() => void>()

let payload: SharePayload | null = null

export const shareStore = {
    subscribe(listener: () => void) {
        listeners.add(listener)

        return () => listeners.delete(listener)
    },
    get: () => payload,
    set(next: SharePayload | null) {
        payload = next
        listeners.forEach((listener) => listener())
    },
}

export function shareLink(target: string, { title, text, url }: SharePayload) {
    const u = encodeURIComponent(url)
    const t = encodeURIComponent(text)

    const links: Record<string, string> = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
        x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
        telegram: `https://t.me/share/url?url=${u}&text=${t}`,
        reddit: `https://www.reddit.com/submit?url=${u}&title=${encodeURIComponent(title)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    }

    return links[target]
}
