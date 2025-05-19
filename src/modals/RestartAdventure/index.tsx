import React from 'react'
import ConfirmationModal from '../shared/ConfirmationModal'
import scenes from '@/data/scenes'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GAMES } from '@/types/games'
import { AnimationTimeout, Modals } from '@/types/modals'

const { MEMORY, RIGHT_SEQUENCE } = GAMES

const RestartAdventure = () => {
  const closeModal = useModalStore((state) => state.closeModal)
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayedGames = useMainStore((state) => state.setPlayedGames)
  const playGame = useMainStore((state) => state.playGame)

  const handleClose = () => {
    closeModal(Modals.restartAdventure, AnimationTimeout.medium)
  }

  const handleRestart = () => {
    closeModal(Modals.restartAdventure, AnimationTimeout.medium)

    setHasEnteredTheClub(false)
    setCurrentScene(scenes[0].name)
    playGame(false)

    setPlayedGames(RIGHT_SEQUENCE, false)
    setPlayedGames(MEMORY, false)
  }

  return (
    <ConfirmationModal
      title="Voulez-vous vraiment redémarrer l'aventure ?"
      message="Attention: cette action est irréversible et tous les progrès accomplis jusqu'ici seront supprimés."
      secondaryButtonLabel="Redémarrer"
      primaryButtonLabel="Annuler"
      handleSecondaryButtonClick={handleRestart}
      handlePrimaryButtonClick={handleClose}
    />
  )
}

export default RestartAdventure
