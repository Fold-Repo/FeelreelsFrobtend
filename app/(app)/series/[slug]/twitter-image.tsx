import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { ALL_SERIES, getCategoryLabel, getSeries } from '@/lib'
import { BRAND_COLORS, logoDataUri } from '@/lib/brand'
import { ogFonts } from '@/lib/og-fonts'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

export const alt = 'FeelReels series'

export function generateStaticParams() {
    return ALL_SERIES.map((series) => ({ slug: series.slug }))
}

const toDataUri = async (file: string) => `data:image/jpeg;base64,${(await readFile(path.join(process.cwd(), 'public', file))).toString('base64')}`

export default async function SeriesTwitterImage({ params }: { params: Promise<{ slug: string }> }) {
    const series = getSeries((await params).slug) ?? ALL_SERIES[0]
    const [poster, backdrop] = await Promise.all([toDataUri(series.poster), toDataUri(series.thumbnail)])
    const { ink, coral, gold } = BRAND_COLORS

    return new ImageResponse(
        <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: ink, fontFamily: 'Jakarta' }}>
            <img src={backdrop} width={1200} height={630} alt="" style={{ position: 'absolute', inset: 0, objectFit: 'cover', opacity: 0.35 }} />

            <div
                style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(90deg, rgba(14,14,16,0.96) 40%, rgba(14,14,16,0.4))' }}
            />

            <div style={{ position: 'relative', display: 'flex', flex: 1, padding: 64, gap: 56, alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <img src={logoDataUri({ tile: '#ffffff', play: '#ffffff' })} width={52} height={52} alt="" />

                        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -1.5 }}>
                            feel<span style={{ fontWeight: 400, opacity: 0.55 }}>reels</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginTop: 64, gap: 12 }}>
                        <span style={{ background: coral, borderRadius: 999, padding: '8px 18px', fontSize: 22 }}>{getCategoryLabel(series.category)}</span>

                        {series.isVip && <span style={{ background: gold, color: ink, borderRadius: 999, padding: '8px 18px', fontSize: 22 }}>VIP</span>}
                    </div>

                    <div style={{ display: 'flex', marginTop: 24, fontSize: 72, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>{series.title}</div>

                    <div style={{ display: 'flex', marginTop: 22, fontSize: 26, opacity: 0.7 }}>
                        {series.episodes} episodes · {series.freeEpisodes} free · rated {series.rating}
                    </div>
                </div>

                <img
                    src={poster}
                    width={300}
                    height={450}
                    alt=""
                    style={{ borderRadius: 32, objectFit: 'cover', transform: 'rotate(3deg)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                />
            </div>
        </div>,
        { ...size, fonts: await ogFonts() },
    )
}
