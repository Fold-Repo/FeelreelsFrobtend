'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { APP_SHELL } from '@/data'
import { NAV_ICONS, type NavIcon } from './navIcons'
import { SidebarLink } from './SidebarLink'
import { SidebarShelf } from './SidebarShelf'

export function Sidebar({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
    const pathname = usePathname()
    const params = useSearchParams()
    const current = `${pathname}${params.size ? `?${params.toString()}` : ''}`

    const renderLinks = (links: typeof APP_SHELL.main) =>
        links.map((link) => {
            const Icon = NAV_ICONS[link.icon as NavIcon]

            return <SidebarLink key={link.href} {...link} icon={<Icon />} active={current === link.href} collapsed={collapsed} onNavigate={onNavigate} />
        })

    return (
        <nav className="no-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 pb-4" data-lenis-prevent>
            {renderLinks(APP_SHELL.main)}

            <Divider />

            {!collapsed && <Heading>{APP_SHELL.libraryTitle}</Heading>}

            {renderLinks(APP_SHELL.library)}

            <Divider />

            {!collapsed && <SidebarShelf onNavigate={onNavigate} />}
        </nav>
    )
}

function Divider() {
    return <span className="mx-3 my-3 block h-px shrink-0 bg-line" />
}

function Heading({ children }: { children: string }) {
    return <p className="shrink-0 px-3.5 pt-1 pb-2 text-xs font-medium text-muted">{children}</p>
}
