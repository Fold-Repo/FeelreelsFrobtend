'use client'

import { type ComponentProps, useEffect, useRef } from 'react'
import { cn } from '@/lib'
import { isPlaylistSrc } from '@/lib/media-src'

function stopVideo(video: HTMLVideoElement | null) {
    if (!video) return

    video.pause()
    video.removeAttribute('src')
    video.load()
}

function isConcealed(video: HTMLElement) {
    let node: HTMLElement | null = video

    while (node) {
        if (node.hidden) return true

        const style = getComputedStyle(node)

        if (style.display === 'none' || style.visibility === 'hidden') return true

        node = node.parentElement
    }

    return false
}

export function ProtectedVideo({ className, src, ref, ...props }: ComponentProps<'video'>) {
    const localRef = useRef<HTMLVideoElement>(null)
    const playlist = typeof src === 'string' && isPlaylistSrc(src)

    useEffect(() => {
        const video = localRef.current

        if (!video) return

        let resume = false

        const sync = (mutations?: MutationRecord[]) => {
            if (mutations && !mutations.some((mutation) => mutation.target instanceof Node && (mutation.target === video || mutation.target.contains(video)))) return

            if (isConcealed(video)) {
                if (!video.paused) resume = true

                video.pause()

                return
            }

            if (!resume) return

            resume = false
            void video.play().catch(() => undefined)
        }

        const observer = new MutationObserver(sync)

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'hidden', 'class'], subtree: true })
        sync()

        return () => {
            observer.disconnect()
            video.pause()
        }
    }, [])

    useEffect(() => {
        const video = localRef.current

        if (!video || typeof src !== 'string' || !isPlaylistSrc(src)) return

        let player: { destroy: () => void } | undefined
        let cancelled = false

        void import('hls.js').then(({ default: Hls }) => {
            if (cancelled) return

            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = src

                return
            }

            if (!Hls.isSupported()) return

            const next = new Hls()

            player = next
            next.loadSource(src)
            next.attachMedia(video)
        })

        return () => {
            cancelled = true
            player?.destroy()
            stopVideo(video)
        }
    }, [src])

    return (
        <video
            ref={(node) => {
                localRef.current = node

                if (typeof ref === 'function') ref(node)
                else if (ref) ref.current = node
            }}
            src={playlist ? undefined : src}
            playsInline
            preload="metadata"
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            disableRemotePlayback
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            className={cn('pointer-events-none select-none', className)}
            {...props}
        />
    )
}
