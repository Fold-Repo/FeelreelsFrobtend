'use client'

import type { ReactNode } from 'react'
import { Modal, useOverlayState } from '@heroui/react'
import { cn } from '@/lib'

export type PopupModalProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    children: ReactNode
    title?: ReactNode
    description?: ReactNode
    icon?: ReactNode
    footer?: ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full'
    placement?: 'auto' | 'top' | 'center' | 'bottom'
    backdrop?: 'opaque' | 'blur' | 'transparent'
    showCloseButton?: boolean
    isDismissable?: boolean
    className?: string
    headerClassName?: string
    bodyClassName?: string
    footerClassName?: string
}

export function PopupModal({
    isOpen,
    onOpenChange,
    children,
    title,
    description,
    icon,
    footer,
    size = 'md',
    placement = 'center',
    backdrop = 'opaque',
    showCloseButton = true,
    isDismissable = true,
    className,
    headerClassName,
    bodyClassName,
    footerClassName,
}: PopupModalProps) {
    const state = useOverlayState({ isOpen, onOpenChange })

    return (
        <Modal state={state}>
            <Modal.Backdrop variant={backdrop} isDismissable={isDismissable}>
                <Modal.Container placement={placement} size={size} scroll="inside">
                    <Modal.Dialog
                        className={cn('flex max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-surface p-0 text-ink shadow-lg outline-none', className)}>
                        {title && (
                            <Modal.Header className={cn('relative flex flex-row items-center gap-3 border-b border-line px-5 py-3', headerClassName)}>
                                {icon && <span className="shrink-0">{icon}</span>}

                                <div className="min-w-0 flex-1 pr-10">
                                    <Modal.Heading className="text-base font-medium text-ink">{title}</Modal.Heading>

                                    {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
                                </div>

                                {showCloseButton && <Modal.CloseTrigger className="absolute top-1/2 right-4 -translate-y-1/2" />}
                            </Modal.Header>
                        )}

                        <Modal.Body className={cn('flex-1 overflow-y-auto px-5 py-4', bodyClassName)}>{children}</Modal.Body>

                        {footer && (
                            <Modal.Footer className={cn('flex flex-row items-center justify-end gap-2 border-t border-line px-5 py-3', footerClassName)}>
                                {footer}
                            </Modal.Footer>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
