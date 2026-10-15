import type { ReactNode } from 'react'
import { FaFacebookF, FaRedditAlien, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

export const SHARE_ICONS: Record<string, { icon: ReactNode; tone: string }> = {
    whatsapp: { tone: 'bg-[#25D366] text-white', icon: <FaWhatsapp className="size-6" /> },
    x: { tone: 'bg-black text-white', icon: <FaXTwitter className="size-5" /> },
    facebook: { tone: 'bg-[#1877F2] text-white', icon: <FaFacebookF className="size-5" /> },
    telegram: { tone: 'bg-[#229ED9] text-white', icon: <FaTelegramPlane className="size-5" /> },
    reddit: { tone: 'bg-[#FF4500] text-white', icon: <FaRedditAlien className="size-6" /> },
    email: { tone: 'bg-background text-ink', icon: <MdEmail className="size-5" /> },
}
