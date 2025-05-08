import React from 'react'

export const RightSequenceGame = ({ handleWin }: { handleWin: () => void }) => {
  return <button onClick={handleWin}>click to unlock scene</button>
}

export default RightSequenceGame
