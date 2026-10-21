import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

const PALETTE = [
  '#ff6b81',
  '#ff8fa3',
  '#e91e63',
  '#ffd6dd',
  '#f7b7c6',
  '#e6b98a',
  '#d3124a',
  '#ffc2d1',
]

const STAR_PATH =
  'M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0z'

const rand = (min, max) => min + Math.random() * (max - min)
const pick = (list) => list[Math.floor(Math.random() * list.length)]

function makeHeart(intense = false) {
  const glow = Math.random() > 0.55
  return {
    id: `fh-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    kind: 'heart',
    left: rand(-4, 100),
    size: rand(13, intense ? 52 : 36),
    color: pick(PALETTE),
    opacity: rand(0.18, glow ? 0.82 : 0.5),
    duration: rand(intense ? 6.5 : 13, intense ? 12 : 26),
    drift: rand(-150, 150),
    sway: rand(2.6, 6.4),
    rotation: rand(-42, 42),
    glow,
    twinkle: rand(2.4, 5.5),
  }
}

function makeSpark() {
  return {
    id: `sp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    kind: 'spark',
    left: rand(-2, 102),
    size: rand(3, 8),
    color: pick(['#ffe6c9', '#ffd6dd', '#fff3d6', '#e6b98a']),
    opacity: rand(0.4, 0.95),
    duration: rand(7, 15),
    drift: rand(-60, 60),
    sway: rand(2, 5),
    rotation: rand(0, 360),
    glow: true,
    twinkle: rand(1.4, 3),
  }
}

function makeStar() {
  return {
    id: `st-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    kind: 'star',
    left: rand(0, 100),
    size: rand(5, 13),
    color: pick(['#ffe6c9', '#f7b7c6', '#fff3d6']),
    opacity: rand(0.35, 0.85),
    duration: rand(9, 18),
    drift: rand(-50, 50),
    sway: rand(2, 4.5),
    rotation: rand(-90, 90),
    glow: true,
    twinkle: rand(1.6, 3.2),
  }
}

/**
 * Continuous shower of hearts, sparks and stars drifting up the screen.
 * Purely decorative: it never intercepts clicks, scrolls or reading.
 */
export default function FloatingHearts({ burstKey = 0, density = 1 }) {
  const reduced = useReducedMotion()
  const [items, setItems] = useState([])
  const timersRef = useRef(new Set())
  const burstSeenRef = useRef(burstKey)

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      timersRef.current.clear()
    },
    [],
  )

  const spawn = useCallback((count, intense = false) => {
    const created = Array.from({ length: count }, () => {
      const roll = Math.random()
      if (roll > 0.92) return makeStar()
      if (roll > 0.8) return makeSpark()
      return makeHeart(intense)
    })

    setItems((current) => {
      const merged = [...current, ...created]
      return merged.length > 44 ? merged.slice(merged.length - 44) : merged
    })

    created.forEach((item) => {
      const timer = window.setTimeout(() => {
        timersRef.current.delete(timer)
        setItems((current) => current.filter((entry) => entry.id !== item.id))
      }, item.duration * 1000 + 80)
      timersRef.current.add(timer)
    })
  }, [])

  // Steady, irregular stream of hearts.
  useEffect(() => {
    if (reduced) return undefined

    let timerId = null
    const schedule = () => {
      timerId = window.setTimeout(() => {
        spawn(1)
        schedule()
      }, rand(750, 1800) / density)
    }
    schedule()

    return () => {
      if (timerId) window.clearTimeout(timerId)
    }
  }, [reduced, spawn, density])

  // Celebration burst the moment the countdown reaches zero.
  useEffect(() => {
    if (reduced || burstKey === burstSeenRef.current) return
    burstSeenRef.current = burstKey
    spawn(18, true)
  }, [burstKey, reduced, spawn])

  // Reduced motion: a calm, static field of glowing motes instead of movement.
  if (reduced) {
    return (
      <div className="floating-hearts floating-hearts--static" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={`static-${index}`}
            className="fh-item fh-item--static"
            style={{
              left: `${(index * 8.4 + 3) % 100}%`,
              bottom: `${6 + ((index * 17) % 62)}%`,
              '--fh-size': `${10 + ((index * 7) % 26)}px`,
              '--fh-opacity': 0.16 + ((index * 5) % 30) / 100,
              '--fh-color': PALETTE[index % PALETTE.length],
            }}
          >
            <svg viewBox="0 0 24 24" className="fh-svg">
              <path d={HEART_PATH} fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="floating-hearts" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className={`fh-item fh-item--${item.kind}${item.glow ? ' fh-item--glow' : ''}`}
          style={{
            left: `${item.left}%`,
            '--fh-size': `${item.size}px`,
            '--fh-opacity': item.opacity,
            '--fh-color': item.color,
            '--fh-duration': `${item.duration}s`,
            '--fh-drift': `${item.drift}px`,
            '--fh-sway': `${item.sway}s`,
            '--fh-rotation': `${item.rotation}deg`,
            '--fh-twinkle': `${item.twinkle}s`,
          }}
        >
          <span className="fh-drift">
            <span className="fh-sway">
              {item.kind === 'heart' && (
                <svg viewBox="0 0 24 24" className="fh-svg">
                  <path d={HEART_PATH} fill="currentColor" />
                </svg>
              )}
              {item.kind === 'spark' && <span className="fh-dot" />}
              {item.kind === 'star' && (
                <svg viewBox="0 0 24 24" className="fh-svg">
                  <path d={STAR_PATH} fill="currentColor" />
                </svg>
              )}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
