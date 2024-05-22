import { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  const [points, setPoints] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const modifyHighScore = (points, score) => {
    if (points > score) {
      setHighScore(points)
    }
  }

  const incrementPoints = () => {
    setPoints(prevPoints => prevPoints+1)
  }

  const erasePoints = () => {
    setPoints(0)
  }
 
  return (
    <>
      <Header points={points} highScore={highScore}/>
      <Main 
        points={points}
        highScore={highScore}
        incrementPoints={incrementPoints} 
        erasePoints={erasePoints}
        modifyHighScore={modifyHighScore}
      />
    </>
  )
}

export default App
