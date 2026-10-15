import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ALL_SERIES, getSeries } from '@/lib'
import { SeriesView } from '@/views'

export function generateStaticParams() {
    return ALL_SERIES.map((series) => ({ slug: series.slug }))
}

export async function generateMetadata({ params }: PageProps<'/series/[slug]'>): Promise<Metadata> {
    const series = getSeries((await params).slug)

    if (!series) return {}

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
    const series = getSeries((await params).slug)

    if (!series) notFound()

    return <SeriesView series={series} />
}
