import { Volume2, VolumeX } from 'lucide-react'

export default function SoundToggle({ enabled, supported, onToggle }) {
  if (!supported) return null

  return (
    <button
      type="button"
      className={`sound-toggle${enabled ? ' sound-toggle--on' : ''}`}
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Turn ambient sound off' : 'Turn ambient sound on'}
      title={enabled ? 'Silence the ambience' : 'Play a gentle ambience'}
    >
      {enabled ? (
        <Volume2 size={16} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <VolumeX size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span className="sound-toggle__label">{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  )
}
