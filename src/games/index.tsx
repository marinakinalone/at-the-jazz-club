import React, { useState } from 'react'
import MemoryGame from './Memory'
import RightSequenceGame from './RightSequence'
import WinningMessage from './Winning'
import GameContainer from '@/components/ModalContainer'
import useMainStore from '@/stores/mainStore'
import { GameName, GAMES } from '@/types/games'
import { SCENES } from '@/types/scenes'

export const WINNING_MESSAGE_TIMEOUT = 1000

const { RIGHT_SEQUENCE, MEMORY } = GAMES

const Game = ({ gameName }: { gameName: GameName }) => {
  const [hasWon, setHasWon] = useState(false)
  const updateSceneState = useMainStore((state) => state.updateSceneState)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayGame = useMainStore((state) => state.setPlayGame)
  const hasPlayedGames = useMainStore((state) => state.hasPlayedGames)
  const setHasPlayedGames = useMainStore((state) => state.setHasPlayedGames)

  const hasPlayedRightSequenceForFirstTime = gameName === RIGHT_SEQUENCE && !hasPlayedGames[RIGHT_SEQUENCE]

  const hasPlayedMemoryForFirstTime = gameName === MEMORY&&
    !hasPlayedGames[MEMORY]

    
  const handleWin = () => {
    setHasWon(true)

    setTimeout(() => {
      if (hasPlayedRightSequenceForFirstTime) {
        updateSceneState({ sceneName: SCENES.LOUNGE_WITH_BOX, unblocked: true })
        setCurrentScene(SCENES.LOUNGE_WITH_BOX)
      }

      if (hasPlayedMemoryForFirstTime) {
        updateSceneState({ sceneName: SCENES.LOUNGE_FINAL, unblocked: true })
        setCurrentScene(SCENES.LOUNGE_FINAL)
      }
      
      setPlayGame(false)
      setHasPlayedGames(GAMES[gameName])
      setHasWon(false)
    }, WINNING_MESSAGE_TIMEOUT)
  }

  const Game = () => {
    switch (gameName) {
      case RIGHT_SEQUENCE:
        return <RightSequenceGame handleWin={handleWin} />
      case MEMORY:
        return <MemoryGame handleWin={handleWin} />
      default:
        return <p>Game not found</p>
    }
  }

  return <GameContainer>{hasWon ? <WinningMessage gameName={gameName} /> : <Game />}</GameContainer>
}

export default Game
