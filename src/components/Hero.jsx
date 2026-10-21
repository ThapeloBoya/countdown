import Rose from './Rose'
import { HERO_MESSAGE } from '../data/messages'

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__rose" aria-hidden="true">
        <Rose />
      </div>

      <h1 className="hero__names">
        <span className="hero__name hero__name--thapelo">THAPELO BOYA</span>
        <span className="hero__amp" aria-hidden="true">
          &#9829;
        </span>
        <span className="hero__name hero__name--given">GIVEN MAHESHU</span>
      </h1>

      <p className="hero__tagline">The last time we met, you never knew. This time, you will know everything.</p>

      <div className="hero__rule" aria-hidden="true">
        <span className="hero__rule-line" />
        <span className="hero__rule-heart">&#9829;</span>
        <span className="hero__rule-line" />
      </div>

      <p className="hero__message">{HERO_MESSAGE}</p>

      <p className="hero__signature">
        <span className="hero__signature-label">counting every second</span>
        <span className="hero__signature-value">&mdash; Thapelo</span>
      </p>
    </header>
  )
}
