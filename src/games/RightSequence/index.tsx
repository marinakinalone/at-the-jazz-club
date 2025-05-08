import React, {useState} from 'react'
import useStore from '@/store'
import { WINNING_MESSAGE_TIMEOUT } from '@/constants/games'
import { SCENES } from '@/constants/scenes'
import { GAMES } from '@/constants/games'
import WinningRightSequenceGame from './Winning'

// 10 notes available, 10 colors.

const RightSequenceGame = () => {
  const [hasWon, setHasWon] = useState(false)
  const updateSceneState = useStore((state) => state.updateSceneState)
  const setCurrentScene = useStore((state) => state.setCurrentScene)
  const setPlayGame = useStore((state) => state.setPlayGame)
  const hasPlayedGames = useStore((state) => state.hasPlayedGames)
  const setHasPlayedGames = useStore((state) => state.setHasPlayedGames)

  const handleWin = () => {
    setHasWon(true)
    updateSceneState({ sceneName: SCENES.LOUNGE_WITH_BOX, unblocked: true })
    // updateSceneState({ sceneName: SCENES.CLUB_ENTRANCE, interactiveAreas: [{...enterClub,}] })
    setTimeout(() => {
      if (!hasPlayedGames[GAMES.RIGHT_SEQUENCE]) {
        setCurrentScene(SCENES.LOUNGE_WITH_BOX)
      }    
      setHasWon(false)
      setPlayGame(false)
      setHasPlayedGames(GAMES.RIGHT_SEQUENCE)
  }, WINNING_MESSAGE_TIMEOUT)
} 

  return (
    <div>
      <h1>Right Sequence Game</h1>
      {hasWon ? (
        <WinningRightSequenceGame />
      ) : (
        <div>
          <button onClick={handleWin}>click to unlock scene</button>
        </div>
      )}
    </div>
  )
}

export default RightSequenceGame