import React from 'react'
import ConfirmationModal from '../shared/ConfirmationModal'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GameName } from '@/types/games'
import { AnimationTimeout, Modals } from '@/types/modals'

const ReplayGame = () => {
  const closeModal = useModalStore((state) => state.closeModal)
  const playGame = useMainStore((state) => state.playGame)
  const replayGameModalState = useModalStore((state) => state.replayGameModal)

  const handleClose = () => {
    closeModal(Modals.REPLAY_GAME, AnimationTimeout.MEDIUM)
  }

  const handleReplay = () => {
    closeModal(Modals.REPLAY_GAME, AnimationTimeout.MEDIUM)
    playGame(replayGameModalState.gameName as GameName)
  }

  return (
    <ConfirmationModal
      title={'Une nouvelle partie ?'}
      message={
        'Vous avez déjà joué à ce jeu. Êtes-vous sûr.e de vouloir recommencer une nouvelle partie ?'
      }
      primaryButtonLabel={'Rejouer'}
      handlePrimaryButtonClick={handleReplay}
      secondaryButtonLabel={'Revenir au club'}
      handleSecondaryButtonClick={handleClose}
      displayCloseButton={true}
      onClose={handleClose}
    />
  )
}

export default ReplayGame
