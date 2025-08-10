import Image from 'next/image'
import React from 'react'
import styles from './Footer.module.css'
import { ibmPlexMono } from '@/app/layout'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { Modals } from '@/types/modals'
import { AnimationTimeout } from '@/types/modals'

const Footer = () => {
  const toggleSoundButton = useMainStore((state) => state.toggleSound)
  const isSoundOn = useMainStore((state) => state.isSoundOn)
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  const handleRestartAdventure = () => {
    for (const modal of Object.values(Modals)) {
      if (modal !== Modals.RESTART_ADVENTURE) {
        closeModal(modal, AnimationTimeout.IMMEDIATE)
      }
    }
    openModal(Modals.RESTART_ADVENTURE)
  }

  const soundIcon = isSoundOn ? 'soundOn' : 'soundOff'

  return (
    <footer className={styles.footer}>
      {' '}
      Le Club de Jazz par{' '}
      <a href={'https://kinalone.dev'} target="_blank" rel="noopener noreferrer">
        MKS
      </a>{' '}
      © 2025 ||{' '}
      <button
        className={`${styles.resetButton} ${ibmPlexMono.className}`}
        onClick={handleRestartAdventure}
      >
        recommencer l&apos;aventure
      </button>{' '}
      ||{' '}
      <button className={styles.toggleSoundButton} onClick={() => toggleSoundButton()}>
        {' '}
        <Image src={`/icons/icon_${soundIcon}.png`} alt="Son" width={18} height={18} />
      </button>
    </footer>
  )
}

export default Footer
