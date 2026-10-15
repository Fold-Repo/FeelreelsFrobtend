'use client'

import { type SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'

const IDLE_MS = 2600

type Timing = { src: string; current: number; duration: number; buffered: number }

export function useVideoPlayer(src: string) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const stageRef = useRef<HTMLDivElement | null>(null)
    const [playing, setPlaying] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [muted, setMuted] = useState(false)
    const [volume, setVolumeState] = useState(1)
    const [rate, setRateState] = useState(1)
    const [timing, setTiming] = useState<Timing>({ src, current: 0, duration: 0, buffered: 0 })
    const [fullscreen, setFullscreen] = useState(false)
    const [idle, setIdle] = useState(false)
    const [activity, setActivity] = useState(0)
    const [autoMuted, setAutoMuted] = useState(false)

    const fresh = timing.src === src
    const current = fresh ? timing.current : 0
    const duration = fresh ? timing.duration : 0
    const buffered = fresh ? timing.buffered : 0

    useEffect(() => {
        const onChange = () => setFullscreen(Boolean(document.fullscreenElement))

        document.addEventListener('fullscreenchange', onChange)

        return () => document.removeEventListener('fullscreenchange', onChange)
    }, [])

    useEffect(() => {
        if (!playing) return

        const timer = setTimeout(() => setIdle(true), IDLE_MS)

        return () => clearTimeout(timer)
    }, [activity, playing])

    const poke = useCallback(() => {
        setIdle(false)
        setActivity((value) => value + 1)
    }, [])

    const toggle = useCallback(() => {
        const video = videoRef.current

        if (!video) return

        if (video.paused) void video.play().catch(() => setPlaying(false))
        else video.pause()
    }, [])

    const seekTo = useCallback((ratio: number) => {
        const video = videoRef.current

        if (video?.duration) video.currentTime = Math.min(Math.max(ratio, 0), 1) * video.duration
    }, [])

    const seekBy = useCallback((seconds: number) => {
        const video = videoRef.current

        if (video?.duration) video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration)
    }, [])

    const setVolume = useCallback((value: number) => {
        const video = videoRef.current

        if (!video) return

        video.volume = Math.min(Math.max(value, 0), 1)
        video.muted = video.volume === 0
    }, [])

    const toggleMute = useCallback(() => {
        const video = videoRef.current

        if (video) video.muted = !video.muted
    }, [])

    const setRate = useCallback((value: number) => {
        if (videoRef.current) videoRef.current.playbackRate = value
    }, [])

    const toggleFullscreen = useCallback(() => {
        if (document.fullscreenElement) void document.exitFullscreen()
        else void stageRef.current?.requestFullscreen?.()
    }, [])

    const sync = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget
        const end = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0

        setTiming({ src, current: video.currentTime, duration: video.duration || 0, buffered: end })
    }

    const startPlayback = (event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget

        if (!video.paused) return

        void video.play().catch(() => {
            video.muted = true
            setAutoMuted(true)
            void video.play().catch(() => setPlaying(false))
        })
    }

    const videoProps = {
        ref: videoRef,
        onLoadedData: startPlayback,
        onPlay: () => setPlaying(true),
        onPause: () => {
            setPlaying(false)
            setIdle(false)
        },
        onWaiting: () => setWaiting(true),
        onPlaying: () => setWaiting(false),
        onCanPlay: () => setWaiting(false),
        onTimeUpdate: sync,
        onProgress: sync,
        onLoadedMetadata: sync,
        onVolumeChange: (event: SyntheticEvent<HTMLVideoElement>) => {
            setMuted(event.currentTarget.muted)

            if (!event.currentTarget.muted) setAutoMuted(false)
            setVolumeState(event.currentTarget.volume)
        },
        onRateChange: (event: SyntheticEvent<HTMLVideoElement>) => setRateState(event.currentTarget.playbackRate),
    }

    return {
        stageRef,
        videoProps,
        state: { playing, waiting, muted, autoMuted, volume, rate, current, duration, buffered, fullscreen, idle },
        actions: { toggle, seekTo, seekBy, setVolume, toggleMute, setRate, toggleFullscreen, poke },
    }
}

export type PlayerState = ReturnType<typeof useVideoPlayer>['state']

export type PlayerActions = ReturnType<typeof useVideoPlayer>['actions']
