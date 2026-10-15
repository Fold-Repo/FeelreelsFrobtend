import { headers } from 'next/headers'

export async function getOrigin(): Promise<string> {
    const list = await headers()
    const host = list.get('x-forwarded-host') ?? list.get('host') ?? 'localhost:3000'
    const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
    const protocol = list.get('x-forwarded-proto')?.split(',')[0] ?? (isLocal ? 'http' : 'https')

    return `${protocol}://${host}`
}
