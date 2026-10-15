'use client'

import { type ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5,
                        gcTime: 1000 * 60 * 30,
                        refetchOnWindowFocus: false,
                        retry: 2,
                    },
                },
            }),
    )

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
