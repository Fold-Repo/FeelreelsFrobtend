import { Suspense } from 'react'
import { buildOrganizationSchema, buildWebSiteSchema, getOrigin } from '@/lib/seo'
import { JsonLd } from './JsonLd'

async function Schemas() {
    const origin = await getOrigin()

    return (
        <>
            <JsonLd data={buildOrganizationSchema(origin)} />

            <JsonLd data={buildWebSiteSchema(origin)} />
        </>
    )
}

export function StructuredData() {
    return (
        <Suspense>
            <Schemas />
        </Suspense>
    )
}
