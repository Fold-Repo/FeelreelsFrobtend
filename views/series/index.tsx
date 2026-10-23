import type { Episode, Series } from '@/types'
import { Watch } from './sections'

export default function SeriesView({ series, episodes }: { series: Series; episodes: Episode[] }) {
    return <Watch series={series} episodes={episodes} />
}
