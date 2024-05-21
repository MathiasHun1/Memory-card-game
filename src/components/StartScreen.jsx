
export default function StartScreen({onStartGame}) {
  return (
    <>
      <div>Before game start</div>
      <button onClick={onStartGame} className="button start-button">PLAY</button>
    </>
  )
}
