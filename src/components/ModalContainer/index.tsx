import React from 'react'
import styles from './ModalContainer.module.css'
import useModalStore from '@/stores/modalStore'
import { AnimationDuration, AnimationName } from '@/types/modals'
interface IModalContainer {
  children: React.ReactNode
  animationName: AnimationName
  animationDuration: AnimationDuration
  shouldDisplayCloseButton?: boolean
}

const ModalContainer = ({ children, animationName, animationDuration }: IModalContainer) => {
  return (
    <div
      className={`${styles.modalContainer} ${styles[animationName]}`}
      style={{
        animationDuration: animationDuration,
      }}
    >
      {children}
    </div>
  )
}

export default ModalContainer
