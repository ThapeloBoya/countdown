/**
 * Odometer-style rolling digits. Only the digits that actually change
 * re-render, so each one rolls into place on its own.
 */
export default function RollingNumber({ value, pad = 2 }) {
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0
  const text = String(safeValue).padStart(pad, '0')

  return (
    <span className="rolling" aria-hidden="true">
      {text.split('').map((digit, index) => (
        <span className="rolling__slot" key={`${index}-${digit}`}>
          <span className="rolling__digit">{digit}</span>
        </span>
      ))}
    </span>
  )
}
