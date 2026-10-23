'use client'

import { type ComponentProps, useEffect, useRef } from 'react'
import { cn } from '@/lib'
import { isPlaylistSrc } from '@/lib/media-src'

export function ProtectedVideo({ className, src, ref, ...props }: ComponentProps<'video'>) {
    const localRef = useRef<HTMLVideoElement>(null)
    const playlist = typeof src === 'string' && isPlaylistSrc(src)

    useEffect(() => {
        const video = localRef.current

        if (!video || typeof src !== 'string' || !isPlaylistSrc(src)) return

        const handle: { current?: { destroy: () => void } } = {}
        let cancelled = false

        void import('hls.js').then(({ default: Hls }) => {
            if (cancelled || !localRef.current) return

            if (localRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                localRef.current.src = src

                return
            }

            if (!Hls.isSupported()) return

            const player = new Hls()

            handle.current = player
            player.loadSource(src)
            player.attachMedia(localRef.current)
        })

        return () => {
            cancelled = true
            handle.current?.destroy()
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
