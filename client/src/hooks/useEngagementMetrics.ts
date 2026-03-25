import { type RefObject, useEffect, useRef } from 'react'
import type { MetricsPayload } from '../types/metrics'
import { sendMetrics } from '../services/metricsApi'

const createTimer = (onAccumulate: (delta: number) => void) => {
  let startTime: number | null = null

  return {
    start() {
      if (startTime !== null) return
      startTime = Date.now()
    },
    stop() {
      if (startTime === null) return
      const delta = Math.max(0, Date.now() - startTime) / 1000
      onAccumulate(delta)
      startTime = null
    },
    pending(): number {
      return startTime !== null ? Math.max(0, Date.now() - startTime) / 1000 : 0
    },
  }
}

export const useEngagementMetrics = (
  videoRef: RefObject<HTMLVideoElement>
): void => {
  const pauseCount = useRef(0)
  const visibleSeconds = useRef(0)
  const uniqueSeconds = useRef(new Set<number>())
  const playedWhileVisibleSeconds = useRef(0)

  const isVisible = useRef(false)
  const isPageVisible = useRef(!document.hidden)
  const lastTrackedSecond = useRef(-1)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const visibilityTimer = createTimer((delta) => {
      visibleSeconds.current += delta
    })

    const playTimer = createTimer((delta) => {
      playedWhileVisibleSeconds.current += delta
    })

    const getSnapshot = (): MetricsPayload => ({
      pauseCount: pauseCount.current,
      visibleSeconds: parseFloat(
        (visibleSeconds.current + visibilityTimer.pending()).toFixed(2)
      ),
      uniqueSecondsPlayed: uniqueSeconds.current.size,
      playedWhileVisibleSeconds: parseFloat(
        (playedWhileVisibleSeconds.current + playTimer.pending()).toFixed(2)
      ),
      sentAt: new Date().toISOString(),
    })


    const handlePause = () => {
      if (video.ended || video.seeking) return
      pauseCount.current++
      playTimer.stop()
    }

    const handlePlay = () => {
      if (isVisible.current && isPageVisible.current) {
        playTimer.start()
      }
    }

    const handleEnded = () => {
      playTimer.stop()
    }

    const handleSeeking = () => {
      playTimer.stop()
    }

    const handleSeeked = () => {
      if (isVisible.current && isPageVisible.current && !video.paused && !video.ended) {
        playTimer.start()
      }
    }

    const handleTimeUpdate = () => {
      if (video.paused || video.ended) return
      const currentSecond = Math.floor(video.currentTime)
      if (currentSecond === lastTrackedSecond.current) return
      lastTrackedSecond.current = currentSecond

      const limit = isFinite(video.duration) ? Math.ceil(video.duration) : 3600
      if (uniqueSeconds.current.size < limit) {
        uniqueSeconds.current.add(currentSecond)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting

        if (entry.isIntersecting && isPageVisible.current) {
          visibilityTimer.start()
          if (!video.paused && !video.ended) playTimer.start()
        } else {
          visibilityTimer.stop()
          playTimer.stop()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(video)

    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden

      if (document.hidden) {
        visibilityTimer.stop()
        playTimer.stop()
      } else if (isVisible.current) {
        visibilityTimer.start()
        if (!video.paused && !video.ended) playTimer.start()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    video.addEventListener('pause', handlePause)
    video.addEventListener('play', handlePlay)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('seeking', handleSeeking)
    video.addEventListener('seeked', handleSeeked)
    video.addEventListener('timeupdate', handleTimeUpdate)

    const timer = setTimeout(() => {
      sendMetrics(getSnapshot())
    }, 30_000)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('seeking', handleSeeking)
      video.removeEventListener('seeked', handleSeeked)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])
}