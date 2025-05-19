import Image from 'next/image'
import React from 'react'

// 25 cards, 5 x 5 grid. 12 + 1 winning card 

export const MemoryGame = ({ handleWin }: { handleWin: () => void }) => {
  return (<>
  <div>
    <button>
    <Image src={`/games/memory/card_recto.png`} alt="Memory" width={95} height={125} />
    </button>
  </div>
  <button onClick={handleWin}>click to unlock scene for MemoryGame</button>
  </>)
}

export default MemoryGame
