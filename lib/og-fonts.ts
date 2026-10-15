import { readFile } from 'node:fs/promises'
import path from 'node:path'

const load = (file: string) => readFile(path.join(process.cwd(), 'assets/fonts', file))

export async function ogFonts() {
    const [regular, bold] = await Promise.all([load('jakarta-400.woff'), load('jakarta-700.woff')])

    return [
        { name: 'Jakarta', data: regular, weight: 400 as const, style: 'normal' as const },
        { name: 'Jakarta', data: bold, weight: 700 as const, style: 'normal' as const },
    ]
}
