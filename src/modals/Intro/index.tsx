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
    const timer = setTimeout(() => {
      setShowButton(true)
    }, DELAY_SECONDS * 1000)

    return () => clearTimeout(timer)
  }, [])

  // TODO instead of show button, use display none and display block to avoid spacing
  return (
    <ModalContainer>
      <div className={styles.container}>
        <Header title="Le Club de Jazz" maxDuration={DELAY_SECONDS} />
        {showButton && <PrimaryButton label="Entrer" handleClick={handleClick} />}
      </div>
    </ModalContainer>
  )
}

export default Intro
