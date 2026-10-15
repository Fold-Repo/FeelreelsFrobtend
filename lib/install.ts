export type InstallGuide = 'ios-safari' | 'ios-other' | 'android' | 'desktop' | 'mac-safari'

export const INSTALL_CAPTURE_SCRIPT =
    "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__installEvent=e;window.dispatchEvent(new Event('installready'));});"

export function detectInstallGuide(): InstallGuide | null {
    const ua = navigator.userAgent
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    if (ios) return /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua) ? 'ios-other' : 'ios-safari'
    if (/Android/i.test(ua)) return 'android'
    if (/Firefox\//.test(ua)) return null
    if (/Edg\/|Chrome\//.test(ua)) return 'desktop'

    const safari = /Macintosh/.test(ua) && /Version\/(\d+)/.exec(ua)

    return safari && Number(safari[1]) >= 17 ? 'mac-safari' : null
}

const listeners = new Set<() => void>()

let downloadOpen = false

export const downloadStore = {
    subscribe(listener: () => void) {
        listeners.add(listener)

        return () => listeners.delete(listener)
    },
    get: () => downloadOpen,
    set(open: boolean) {
        downloadOpen = open
        listeners.forEach((listener) => listener())
    },
}
