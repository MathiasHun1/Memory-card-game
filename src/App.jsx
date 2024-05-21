import { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  const [points, setPoints] = useState(0)

  const incrementPoints = () => {
    setPoints(prevPoints => prevPoints+1)
  }

  const erasePoints = () => {
    setPoints(0)
  }
 
  return (
    <>
      <Header points={points}/>
      <Main incrementPoints={incrementPoints} erasePoints={erasePoints}/>
    </>
  )
}

export default App
