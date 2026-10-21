import { useEffect, useRef, useState } from 'react'
import Atmosphere from './components/Atmosphere'
import Countdown from './components/Countdown'
import FloatingHearts from './components/FloatingHearts'
import Footer from './components/Footer'
import HeartSurprise from './components/HeartSurprise'
import Hero from './components/Hero'
import InfinityBond from './components/InfinityBond'
import LoadingScreen from './components/LoadingScreen'
import LoveLetter from './components/LoveLetter'
import ReunionCelebration from './components/ReunionCelebration'
import SoundToggle from './components/SoundToggle'
import { useAmbientSound } from './hooks/useAmbientSound'
import { useCountdown } from './hooks/useCountdown'
import './App.css'

export default function App() {
  const remaining = useCountdown()
  const sound = useAmbientSound()

  const [ready, setReady] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const celebratedRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    let revealTimer = null
    const startedAt = Date.now()

    const reveal = () => {
      if (cancelled || revealTimer) return
      const wait = Math.max(0, 900 - (Date.now() - startedAt))
      revealTimer = window.setTimeout(() => {
        if (!cancelled) setReady(true)
      }, wait)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(reveal).catch(reveal)
    } else {
      reveal()
    }

    const safety = window.setTimeout(reveal, 2600)

    return () => {
      cancelled = true
      window.clearTimeout(safety)
      if (revealTimer) window.clearTimeout(revealTimer)
    }
  }, [])

  useEffect(() => {
    if (remaining.isReunion && !celebratedRef.current) {
      celebratedRef.current = true
      setBurstKey((key) => key + 1)
    }
  }, [remaining.isReunion])

  return (
    <div className={`app${ready ? ' app--ready' : ''}`}>
      <LoadingScreen visible={!ready} />

      <Atmosphere />
      <FloatingHearts burstKey={burstKey} density={remaining.isReunion ? 2.2 : 1} />

      <div className="shell">
        <main className="page">
          <Hero />

          {remaining.isReunion ? (
            <ReunionCelebration />
          ) : (
            <Countdown remaining={remaining} />
          )}

          <section className="actions" aria-label="Little surprises">
            <LoveLetter />
            <HeartSurprise />
          </section>

          <InfinityBond />
        </main>

        <Footer />
      </div>

      <div className="corner-actions">
        <SoundToggle
          enabled={sound.enabled}
          supported={sound.supported}
          onToggle={sound.toggle}
        />
      </div>
    </div>
  )
}
