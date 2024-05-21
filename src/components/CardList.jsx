import { useState } from "react"
import Card from "./Card"


export default function CardList({storage, handleClick, clickedCardIds}) {

  const isWon = storage.length > 0 ? storage.length === clickedCardIds.length : false

  // Generate 3 random card IDs 
  const genRandomArray = (itemList, clickedCardIds) => {
    //win conditon if no unclicked cards left
    if (clickedCardIds.length === itemList.length) {
      console.log("you won")
      return 
    }

    let randomArray = []

    while (true) {
      let array = genRandomIds()
      if (!array.every((id) => clickedCardIds.includes(id))) {
        randomArray = [...array]
        break
      }
    }
    return randomArray
  }



  function genRandomIds () {
    const ids = new Set()

    while (ids.size < 3) {
      let num = Math.floor(Math.random() * 10)
      ids.add(num)
    }
    return Array.from(ids)
  }


  return (
    <div className="container">
      {!isWon && genRandomArray(storage, clickedCardIds).map((index) => (
        <Card
          character={storage[index]}
          key={index}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}
