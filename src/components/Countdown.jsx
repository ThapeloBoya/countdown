import { Heart } from 'lucide-react'
import RollingNumber from './RollingNumber'
import { REUNION_LABEL } from '../hooks/useCountdown'

const UNITS = [
  { key: 'days', label: 'DAYS', pad: 2 },
  { key: 'hours', label: 'HOURS', pad: 2 },
  { key: 'minutes', label: 'MINUTES', pad: 2 },
  { key: 'seconds', label: 'SECONDS', pad: 2 },
]

export default function Countdown({ remaining }) {
  return (
    <section className="countdown" aria-labelledby="countdown-heading">
      <p className="countdown__eyebrow">
        <span className="countdown__eyebrow-heart">
          <Heart className="heartbeat" size={18} strokeWidth={2.1} aria-hidden="true" />
        </span>
        <span id="countdown-heading">Every second brings me closer to you</span>
      </p>

      <div className="countdown__grid" role="timer" aria-label="Time remaining until we meet again">
        {UNITS.map((unit) => (
          <article className="unit" key={unit.key}>
            <span className="unit__glow" aria-hidden="true" />
            <span className="unit__flash" key={`${unit.key}-${remaining[unit.key]}`} aria-hidden="true" />
            <div className="unit__value">
              <RollingNumber value={remaining[unit.key]} pad={unit.pad} />
            </div>
            <span className="unit__label">{unit.label}</span>
          </article>
        ))}
      </div>

      <p className="countdown__closing">Until I see you again, my love&hellip;</p>

      <p className="countdown__date">
        <span className="countdown__date-heart" aria-hidden="true">
          &#9829;
        </span>
        {REUNION_LABEL}
        <span className="countdown__date-heart" aria-hidden="true">
          &#9829;
        </span>
      </p>

      <p className="countdown__whisper">One more sleep at a time. One heartbeat closer.</p>
    </section>
  )
}
