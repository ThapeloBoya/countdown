import { REUNION_LABEL } from '../hooks/useCountdown'
import { REUNION_MESSAGE } from '../data/messages'

export default function ReunionCelebration() {
  return (
    <section className="reunion" aria-labelledby="reunion-heading">
      <p className="reunion__eyebrow">the countdown has reached zero</p>

      <h2 className="reunion__title" id="reunion-heading">
        Today is the day, my love!
      </h2>

      <p className="reunion__date">{REUNION_LABEL} &#9829;</p>

      <p className="reunion__message">{REUNION_MESSAGE}</p>

      <div className="reunion__moments">
        <div className="reunion__moment">
          <span className="reunion__moment-value">00</span>
          <span className="reunion__moment-label">Days of waiting</span>
        </div>
        <div className="reunion__moment">
          <span className="reunion__moment-value">29</span>
          <span className="reunion__moment-label">Reasons to celebrate</span>
        </div>
        <div className="reunion__moment">
          <span className="reunion__moment-value">1</span>
          <span className="reunion__moment-label">Heart, shared</span>
        </div>
      </div>

      <p className="reunion__closing">
        No more counting. Only you, only me, and every moment from here.
      </p>
    </section>
  )
}
