'use client'

import type { ReactNode } from 'react'
import { Toast } from '@heroui/react'
import { MotionConfig } from 'framer-motion'
import { AppDownloadModal, InstallPrompt, ServiceWorker } from '@/components/pwa'
import { ShareModal } from '@/components/reusable/ShareModal'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { ReactQueryProvider } from './ReactQueryProvider'
import { ViewerProvider } from './ViewerProvider'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <MotionConfig reducedMotion="user">
                <ViewerProvider />

                <ServiceWorker />

                <SmoothScroll>{children}</SmoothScroll>

                <InstallPrompt />

                <AppDownloadModal />

                <ShareModal />

                <Toast.Provider placement="bottom end" />
            </MotionConfig>
        </ReactQueryProvider>
    )
}
