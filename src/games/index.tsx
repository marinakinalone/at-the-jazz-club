import React, { useState } from 'react'
import MemoryGame from './Memory'
import RightSequenceGame from './RightSequence'
import WinningMessage from './Winning'
import useStore from '@/store'
import { GameName, GAMES } from '@/types/games'
import { SCENES } from '@/types/scenes'

export const WINNING_MESSAGE_TIMEOUT = 1000

const Game = ({ gameName }: { gameName: GameName }) => {
  const [hasWon, setHasWon] = useState(false)
  const updateSceneState = useStore((state) => state.updateSceneState)
  const setCurrentScene = useStore((state) => state.setCurrentScene)
  const setPlayGame = useStore((state) => state.setPlayGame)
  const hasPlayedGames = useStore((state) => state.hasPlayedGames)
  const setHasPlayedGames = useStore((state) => state.setHasPlayedGames)

  const handleWin = () => {
    setHasWon(true)
    updateSceneState({ sceneName: SCENES.LOUNGE_WITH_BOX, unblocked: true })
    // updateSceneState({ sceneName: SCENES.CLUB_ENTRANCE, interactiveAreas: [{...enterClub,}] }) // TODO this is for local storage
    setTimeout(() => {
      if (!hasPlayedGames[GAMES[gameName]]) {
        setCurrentScene(SCENES.LOUNGE_WITH_BOX)
      }
      setPlayGame(false)
      setHasPlayedGames(GAMES[gameName])
      setHasWon(false)
    }, WINNING_MESSAGE_TIMEOUT)
  }

  const Game = () => {
    switch (gameName) {
      case GAMES.RIGHT_SEQUENCE:
        return <RightSequenceGame handleWin={handleWin} />
      case GAMES.MEMORY:
        return <MemoryGame handleWin={handleWin} />
      default:
        return <p>Game not found</p>
    }
  }
console.log('hasWon: ', hasWon)
  return <div>{hasWon ? <WinningMessage gameName={gameName} /> : <Game />}</div>
}

export default Game
