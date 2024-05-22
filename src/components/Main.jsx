import { useEffect, useState } from "react"
import StartScreen from "./StartScreen"
import CardList from "./CardList"

function Main({incrementPoints, erasePoints, modifyHighScore, points, highScore}) {
  const [gameState, setGameState] = useState('start')
  const [storage, setStorage] = useState(null)
  const [clickedCardIds, setClickedCardIds] = useState([])

  useEffect(() => {
    getData()
  }, [])
  

  useEffect(() => {
    if (storage !== null) {
      if (clickedCardIds.length === storage.length) {
        setGameState('winning')
      }
    }
  }, [clickedCardIds])

  useEffect(() => {
    if (gameState === 'loosing') {
      modifyHighScore(points, highScore)
    }
  }, [gameState])


  const getData = async () => {
    const response = await fetch('https://dragonball-api.com/api/characters')
    const data = await response.json()
    const items = [...data.items]
    items.forEach(((item) => item.id = item.id-1))

    setStorage(items)
  }


  const handleClickCard = (id) => {
    const array = [...clickedCardIds]
    if (!array.includes(id)) {
      array.push(id)
      setClickedCardIds(array)
      incrementPoints()
    } else if (array.includes(id)) {
      setGameState('loosing')
    }
  }
  
  
  const handleStartGame = () => {
    setGameState('playing')
  }
  
  const playAgain = () => {
    setClickedCardIds([])
    setGameState('playing')
    erasePoints()
  }

  
  return (
    <>
      {(gameState === 'start') && (
        <StartScreen
          onStartGame = {handleStartGame}
        />
      )}
       {(gameState === 'playing') && (
        <CardList 
          storage={storage} 
          clickedCardIds={clickedCardIds}
          handleClick={handleClickCard}
        />
      )}
       {(gameState === 'winning') && (
        <>
          <h3 className="end effect">You found it All!</h3>
          <button className="button restart-button" onClick={playAgain}>Play Again?</button>
        </>
      )}
      {(gameState === 'loosing') && (

        <>
          <h3 className="end effect">You loose</h3>
          <button className="button restart-button" onClick={playAgain}>Play Again?</button>
        </>
      )}
    </>
  )
}

export default Main