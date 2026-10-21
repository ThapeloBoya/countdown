import { useCallback, useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { LOVE_MESSAGES } from '../data/messages'

export default function HeartSurprise() {
  const [message, setMessage] = useState(null)
  const [count, setCount] = useState(0)
  const lastMessageRef = useRef(null)

  const reveal = useCallback(() => {
    let choice = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)]

    if (LOVE_MESSAGES.length > 1) {
      let guard = 0
      while (choice === lastMessageRef.current && guard < 8) {
        choice = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)]
        guard += 1
      }
    }

    lastMessageRef.current = choice
    setMessage(choice)
    setCount((previous) => previous + 1)
  }, [])

  return (
    <div className="surprise">
      <p className="surprise__hint">
        <span className="surprise__hint-line" aria-hidden="true" />
        <span>tap the heart</span>
        <span className="surprise__hint-line" aria-hidden="true" />
      </p>

      <button
        type="button"
        className="surprise__heart"
        onClick={reveal}
        aria-label="Tap for a secret love message"
      >
        <span className="surprise__halo" aria-hidden="true" />
        <Heart className="surprise__icon" size={30} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <div className="surprise__bubble" aria-live="polite">
        {message && (
          <p className="surprise__message" key={count}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
