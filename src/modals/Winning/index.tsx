import React from 'react'
import styles from './Winning.module.css'
import Header from '@/components/Header'
import Message from '@/components/Message'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import useMainStore from '@/stores/mainStore'
import { AnimationDuration, AnimationName } from '@/types/modals'

const Winning = ({ handleClose }: { handleClose: () => void }) => {
  const currentGame = useMainStore((state) => state.currentGame)
  const playedGames = useMainStore((state) => state.playedGames)

  const hasAlreadyPlayedGame = currentGame && playedGames[currentGame]

  const handleClick = () => {
    handleClose()
  }

  const message = hasAlreadyPlayedGame
    ? 'Encore une partie de gagnée !'
    : 'Vous avez débloqué une nouvelle scène, bravo !'

  return (
    <ModalContainer
      animationName={AnimationName.puffIn}
      animationDuration={AnimationDuration.immediate}
    >
      <div className={styles.contentContainer}>
        <Header title="Bien joué !" maxDuration={1.5} />
        <Message content={message} />
        <PrimaryButton label="poursuivre l'aventure" handleClick={handleClick} />
      </div>
    </ModalContainer>
  )
}

export default Winning
