

export default function Header({points, highScore}) {
  return (
    <header className="header">
      <h1>Memory Game</h1>
      <h3>- DragonBall Edition -</h3>
      <p className="points">points: {points}</p>
      <p className="highscore">highScore: {highScore}</p>
    </header>
  )
}
