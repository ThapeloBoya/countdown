import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { LETTER_BODY } from '../data/messages'

const LETTER_HEARTS = [
  { left: '8%', size: 16, delay: '0s', duration: '7s', drift: '-18px', color: '#ff6b81' },
  { left: '24%', size: 11, delay: '1.4s', duration: '9s', drift: '22px', color: '#ffd6dd' },
  { left: '42%', size: 20, delay: '0.7s', duration: '8s', drift: '-26px', color: '#e8365f' },
  { left: '63%', size: 13, delay: '2.1s', duration: '10s', drift: '16px', color: '#ff9db1' },
  { left: '80%', size: 18, delay: '1.1s', duration: '8.5s', drift: '-20px', color: '#e6b98a' },
  { left: '92%', size: 10, delay: '2.8s', duration: '9.5s', drift: '12px', color: '#ffb3c6' },
]

export default function LoveLetter() {
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const restoreFocusRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    restoreFocusRef.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 60)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus()
    }
  }, [open])

  return (
    <>
      <button type="button" className="love-button" onClick={() => setOpen(true)}>
        <span className="love-button__shine" aria-hidden="true" />
        <span className="love-button__label">Open my heart</span>
        <span className="love-button__heart" aria-hidden="true">
          &#9829;
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="letter-overlay"
            onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
          >
            <div className="letter" role="dialog" aria-modal="true" aria-labelledby="letter-title">
              <div className="letter__hearts" aria-hidden="true">
                {LETTER_HEARTS.map((heart, index) => (
                  <span
                    key={`letter-heart-${index}`}
                    className="letter__heart"
                    style={{
                      left: heart.left,
                      '--lh-size': `${heart.size}px`,
                      '--lh-delay': heart.delay,
                      '--lh-duration': heart.duration,
                      '--lh-drift': heart.drift,
                      '--lh-color': heart.color,
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                className="letter__close"
                onClick={() => setOpen(false)}
                ref={closeButtonRef}
                aria-label="Close the letter"
              >
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </button>

              <div className="letter__seal" aria-hidden="true">
                <span className="letter__seal-heart">&#9829;</span>
              </div>

              <p className="letter__eyebrow">the words I never said</p>
              <h2 className="letter__title" id="letter-title">
                To my beautiful Maheshu,
              </h2>

              <div className="letter__body">
                {LETTER_BODY.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p className="letter__signoff">
                <span className="letter__signoff-label">Forever yours,</span>
                <span className="letter__signoff-name">Thapelo Boya &#9829;</span>
              </p>

              <p className="letter__date">29 &#183; 11 &#183; 2026</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
