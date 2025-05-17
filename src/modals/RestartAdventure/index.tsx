import React from 'react'
import styles from './RestartAdventure.module.css'
import Message from '@/components/Message'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import SubHeader from '@/components/SubHeader'
import scenes from '@/data/scenes'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GAMES } from '@/types/games'
import { AnimationDuration, AnimationName, AnimationTimeout, Modals } from '@/types/modals'

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
    <ModalContainer
      animationName={AnimationName.swashIn}
      animationDuration={AnimationDuration.medium}
    >
      <div className={styles.contentContainer}>
        <SubHeader title="Voulez-vous vraiment redémarrer l'aventure ? " />
        <Message content="Attention: cette action est irréversible et tous les progrès accomplis jusqu'ici seront supprimés." />
        <div className={styles.buttonContainer}>
          <SecondaryButton label="Redémarrer" handleClick={handleRestart} />
          <PrimaryButton label="Annuler" handleClick={handleClose} />
        </div>
      </div>
    </ModalContainer>
  )
}

export default RestartAdventure
