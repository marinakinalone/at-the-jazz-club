import React from 'react'
import styles from './Header.module.css'
import { limelight } from '@/app/layout'
import jazzColors from '@/data/jazzColors'

const Header = ({ title, maxDuration }: { title: string; maxDuration: number }) => {
  const characters = title.split('')
  const animatedTitle = characters.map((char, index) => {
    if (char === ' ') {
      return <span key={index}>&nbsp;&nbsp;</span>
    }
    const getJazzColor = () => {
      const jazzColorIndex = index % jazzColors.length
      return jazzColors[jazzColorIndex]
    }

    const duration = Math.random() * maxDuration + 1 // Random duration between 1 and maxDuration
    const offset = Math.random() * 15
    const direction = index % 2 === 0 ? -1 : 1
    const initialOffset = `${direction * (offset + 50)}px`
    const finalOffset = `${direction * offset}px`

    return (
      <span
        key={index}
        className={styles.character}
        style={
          {
            '--color': getJazzColor(),
            '--final-offset': finalOffset,
            '--initial-offset': initialOffset,
            '--duration': `${duration}s`,
          } as React.CSSProperties
        }
      >
        {char}
      </span>
    )
  })
  return <h1 className={`${styles.header} ${limelight.className}`}>{animatedTitle}</h1>
}

export default Header
