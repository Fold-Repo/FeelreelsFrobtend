import { fetchAllMovies } from '@/lib/api'
import type { Series } from '@/types'
import { HomeView } from '@/views'

export default async function HomePage() {
    let initialSeries: Series[] = []

    try {
        initialSeries = await fetchAllMovies({ revalidate: 300 })
    } catch {
        initialSeries = []
    }

    return <HomeView initialSeries={initialSeries} />
}
