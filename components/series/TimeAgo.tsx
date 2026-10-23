'use client'

import { useEffect, useState } from 'react'
import { LABELS } from '@/constants'
import { timeAgo, todayStamp } from '@/lib'

export function TimeAgo({ date }: { date: string }) {
    const [label, setLabel] = useState<string>()

    useEffect(() => {
        setLabel(timeAgo(date, LABELS.timeAgo, todayStamp()))
    }, [date])

    return label ?? null
}
