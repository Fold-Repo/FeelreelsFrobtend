import { PageTransition } from '@/components'

export default function Template({ children }: LayoutProps<'/'>) {
    return <PageTransition>{children}</PageTransition>
}
