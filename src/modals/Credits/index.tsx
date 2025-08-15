import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import styles from './Credits.module.css'
import ModalContainer from '@/components/ModalContainer'
import { credits } from '@/data/credits'
import useModalStore from '@/stores/modalStore'
import { AnimationDuration, AnimationName, AnimationTimeout, Modals } from '@/types/modals'
import { sleep } from '@/utils/sleep'

const CREDITS_DURATION_MS = 30_000
const CREDITS_DURATION_S = CREDITS_DURATION_MS / 1000

const CreditsModal = () => {
  const closeModal = useModalStore((state) => state.closeModal)

  const handleClose = () => {
    closeModal(Modals.END_CREDITS, AnimationTimeout.IMMEDIATE)
  }

  useEffect(() => {
    const closeModalWhenFinishedRolling = async () => {
      await sleep(CREDITS_DURATION_MS)
      closeModal(Modals.END_CREDITS, AnimationTimeout.LONG)
    }

    closeModalWhenFinishedRolling()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalContainer
      animationDuration={AnimationDuration.MEDIUM}
      animationName={AnimationName.SWASH_IN}
      displayCloseButton={true}
      onClose={handleClose}
    >
      <div className={styles.creditsContainer}>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: CREDITS_DURATION_S, ease: 'linear' }}
          style={{ position: 'absolute', width: '100%' }}
        >
          {credits.map((line, index) => (
            <p key={index} className={styles.creditLine}>
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </ModalContainer>
  )
}

export default CreditsModal
