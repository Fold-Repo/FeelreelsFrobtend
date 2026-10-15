export const BRAND_COLORS = {
    ink: '#141414',
    coral: '#ff5a3c',
    peach: '#ff9a7f',
    gold: '#f3b53f',
    paper: '#f6f5f1',
}

export function logoSvg({ tile = BRAND_COLORS.ink, play = '#ffffff', radius = 18, inset = 0 } = {}) {
    const scale = 1 - inset * 2
    const offset = 64 * inset
    const { coral, peach, gold } = BRAND_COLORS

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="${tile}"/><g transform="translate(${offset} ${offset}) scale(${scale})"><rect x="13" y="16" width="20" height="32" rx="6" fill="${gold}" transform="rotate(-14 23 32)"/><rect x="21" y="14" width="20" height="34" rx="6" fill="${peach}" transform="rotate(-4 31 31)"/><rect x="29" y="13" width="22" height="38" rx="6" fill="${coral}"/><path d="M36 25v14l11-7z" fill="${play}"/></g></svg>`
}

export const logoDataUri = (options?: Parameters<typeof logoSvg>[0]) => `data:image/svg+xml;base64,${Buffer.from(logoSvg(options)).toString('base64')}`
