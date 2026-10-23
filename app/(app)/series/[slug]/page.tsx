import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { fetchMovie } from '@/lib/api'
import { SeriesView } from '@/views'

export async function generateMetadata({ params }: PageProps<'/series/[slug]'>): Promise<Metadata> {
    const loaded = await fetchMovie((await params).slug)

    if (!loaded) return {}

    const { series } = loaded

    return {
        title: series.title,
        description: series.synopsis,
        alternates: { canonical: `/series/${series.slug}` },
        openGraph: { title: series.title, description: series.synopsis },
        twitter: { card: 'summary_large_image', title: series.title, description: series.synopsis },
    }
}

export default function SeriesPage({ params }: PageProps<'/series/[slug]'>) {
    return (
        <Suspense>
            <SeriesContent params={params} />
        </Suspense>
    )
}

async function SeriesContent({ params }: Pick<PageProps<'/series/[slug]'>, 'params'>) {
    const loaded = await fetchMovie((await params).slug)

    if (!loaded) notFound()

    return <SeriesView series={loaded.series} episodes={loaded.episodes} />
}
