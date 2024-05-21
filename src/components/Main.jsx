import { useEffect, useState } from "react"
import StartScreen from "./StartScreen"
import CardList from "./CardList"

function Main() {
  const [gameState, setGameState] = useState('start')
  const [storage, setStorage] = useState(null)
  const [clickedCardIds, setClickedCardIds] = useState([])
  
  useEffect(() => {
    getData()
  }, [])
  
  useEffect(() => {
    if (storage !== null) {
      if (clickedCardIds.length === storage.length) {
        setGameState('endGame')
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
    } else if (array.includes(id)) {
      console.log('LOOSE')
    }
  }


  const handleStartGame = () => {
    setGameState('playing')
  }


  const endGame = () => {
    setGameState('endGame')
  }

 
  return (
    <div className="container">
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
       {(gameState === 'endGame') && (
        <div>End of game</div>
      )}
    </div>
  )
}

export default Main