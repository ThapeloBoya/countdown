import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A tiny, asset-free ambience engine built on the Web Audio API:
 * a slow warm pad, a gentle heartbeat, and occasional soft chimes.
 *
 * Nothing is ever created until the visitor explicitly asks for sound,
 * so audio can never autoplay.
 */
export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false)
  const [supported, setSupported] = useState(true)

  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const padRef = useRef(null)
  const timersRef = useRef({ beat: null, chime: null })

  const stop = useCallback(() => {
    const { beat, chime } = timersRef.current
    if (beat) window.clearInterval(beat)
    if (chime) window.clearTimeout(chime)
    timersRef.current = { beat: null, chime: null }

    if (masterRef.current && ctxRef.current) {
      const now = ctxRef.current.currentTime
      masterRef.current.gain.cancelScheduledValues(now)
      masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
      masterRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.6)
    }

    if (padRef.current) {
      padRef.current.forEach((oscillator) => {
        try {
          oscillator.stop(ctxRef.current.currentTime + 0.7)
        } catch {
          /* already stopped */
        }
      })
      padRef.current = null
    }

    const ctx = ctxRef.current
    ctxRef.current = null
    masterRef.current = null

    if (ctx && ctx.state !== 'closed') {
      window.setTimeout(() => ctx.close().catch(() => {}), 800)
    }
  }, [])

  const start = useCallback(() => {
    const AudioCtor = window.AudioContext || window.webkitAudioContext
    if (!AudioCtor) {
      setSupported(false)
      return
    }

    let ctx
    try {
      ctx = new AudioCtor()
    } catch {
      setSupported(false)
      return
    }

    ctxRef.current = ctx

    // Resume straight away, while we are still inside the user's click gesture.
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})

    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 2.5)
    master.connect(ctx.destination)
    masterRef.current = master

    // Warm pad: two detuned sine waves through a slow, breathing filter.
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 620
    filter.Q.value = 0.9
    filter.connect(master)

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.05
    lfoGain.gain.value = 260
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()

    const pad = [110, 164.81, 220].map((frequency, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = frequency
      osc.detune.value = index === 1 ? 4 : -3
      gain.gain.value = index === 2 ? 0.16 : 0.3
      osc.connect(gain)
      gain.connect(filter)
      osc.start()
      return osc
    })
    padRef.current = [...pad, lfo]

    const thump = (at, gainAmount) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(72, at)
      osc.frequency.exponentialRampToValueAtTime(38, at + 0.18)
      gain.gain.setValueAtTime(0.0001, at)
      gain.gain.exponentialRampToValueAtTime(gainAmount, at + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.34)
      osc.connect(gain)
      gain.connect(master)
      osc.start(at)
      osc.stop(at + 0.4)
    }

    // Heartbeat: a soft "lub-dub", twice a minute of your own time.
    timersRef.current.beat = window.setInterval(() => {
      if (!ctxRef.current) return
      const t = ctx.currentTime
      thump(t, 0.5)
      thump(t + 0.26, 0.32)
    }, 1500)

    // Occasional chime from a soft pentatonic scale.
    const chime = () => {
      if (!ctxRef.current) return
      const scale = [523.25, 587.33, 659.25, 783.99, 880]
      const note = scale[Math.floor(Math.random() * scale.length)]
      const t = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = note
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.18, t + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2)
      osc.connect(gain)
      gain.connect(master)
      osc.start(t)
      osc.stop(t + 3.4)

      timersRef.current.chime = window.setTimeout(chime, 8000 + Math.random() * 9000)
    }
    timersRef.current.chime = window.setTimeout(chime, 4000)

    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  }, [])
  const toggle = useCallback(() => {
    setEnabled((previous) => {
      if (previous) {
        stop()
      } else {
        start()
      }
      return !previous
    })
  }, [start, stop])

  useEffect(() => {
    return () => {
      const { beat, chime } = timersRef.current
      if (beat) window.clearInterval(beat)
      if (chime) window.clearTimeout(chime)
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return { enabled, supported, toggle }
}
