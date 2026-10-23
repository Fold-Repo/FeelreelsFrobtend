'use client'

import { useCallback } from 'react'
import { WATCH } from '@/data'
import { interpolate } from '@/lib'
import { recordShare } from '@/lib/api'
import type { Series } from '@/types'
import { useShare } from './useShare'

export function useShareSeries(series: Series, episode: number) {
    const { open } = useShare()

    return useCallback(() => {
        const url = `${window.location.origin}/series/${series.slug}${episode > 1 ? `?ep=${episode}` : ''}`

        void recordShare(series.slug).catch(() => undefined)
        open({ title: series.title, text: interpolate(WATCH.shareModal.message, { title: series.title, episode }), url, image: series.thumbnail })
    }, [open, series, episode])
}
