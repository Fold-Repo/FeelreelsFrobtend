import { ImageResponse } from 'next/og'
import { BRAND_COLORS, logoDataUri } from '@/lib/brand'

const SIZES: Record<string, { pixels: number; maskable?: boolean }> = {
    '192': { pixels: 192 },
    '512': { pixels: 512 },
    maskable: { pixels: 512, maskable: true },
}

export function generateStaticParams() {
    return Object.keys(SIZES).map((size) => ({ size }))
}

export async function GET(_: Request, { params }: RouteContext<'/icons/[size]'>) {
    const { size } = await params
    const { pixels, maskable } = SIZES[size] ?? SIZES['512']
    const src = maskable ? logoDataUri({ radius: 0, inset: 0.12 }) : logoDataUri({ radius: 0 })

    return new ImageResponse(
        <div style={{ width: '100%', height: '100%', display: 'flex', background: BRAND_COLORS.ink }}>
            <img src={src} width={pixels} height={pixels} alt="" />
        </div>,
        { width: pixels, height: pixels },
    )
}
