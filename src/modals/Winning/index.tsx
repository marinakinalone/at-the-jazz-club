// TODO animation then modal + button to:
// unlock scene
// update interactive areas
import React from 'react'
import styles from './Winning.module.css'
import Header from '@/components/Header'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import useMainStore from '@/stores/mainStore'
import { AnimationDuration, AnimationName } from '@/types/modals'

const Winning = ({ handleClose }: { handleClose: () => void }) => {
  const currentGame = useMainStore((state) => state.playGame)
  const hasPlayedGames = useMainStore((state) => state.hasPlayedGames)

  const hasAlreadyPlayedGame = currentGame && hasPlayedGames[currentGame]

  const handleClick = () => {
    // TODO add animation on close
    handleClose()
  }

  const message = hasAlreadyPlayedGame ? "Encore une partie de gagnée !" : "Vous avez débloqué une nouvelle scène, bravo !"


  return (
    <ModalContainer
      animationName={AnimationName.puffIn}
      animationDuration={AnimationDuration.immediate}
    >
      <div className={styles.contentContainer}>
        <Header title="Bien joué !" maxDuration={1.5} />
        <p className={styles.message}>
          {message}
        </p>
        <PrimaryButton label="poursuivre l'aventure" handleClick={handleClick} />
      </div>
    </ModalContainer>
  )
}

export default Winning
