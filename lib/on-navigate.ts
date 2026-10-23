type Listener = () => void

const listeners = new Set<Listener>()

let patched = false

function ensurePatched() {
    if (patched || typeof window === 'undefined') return

    patched = true

    const { pushState, replaceState } = history

    const notify = () => listeners.forEach((listener) => listener())

    history.pushState = function (...args) {
        pushState.apply(this, args)
        notify()
    }

    history.replaceState = function (...args) {
        replaceState.apply(this, args)
        notify()
    }

    window.addEventListener('popstate', notify)
}

export function onNavigate(listener: Listener) {
    ensurePatched()
    listeners.add(listener)

    return () => {
        listeners.delete(listener)
    }
}
