import { ImageResponse } from 'next/og'
import { logoDataUri } from '@/lib/brand'

export const size = { width: 180, height: 180 }

export const contentType = 'image/png'

export default function AppleIcon() {
    return new ImageResponse(<img src={logoDataUri({ radius: 0, inset: 0.06 })} width={180} height={180} alt="" />, size)
}
