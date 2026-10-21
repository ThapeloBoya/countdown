export default function LoadingScreen({ visible }) {
  return (
    <div className={`loader${visible ? '' : ' loader--hidden'}`} aria-hidden={!visible}>
      <div className="loader__heart" aria-hidden="true">
        &#9829;
      </div>
      <p className="loader__text">Preparing something beautiful&hellip;</p>
    </div>
  )
}
