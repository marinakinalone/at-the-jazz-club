import React from 'react'
import styles from './ModalContainer.module.css'

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalContainer}>{children}</div>
}

export default ModalContainer
