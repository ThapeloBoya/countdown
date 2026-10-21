import { useEffect, useMemo, useState } from 'react'

/**
 * The reunion begins at the first millisecond of 29 November 2026,
 * in whatever timezone the visitor is standing in right now.
 */
export const REUNION_DATE = new Date(2026, 10, 29, 0, 0, 0, 0)

export const REUNION_LABEL = '29 November 2026'

const SECOND = 1000
const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * Pure helper: time left until `target`, never negative.
 * @returns {{total:number, days:number, hours:number, minutes:number, seconds:number, isReunion:boolean}}
 */
export function getTimeRemaining(target = REUNION_DATE, now = new Date()) {
  const diff = target.getTime() - now.getTime()

  if (!Number.isFinite(diff) || diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isReunion: true }
  }

  const totalSeconds = Math.floor(diff / SECOND)

  return {
    total: totalSeconds,
    days: Math.floor(totalSeconds / DAY),
    hours: Math.floor((totalSeconds % DAY) / HOUR),
    minutes: Math.floor((totalSeconds % HOUR) / MINUTE),
    seconds: totalSeconds % MINUTE,
    isReunion: false,
  }
}

/**
 * Live countdown that ticks in sync with the visitor's wall clock.
 * Re-aligns to the second boundary so digits never drift or skip.
 */
export function useCountdown(target = REUNION_DATE) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timerId = null

    const schedule = () => {
      const delay = SECOND - (Date.now() % SECOND) + 12
      timerId = window.setTimeout(() => {
        setNow(new Date())
        schedule()
      }, delay)
    }

    schedule()

    return () => {
      if (timerId !== null) window.clearTimeout(timerId)
    }
  }, [])

  return useMemo(() => getTimeRemaining(target, now), [target, now])
}
