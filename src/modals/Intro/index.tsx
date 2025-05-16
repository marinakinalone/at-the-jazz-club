import React, { useEffect, useState } from 'react'
import styles from './Intro.module.css'
import Header from '@/components/Header'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import useMainStore from '@/stores/mainStore'

const DELAY_SECONDS = 7

const Intro = () => {
  const [showButton, setShowButton] = useState(false)

  const hasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)

  const handleClick = () => {
    hasEnteredTheClub(true)
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
    <ModalContainer>
      <div className={styles.container}>
        <Header title="Le Club de Jazz" maxDuration={DELAY_SECONDS} />

        <PrimaryButton
          label="Entrer"
          handleClick={handleClick}
          styles={{ opacity: showButton ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        />
      </div>
    </ModalContainer>
  )
}

export default Intro
