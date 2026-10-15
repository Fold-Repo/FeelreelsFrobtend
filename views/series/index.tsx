import type { Series } from '@/types'
import { Watch } from './sections'

export default function SeriesView({ series }: { series: Series }) {
    return <Watch series={series} />
}
