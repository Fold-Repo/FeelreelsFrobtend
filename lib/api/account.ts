import { apiRequest } from './client'
import type { Engagement, PurchasedItems, WalletBalance, WatchlistPayload } from './types'

export function registerDevice(deviceId: string) {
    return apiRequest('/devices/register', { method: 'POST', body: { deviceId } })
}

export function getBalance() {
    return apiRequest<WalletBalance>('/wallet/balance', { device: true })
}

export function getWatchlist() {
    return apiRequest<WatchlistPayload>('/watchlist', { device: true })
}

export function addToWatchlist(movieId: string) {
    return apiRequest('/watchlist/items', { method: 'POST', device: true, body: { movieId } })
}

export function removeFromWatchlist(movieId: string) {
    return apiRequest(`/watchlist/items/${encodeURIComponent(movieId)}`, { method: 'DELETE', device: true })
}

export function getEngagement(movieId: string) {
    return apiRequest<Engagement>(`/catalog/movies/${encodeURIComponent(movieId)}/engagement`, { device: true })
}

export function likeMovie(movieId: string) {
    return apiRequest<Engagement>(`/catalog/movies/${encodeURIComponent(movieId)}/like`, { method: 'POST', device: true })
}

export function unlikeMovie(movieId: string) {
    return apiRequest<Engagement>(`/catalog/movies/${encodeURIComponent(movieId)}/like`, { method: 'DELETE', device: true })
}

export function recordShare(movieId: string) {
    return apiRequest<Engagement>(`/catalog/movies/${encodeURIComponent(movieId)}/share`, { method: 'POST', device: true, body: {} })
}

export function getPurchasedItems() {
    return apiRequest<PurchasedItems>('/profile/items', { device: true })
}
