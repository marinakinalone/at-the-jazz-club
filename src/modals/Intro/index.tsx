import React, { useEffect, useState } from 'react'
import styles from './Intro.module.css'
import Header from '@/components/Header'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { AnimationTimeout, Modals } from '@/types/modals'
import { AnimationDuration, AnimationName } from '@/types/modals'

const DELAY_SECONDS = 7

const Intro = () => {
  const [showButton, setShowButton] = useState(false)

  const hasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const closeModal = useModalStore((state) => state.closeModal)
  const modalState = useModalStore((state) => state.introModal)

  const handleClick = () => {
    closeModal(Modals.intro, AnimationTimeout.medium, () => hasEnteredTheClub(true))
  }

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShowButton(true)
      },
      (DELAY_SECONDS + 1) * 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  return (
    <ModalContainer
      animationName={modalState.isClosing ? AnimationName.swashOut : AnimationName.puffIn}
      animationDuration={AnimationDuration.medium}
      shouldDisplayCloseButton={false}
    >
      <div className={styles.container}>
        <Header title="Le Club de Jazz" maxDuration={DELAY_SECONDS} />

        <PrimaryButton
          label="Entrer"
          handleClick={handleClick}
          customStyles={{ opacity: showButton ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        />
      </div>
    </ModalContainer>
  )
}

export default Intro
