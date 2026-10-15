import { Bookmark, Coins, Flame, History, Home, Sparkles, Star } from 'lucide-react'

export const NAV_ICONS = {
    home: Home,
    flame: Flame,
    sparkles: Sparkles,
    star: Star,
    history: History,
    bookmark: Bookmark,
    coins: Coins,
}

export type NavIcon = keyof typeof NAV_ICONS
