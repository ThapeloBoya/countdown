/* A deterministic, generated city skyline with twinkling windows,
   a warm horizon and the silhouette of two lovers holding each other. */

function mulberry32(seed) {
  let a = seed
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const WIDTH = 1200
const HEIGHT = 320
const GROUND = 268

function buildScene() {
  const random = mulberry32(20261129)
  const buildings = []
  const windows = []

  let x = -20
  while (x < WIDTH + 20) {
    const width = 26 + random() * 52
    const height = 34 + random() * 108
    const top = GROUND - height
    buildings.push({ x, width, height, top })

    const columns = Math.max(1, Math.floor(width / 12))
    const rows = Math.max(1, Math.floor(height / 18))
    for (let c = 0; c < columns; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        if (random() > 0.42) continue
        windows.push({
          x: x + 5 + c * 12,
          y: top + 9 + r * 18,
          w: 3.5 + random() * 2,
          h: 4 + random() * 2.5,
          delay: random() * 6,
          duration: 3 + random() * 5,
          opacity: 0.25 + random() * 0.6,
        })
      }
    }

    x += width + 2 + random() * 10
  }

  return { buildings, windows }
}

const SCENE = buildScene()

export default function LoversSilhouette() {
  return (
    <svg
      className="scene"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sceneSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b0716" stopOpacity="0" />
          <stop offset="55%" stopColor="#6a1230" stopOpacity="0.45" />
          <stop offset="88%" stopColor="#c3305a" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#e6a06a" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="sceneSun" cx="50%" cy="92%" r="46%">
          <stop offset="0%" stopColor="#ffcf9c" stopOpacity="0.85" />
          <stop offset="42%" stopColor="#f0808f" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#7a1030" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sceneGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12040d" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#050208" stopOpacity="0.95" />
        </linearGradient>
        <filter id="sceneGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#sceneSky)" />
      <ellipse cx="640" cy="270" rx="620" ry="150" fill="url(#sceneSun)" />

      <g className="scene-buildings">
        {SCENE.buildings.map((building, index) => (
          <rect
            key={`b-${index}`}
            x={building.x}
            y={building.top}
            width={building.width}
            height={building.height}
            fill="#0a040e"
            opacity={0.92}
          />
        ))}
      </g>

      <g className="scene-windows">
        {SCENE.windows.map((win, index) => (
          <rect
            key={`w-${index}`}
            x={win.x}
            y={win.y}
            width={win.w}
            height={win.h}
            rx="0.6"
            fill="#ffcf94"
            className={index % 3 === 0 ? 'scene-window' : undefined}
            style={
              index % 3 === 0
                ? {
                    animationDelay: `${win.delay}s`,
                    animationDuration: `${win.duration}s`,
                    opacity: win.opacity,
                  }
                : { opacity: win.opacity * 0.8 }
            }
          />
        ))}
      </g>

      <path
        d={`M0 ${GROUND} C 180 ${GROUND - 6} 380 ${GROUND + 4} 560 ${GROUND} C 760 ${GROUND - 8} 980 ${GROUND + 6} 1200 ${GROUND - 4} L1200 ${HEIGHT} L0 ${HEIGHT} Z`}
        fill="url(#sceneGround)"
      />

      <g className="scene-lovers" transform="translate(880 150)">
        <ellipse cx="62" cy="116" rx="86" ry="9" fill="#050208" opacity="0.6" />
        <g fill="#050208">
          <circle cx="44" cy="34" r="15" />
          <path d="M20 118 C20 74 28 54 44 48 C60 54 68 74 68 118 Z" />
          <circle cx="74" cy="47" r="13.5" />
          <path d="M56 118 C57 82 63 64 74 58 C86 64 93 82 94 118 Z" />
        </g>
        <path
          d="M60 66 C74 62 88 70 90 86"
          fill="none"
          stroke="#050208"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          className="scene-lovers-heart"
          d="M59 22c.9-1.3 2.9-1.5 3.9-.3.5.6.7 1.4.7 2.2 0-.8.2-1.6.7-2.2 1-1.2 3-.9 3.9.4.7 1 .6 2.4-.3 3.5l-4.3 4.9-4.3-4.9c-.9-1.2-1-2.6-.3-3.6z"
          fill="#ff5f83"
          opacity="0.9"
          filter="url(#sceneGlow)"
        />
      </g>
    </svg>
  )
}
