import Image from 'next/image'
import React from 'react'
import styles from './ModalContainer.module.css'
import { AnimationDuration, AnimationName } from '@/types/modals'
interface IModalContainer {
  children: React.ReactNode
  animationName: AnimationName
  animationDuration: AnimationDuration
  displayCloseButton?: boolean
  onClose?: () => void
}

const ModalContainer = ({
  children,
  animationName,
  animationDuration,
  displayCloseButton = false,
  onClose,
}: IModalContainer) => {
  return (
    <div
      className={`${styles.modalContainer} ${styles[animationName]}`}
      style={{
        animationDuration: animationDuration,
      }}
    >
      {displayCloseButton && (
        <button className={styles.closeButton} onClick={onClose}>
          <Image src={`/icons/icon_close.png`} alt="Scene" width={35} height={35} />
        </button>
      )}
      {children}
    </div>
  )
}

export default ModalContainer
