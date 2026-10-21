/**
 * A hand-drawn rose that "blooms" into view and then breathes gently.
 */
export default function Rose({ className = '' }) {
  return (
    <svg
      className={`rose ${className}`}
      viewBox="0 0 120 168"
      role="img"
      aria-label="A blooming rose, symbolising love"
    >
      <defs>
        <linearGradient id="rosePetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9db1" />
          <stop offset="48%" stopColor="#e8365f" />
          <stop offset="100%" stopColor="#8e0b32" />
        </linearGradient>
        <linearGradient id="rosePetalInner" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffd1dc" />
          <stop offset="60%" stopColor="#ff6b81" />
          <stop offset="100%" stopColor="#c21246" />
        </linearGradient>
        <linearGradient id="roseStem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5f7a52" />
          <stop offset="100%" stopColor="#2c3b26" />
        </linearGradient>
        <filter id="roseGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="rose__stem" filter="url(#roseGlow)">
        <path
          d="M60 78 C58 104 59 126 60 156"
          stroke="url(#roseStem)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M59 112 C44 110 33 100 28 88 C44 86 57 95 60 108 Z"
          fill="url(#roseStem)"
          opacity="0.95"
        />
        <path
          d="M61 128 C76 126 87 116 92 104 C76 102 64 111 61 124 Z"
          fill="url(#roseStem)"
          opacity="0.8"
        />
      </g>

      <g className="rose__bloom" filter="url(#roseGlow)">
        <path
          d="M60 12 C86 12 100 30 98 50 C96 68 80 80 60 80 C40 80 24 68 22 50 C20 30 34 12 60 12 Z"
          fill="url(#rosePetal)"
          className="rose__petal rose__petal--outer"
        />
        <path
          d="M60 28 C78 28 88 40 85 53 C83 65 72 71 60 71 C48 71 37 65 35 53 C32 40 42 28 60 28 Z"
          fill="url(#rosePetalInner)"
          className="rose__petal rose__petal--mid"
        />
        <path
          d="M60 41 C70 41 76 48 74 56 C72 63 66 66 60 66 C54 66 48 63 46 56 C44 48 50 41 60 41 Z"
          fill="url(#rosePetal)"
          className="rose__petal rose__petal--inner"
        />
        <path
          d="M60 34 C62 46 55 52 52 58 C50 62 52 66 58 67"
          stroke="#ffd6dd"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
          className="rose__petal rose__petal--inner"
        />
      </g>
    </svg>
  )
}
