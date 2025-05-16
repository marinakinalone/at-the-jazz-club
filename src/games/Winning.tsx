// animation then modal + button to:
// unlock scene
// update interactive areas
import React from 'react'
import { GameName } from '@/types/games'

// TODO make it a modal
const WinningMessage = ({ gameName }: { gameName: GameName }) => {
  return (
    <div>
      Winning Message for ${gameName} Game (two versions _one for first unlock, the other one for
      replay)
    </div>
  )
}

export default WinningMessage
