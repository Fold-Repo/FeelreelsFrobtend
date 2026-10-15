import { ImageResponse } from 'next/og'
import { SITE } from '@/constants'
import { HOME } from '@/data'
import { BRAND_COLORS, logoDataUri } from '@/lib/brand'
import { ogFonts } from '@/lib/og-fonts'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

export const alt = SITE.description

export default async function OpengraphImage() {
    const { ink, coral, paper } = BRAND_COLORS

    return new ImageResponse(
        <div style={{ width: '100%', height: '100%', display: 'flex', background: paper, padding: 24, fontFamily: 'Jakarta' }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 56,
                    background: '#fff',
                    borderRadius: 40,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img src={logoDataUri()} width={64} height={64} alt="" />

                    <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: -2, color: ink }}>
                        feel<span style={{ fontWeight: 400, opacity: 0.55 }}>reels</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, color: ink }}>
                    <span>{HOME.hero.title}</span>

                    <span style={{ color: '#a8a39b' }}>{HOME.hero.accent}</span>
                </div>
            </div>

            <div
                style={{
                    width: 420,
                    marginLeft: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: coral,
                    borderRadius: 40,
                    overflow: 'hidden',
                }}>
                <img src={logoDataUri({ tile: coral })} width={520} height={520} alt="" style={{ transform: 'rotate(-8deg)' }} />
            </div>
        </div>,
        { ...size, fonts: await ogFonts() },
    )
}
