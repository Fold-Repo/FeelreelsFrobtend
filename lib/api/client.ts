import { viewerStore } from '@/lib/viewer-store'

export class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

export function apiBase() {
    const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || 'https://halloreels.com/api'

    return raw.replace(/\/+$/, '')
}

export function catalogFlags(params: Record<string, string | number | undefined> = {}) {
    const search = new URLSearchParams()

    if (process.env.NEXT_PUBLIC_CATALOG_INCLUDE_ALL === 'true') search.set('includeAll', 'true')

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') search.set(key, String(value))
    }

    const query = search.toString()

    return query ? `?${query}` : ''
}

export function requireDeviceId() {
    viewerStore.ensureGuest()

    const id = viewerStore.getSnapshot().guestId

    if (id.length < 8) throw new ApiError(400, 'This browser does not have a device id yet.')

    return id
}

type RequestOptions = {
    method?: string
    body?: unknown
    device?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers = new Headers({ Accept: 'application/json' })

    if (options.body !== undefined) headers.set('Content-Type', 'application/json')
    if (options.device) headers.set('X-Device-Id', requireDeviceId())

    const response = await fetch(`${apiBase()}${path}`, {
        method: options.method ?? 'GET',
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        cache: 'no-store',
    })

    if (response.status === 204) return undefined as T

    const payload = (await response.json().catch(() => null)) as { success?: boolean; data?: T; message?: unknown } | null

    if (!response.ok) {
        throw new ApiError(response.status, readMessage(payload, response.statusText))
    }

    if (payload && typeof payload === 'object' && payload.success === true && 'data' in payload) {
        return payload.data as T
    }

    return payload as T
}

function readMessage(payload: { message?: unknown } | null, fallback: string) {
    const message = payload?.message

    if (Array.isArray(message)) return message.map(String).join(' ')
    if (typeof message === 'string' && message.trim()) return message

    return fallback || 'Request failed'
}
