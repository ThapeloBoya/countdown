import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the visitor's motion preference so animations can be softened.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    const media = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)

    setReduced(media.matches)
    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}
