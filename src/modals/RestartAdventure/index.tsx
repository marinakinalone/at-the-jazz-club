import React from 'react'
import ConfirmationModal from '../shared/ConfirmationModal'
import { ALL_SOUNDS } from '@/constants/music'
import scenes from '@/data/scenes'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import useSoundStore from '@/stores/soundStore'
import { GAMES } from '@/types/games'
import { AnimationTimeout, Modals } from '@/types/modals'

const { MEMORY, RIGHT_SEQUENCE } = GAMES

const RestartAdventure = () => {
  const closeModal = useModalStore((state) => state.closeModal)
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayedGames = useMainStore((state) => state.setPlayedGames)
  const playGame = useMainStore((state) => state.playGame)
  const playSound = useSoundStore(state => state.playSound)
  const stopSound = useSoundStore(state => state.stopSound)


  const handleClose = () => {
    closeModal(Modals.RESTART_ADVENTURE, AnimationTimeout.MEDIUM)
  }

  const handleRestart = () => {
    stopSound(ALL_SOUNDS)
    closeModal(Modals.RESTART_ADVENTURE, AnimationTimeout.MEDIUM)

    setHasEnteredTheClub(false)
    setCurrentScene(scenes[0].name)
    playGame(false)

    setPlayedGames(RIGHT_SEQUENCE, false)
    setPlayedGames(MEMORY, false)

    playSound('global_background')
  }

  return (
    <ConfirmationModal
      title="Voulez-vous vraiment redémarrer l'aventure ?"
      message="Attention: cette action est irréversible et tous les progrès accomplis jusqu'ici seront supprimés."
      secondaryButtonLabel="Redémarrer"
      primaryButtonLabel="Annuler"
      handleSecondaryButtonClick={handleRestart}
      handlePrimaryButtonClick={handleClose}
      displayCloseButton={true}
      onClose={handleClose}
    />
  )
}

export default RestartAdventure
