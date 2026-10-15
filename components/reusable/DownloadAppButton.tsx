'use client'

import { Download } from 'lucide-react'
import { NAV_ACTIONS } from '@/constants'
import { useAppDownload } from '@/hooks'
import { Button, type ButtonProps } from '../ui'

export function DownloadAppButton({ label = NAV_ACTIONS.getApp, ...props }: Omit<ButtonProps, 'onPress' | 'children'> & { label?: string }) {
    const { show } = useAppDownload()

    return (
        <Button startContent={<Download className="size-4" />} onPress={show} {...props}>
            {label}
        </Button>
    )
}
