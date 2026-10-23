export function formatCount(value: number) {
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

export function formatTime(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00'

    const minutes = Math.floor(seconds / 60)
    const rest = Math.floor(seconds % 60)

    return `${minutes}:${String(rest).padStart(2, '0')}`
}

export function interpolate(template: string, values: Record<string, string | number>) {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''))
}

export function todayStamp() {
    return new Date().toISOString().slice(0, 10)
}

export function timeAgo(date: string, labels: { day: string; month: string; today: string }, now: string) {
    const days = Math.floor((Date.parse(now) - Date.parse(date)) / 86_400_000)

    if (days < 1) return labels.today
    if (days < 30) return interpolate(labels.day, { count: days })

    return interpolate(labels.month, { count: Math.floor(days / 30) })
}
