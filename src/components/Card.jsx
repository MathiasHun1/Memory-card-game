
export default function Card({character, handleClick}) {
  return (
    <>
      <button 
        className="card effect" 
        key={character.id}
        onClick={() => handleClick(character.id)}
      >
        <h3>{character.name}</h3>
        <img src={character.image} alt="" />
      </button>
    </>
  )
}
