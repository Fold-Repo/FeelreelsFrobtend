export type CommentData = {
    id: string
    name: string
    handle: string
    time: string
    text: string
    likes: number
    pinned?: boolean
    heart?: boolean
    own?: boolean
    replies: CommentData[]
}

const TONES = [
    'bg-[#ffd9cf] text-[#9a2b15]',
    'bg-[#dbe8f8] text-[#1d4a87]',
    'bg-[#d9f2dc] text-[#1f6a37]',
    'bg-[#fbefc4] text-[#7a5a00]',
    'bg-[#ece2fb] text-[#5b2fa0]',
]

export const avatarTone = (name: string) => TONES[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % TONES.length]
