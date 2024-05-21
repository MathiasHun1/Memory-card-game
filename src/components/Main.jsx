import { useEffect, useState } from "react"
import StartScreen from "./StartScreen"
import CardList from "./CardList"

function Main({incrementPoints, erasePoints}) {
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
        <div>You Won</div>
      )}
      {(gameState === 'loosing') && (

        <>
          <div>You loose</div>
          <button className="button restart-button" onClick={playAgain}>Play Again?</button>
        </>
      )}
    </>
  )
}

export default Main