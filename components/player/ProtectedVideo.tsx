'use client'

import type { ComponentProps } from 'react'
import { cn } from '@/lib'

export function ProtectedVideo({ className, ...props }: ComponentProps<'video'>) {
    return (
        <video
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
