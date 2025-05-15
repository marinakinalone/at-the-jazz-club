import React from 'react'
import styles from './Intro.module.css'
import Header from '@/components/Header'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import useMainStore from '@/stores/mainStore'

const Intro = () => {
  const hasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)

  const handleClick = () => {
    hasEnteredTheClub(true)
  }
  return (
    <ModalContainer>
      <div className={styles.container}>
      <Header title="Le Club de Jazz" />
      <PrimaryButton label="Entrer" handleClick={handleClick} />

      </div>
    </ModalContainer>
  )
}

export default Intro
