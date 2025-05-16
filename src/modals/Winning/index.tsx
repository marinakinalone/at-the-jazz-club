// animation then modal + button to:
// unlock scene
// update interactive areas
import React from 'react'
import useMainStore from '@/stores/mainStore'

const Winning = () => {
  const currentGame = useMainStore((state) => state.playGame)

  return (
    <div>
      Winning for ${currentGame} Game (two versions _one for first unlock, the other one for replay)
    </div>
  )
}

export default Winning
