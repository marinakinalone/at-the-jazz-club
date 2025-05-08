import React, {useState} from 'react'
import useStore from '@/store'
import { WINNING_MESSAGE_TIMEOUT } from '@/constants/games'
import { SCENES } from '@/constants/scenes'
import { GAMES } from '@/constants/games'
import WinningMemoryGame from './Winning'

// TODO code is redundant for each game, create a base game component and extend it for each game

const MemoryGame = () => {
  const [hasWon, setHasWon] = useState(false)
  const updateSceneState = useStore((state) => state.updateSceneState)
  const setCurrentScene = useStore((state) => state.setCurrentScene)
  const setPlayGame = useStore((state) => state.setPlayGame)
  const setHasPlayedGames = useStore((state) => state.setHasPlayedGames)
  const hasPlayedGames = useStore((state) => state.hasPlayedGames)


  const handleWin = () => {
    setHasWon(true)
    const hasNotPlayedGameBefore = !hasPlayedGames[GAMES.MEMORY]

    if (hasNotPlayedGameBefore) {
    updateSceneState({ sceneName: SCENES.LOUNGE_FINAL, unblocked: true })
    // updateSceneState({ sceneName: SCENES.CLUB_ENTRANCE, interactiveAreas: [{...enterClub,}] })
    }
    setTimeout(() => {
      if (hasNotPlayedGameBefore) {
        setCurrentScene(SCENES.LOUNGE_FINAL)
      }    
      setHasWon(false)
      setPlayGame(false)
      setHasPlayedGames(GAMES.MEMORY)
  }, WINNING_MESSAGE_TIMEOUT)
} 

  return (
    <div>
      <h1>Memory</h1>
      {hasWon ? (
       <WinningMemoryGame />
      ) : (
        <div>
          <button onClick={handleWin}>click to unlock scene</button>
        </div>
      )}
    </div>
  )
}

export default MemoryGame