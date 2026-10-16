import type { CATALOG } from '@/data'

export type Category = (typeof CATALOG)['categories'][number]

export type Series = (typeof CATALOG)['series'][number]

export type Episode = {
    number: number
    title: string
    src: string
    thumbnail: string
    isFree: boolean
}
