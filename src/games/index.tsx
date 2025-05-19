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

  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const playGame = useMainStore((state) => state.playGame)
  const playedGames = useMainStore((state) => state.playedGames)
  const setPlayedGames = useMainStore((state) => state.setPlayedGames)

  const winningModalState = useModalStore((state) => state.winningModal)
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  const playedRightSequenceForFirstTime =
    gameName === RIGHT_SEQUENCE && !playedGames[RIGHT_SEQUENCE]

  const playedMemoryForFirstTime = gameName === MEMORY && !playedGames[MEMORY]

  const handleCloseAfterWin = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (playedRightSequenceForFirstTime) {
      setCurrentScene(SCENES.LOUNGE_WITH_BOX)
    }

    if (playedMemoryForFirstTime) {
      setCurrentScene(SCENES.LOUNGE_FINAL)
    }

    setPlayedGames(GAMES[gameName])
    closeModal(Modals.winning, AnimationTimeout.long)
    playGame(false)
  }

  const handleAbort = () => {
    playGame(false)
  }

  const handleWin = () => {
    openModal(Modals.winning)

    timeoutRef.current = setTimeout(() => {
      handleCloseAfterWin()
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
        <Winning handleClose={handleCloseAfterWin} />
      ) : (
        <GameContainer
          key={winningModalState.isVisible ? 'winning' : 'game'}
          animationDuration={AnimationDuration.short}
          animationName={AnimationName.swashIn}
          displayCloseButton={true}
          onClose={handleAbort}
        >
          <Game />
        </GameContainer>
      )}
    </>
  )
}

export default Game
