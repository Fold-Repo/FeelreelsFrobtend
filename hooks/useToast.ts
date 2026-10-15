'use client'

import { useCallback } from 'react'
import { toast } from '@heroui/react'

type ToastVariant = 'success' | 'danger' | 'warning' | 'primary'

export const useToast = () => {
    const showToast = useCallback((message: string, color: ToastVariant = 'primary', description?: string) => {
        const options = { description, timeout: 6000 }

        switch (color) {
            case 'success':
                toast.success(message, options)
                break
            case 'danger':
                toast.danger(message, options)
                break
            case 'warning':
                toast.warning(message, options)
                break
            default:
                toast.info(message, options)
        }
    }, [])

    const showSuccess = useCallback(
        (message: string, description?: string) => {
            showToast(message, 'success', description)
        },
        [showToast],
    )

    const showError = useCallback(
        (message: string, description?: string) => {
            showToast(message, 'danger', description)
        },
        [showToast],
    )

    const showWarning = useCallback(
        (message: string, description?: string) => {
            showToast(message, 'warning', description)
        },
        [showToast],
    )

    const showInfo = useCallback(
        (message: string, description?: string) => {
            showToast(message, 'primary', description)
        },
        [showToast],
    )

    return {
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    }
}
