export default function InfinityBond() {
  return (
    <section className="infinity" aria-label="Our bond">
      <div className="infinity__symbol" aria-hidden="true">
        <svg viewBox="0 0 120 56">
          <defs>
            <linearGradient id="infinityStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e6b98a" />
              <stop offset="50%" stopColor="#ff8fa3" />
              <stop offset="100%" stopColor="#ffd6dd" />
            </linearGradient>
            <filter id="infinityGlow" x="-40%" y="-60%" width="180%" height="220%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            className="infinity__path"
            d="M30 28c0-9.4 6.6-16 15-16s15 6.6 15 16-6.6 16-15 16-15-6.6-15-16Zm60 0c0-9.4-6.6-16-15-16s-15 6.6-15 16 6.6 16 15 16 15-6.6 15-16ZM45 28c0-9.4 6.6-16 15-16s15 6.6 15 16"
            fill="none"
            stroke="url(#infinityStroke)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#infinityGlow)"
          />
        </svg>
      </div>
      <p className="infinity__text">
        You <span className="infinity__plus">+</span> Me, <span className="infinity__always">Always</span> &#8734;
      </p>
    </section>
  )
}
