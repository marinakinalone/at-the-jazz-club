import React from 'react'
import styles from './ModalContainer.module.css'
import { AnimationDuration, AnimationName } from '@/types/modals'
interface IModalContainer {
  children: React.ReactNode
  animationName: AnimationName
  animationDuration: AnimationDuration
  shouldDisplayCloseButton?: boolean
}

// TODO add optional close button
const ModalContainer = ({
  children,
  animationName,
  animationDuration,
  shouldDisplayCloseButton = true,
}: IModalContainer) => {
  return (
    <div
      className={`${styles.modalContainer} ${styles[animationName]}`}
      style={{
        animationDuration: animationDuration,
      }}
    >
      {shouldDisplayCloseButton && <button>close modal</button>}
      {children}
    </div>
  )
}

export default ModalContainer
