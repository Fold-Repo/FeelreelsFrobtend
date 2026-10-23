import { apiRequest, catalogFlags } from './client'
import type { StreamPayload, UnlockResult } from './types'

export function getStream(movieId: string, episodeNumber: number) {
    return apiRequest<StreamPayload>(`/playback/${encodeURIComponent(movieId)}/episodes/${episodeNumber}${catalogFlags()}`, { device: true })
}

export function savePlaybackProgress(movieId: string, episodeNumber: number, positionSec: number, durationSec: number) {
    return apiRequest(`/playback/${encodeURIComponent(movieId)}/episodes/${episodeNumber}/progress${catalogFlags()}`, {
        method: 'POST',
        device: true,
        body: { positionSec, durationSec },
    })
}

export function unlockEpisode(movieId: string, episodeNumber: number, method: 'coins' | 'unlock_credit' = 'coins') {
    return apiRequest<UnlockResult>(`/playback/${encodeURIComponent(movieId)}/episodes/${episodeNumber}/unlock${catalogFlags()}`, {
        method: 'POST',
        device: true,
        body: { method },
    })
}
