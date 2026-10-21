import LoversSilhouette from './LoversSilhouette'

/**
 * Layered cinematic backdrop: midnight sky, wine and rose-gold light,
 * drifting aurora blobs, film grain, a horizon scene and a vignette.
 */
export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__sky" />
      <div className="atmosphere__blob atmosphere__blob--wine" />
      <div className="atmosphere__blob atmosphere__blob--blush" />
      <div className="atmosphere__blob atmosphere__blob--gold" />
      <div className="atmosphere__aurora" />
      <div className="atmosphere__scene">
        <LoversSilhouette />
      </div>
      <div className="atmosphere__grain" />
      <div className="atmosphere__vignette" />
    </div>
  )
}
