import React from 'react'

export const MemoryGame = ({ handleWin }: { handleWin: () => void }) => {
  return <button onClick={handleWin}>click to unlock scene</button>
}

export default MemoryGame
