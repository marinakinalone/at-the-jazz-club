import React from 'react'
import styles from './GameContainer.module.css'

const GameContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}

export default GameContainer
