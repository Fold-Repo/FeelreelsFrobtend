'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bookmark, ChevronLeft, Heart, Layers, MessageCircle, Play, Send } from 'lucide-react'
import { ProtectedVideo } from '@/components'
import { HOME } from '@/data'
import type { Series } from '@/types'
import { PhoneAction } from './PhoneAction'

export function PhoneMockup({ series }: { series: Series }) {
    const phone = HOME.hero.phone

    return (
        <div className="relative rounded-[3rem] bg-night p-2.5 shadow-[0_50px_100px_-30px_rgba(20,20,20,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
            <span className="absolute top-28 -left-[3px] h-12 w-[3px] rounded-l bg-night-soft" />

            <span className="absolute top-24 -right-[3px] h-16 w-[3px] rounded-r bg-night-soft" />

            <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem] bg-black">
                <ProtectedVideo src="/videos/clip-1.mp4" poster={series.poster} autoPlay muted loop className="absolute inset-0 h-full w-full object-cover" />

                <Image src={series.poster} alt="" fill priority sizes="300px" className="-z-10 object-cover" />

                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/80" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-3 text-[0.7rem] font-semibold text-white">
                    {phone.time}

                    <span className="h-6 w-20 rounded-full bg-black" />

                    <span className="flex items-center gap-1">
                        <span className="h-2.5 w-4 rounded-[3px] border border-white/80 p-px">
                            <span className="block h-full w-3/4 rounded-[1px] bg-white" />
                        </span>
                    </span>
                </div>

                <div className="absolute inset-x-0 top-11 flex items-center justify-between px-4 text-white">
                    <ChevronLeft className="size-5" />

                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-semibold backdrop-blur-md">
                        {phone.episode} <span className="opacity-60">{phone.total}</span>
                    </span>
                </div>

                <div className="absolute right-3 bottom-28 flex flex-col items-center gap-4 text-white">
                    <PhoneAction icon={<Heart className="size-5 fill-accent text-accent" />} label={phone.likes} pulse />

                    <PhoneAction icon={<MessageCircle className="size-5" />} label={phone.comments} />

                    <PhoneAction icon={<Bookmark className="size-5" />} label={phone.save} />

                    <PhoneAction icon={<Send className="size-5" />} label={phone.share} />
                </div>

                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-white">
                    <p className="text-sm font-semibold">{series.title}</p>

                    <p className="mt-1 line-clamp-2 pr-10 text-[0.65rem] leading-relaxed text-white/75">{phone.synopsis}</p>

                    <div className="mt-2 flex gap-1.5">
                        {phone.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-white/15 px-2 py-0.5 text-[0.6rem] backdrop-blur-md">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/25">
                        <motion.div
                            className="h-full bg-accent"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
                        />
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/12 px-3 py-2 text-[0.7rem] backdrop-blur-md">
                        <span className="flex items-center gap-2">
                            <Layers className="size-3.5" />

                            {phone.episodes}
                        </span>

                        <span className="flex items-center gap-1 font-semibold">
                            {phone.next}

                            <Play className="size-3 fill-current" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
