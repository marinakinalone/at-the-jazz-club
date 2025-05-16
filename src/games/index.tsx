import React, { useEffect, useRef } from 'react'
import MemoryGame from './Memory'
import RightSequenceGame from './RightSequence'
import GameContainer from '@/components/ModalContainer'
import Winning from '@/modals/Winning'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GameName, GAMES } from '@/types/games'
import { AnimationDuration, AnimationName, AnimationTimeout, Modals } from '@/types/modals'
import { SCENES } from '@/types/scenes'

export const WINNING_MESSAGE_TIMEOUT = 10000

const { RIGHT_SEQUENCE, MEMORY } = GAMES

const Game = ({ gameName }: { gameName: GameName }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateSceneState = useMainStore((state) => state.updateSceneState)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayGame = useMainStore((state) => state.setPlayGame)
  const hasPlayedGames = useMainStore((state) => state.hasPlayedGames)
  const setHasPlayedGames = useMainStore((state) => state.setHasPlayedGames)

  const winningModalState = useModalStore((state) => state.winningModal)
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  const hasPlayedRightSequenceForFirstTime =
    gameName === RIGHT_SEQUENCE && !hasPlayedGames[RIGHT_SEQUENCE]

  const hasPlayedMemoryForFirstTime = gameName === MEMORY && !hasPlayedGames[MEMORY]

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (hasPlayedRightSequenceForFirstTime) {
      updateSceneState({ sceneName: SCENES.LOUNGE_WITH_BOX, unblocked: true })
      setCurrentScene(SCENES.LOUNGE_WITH_BOX)
    }

    if (hasPlayedMemoryForFirstTime) {
      updateSceneState({ sceneName: SCENES.LOUNGE_FINAL, unblocked: true })
      setCurrentScene(SCENES.LOUNGE_FINAL)
    }

    setHasPlayedGames(GAMES[gameName])
    closeModal(Modals.winning, AnimationTimeout.short)
    setPlayGame(false)
  }

  const handleWin = () => {
    openModal(Modals.winning)

    timeoutRef.current = setTimeout(() => {
      handleClose()
    }, WINNING_MESSAGE_TIMEOUT)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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

  return (
    <>
      {winningModalState.isVisible ? (
        <Winning handleClose={handleClose} />
      ) : (
        <GameContainer
          key={winningModalState.isVisible ? 'winning' : 'game'}
          animationDuration={AnimationDuration.short}
          animationName={AnimationName.swashIn}
        >
          <Game />
        </GameContainer>
      )}
    </>
  )
}

export default Game
